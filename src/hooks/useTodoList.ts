import { useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { QueryKey } from '../statics/constants/Querykey';
import { ToDoService } from '../service/ToDoService';
import { PeriodTodoListParams, TodoOverviewResponse } from '../service/type/api/todo';
import { IToDoListResponse, IToDo, TodoOverview } from '../../types/ToDo';
import { calculateMonthBoundaries } from '../js/util';

// TODO todoList에서 기간으로 조회할 수 있도록 업데이트 되면 기간 추가
export function useTodoList(
  start: string | null = null,
  end: string | null = null,
  completed: boolean | null = null,
  page: number = 1,
  size: number = 15
) {
  return useQuery<IToDoListResponse, Error, IToDo[]>({
    queryKey: [QueryKey.TODO_LIST, { start, end, completed, page, size }],
    queryFn: () => ToDoService.todo.list({ start, end, completed, page, size }),
    select: (data) => data.data ?? [],
  });
}

/**
 * @desc 기간별 투두 목록 조회 훅 파라미터 (기본값 포함)
 */
export interface UsePeriodTodoListParams extends Partial<PeriodTodoListParams> {
	start?: string;
	end?: string;
	completed?: boolean;
	page?: number;
	size?: number;
}

/**
 * @desc 기간/완료 상태 기반 투두 목록 훅
 */
export function usePeriodTodoList(params: UsePeriodTodoListParams) {
	const { start, end, completed, page, size } = params;
	return useQuery<TodoOverviewResponse, unknown, TodoOverview[]>({
		queryKey: [QueryKey.TODO_LIST, 'period', start, end, completed, page, size],
		queryFn: () => ToDoService.todo.periodList({ start, end, completed, page, size }),
		select: resp => {
			const direct = (resp as any)?.data;
			if (Array.isArray(direct)) return direct as TodoOverview[];
			const nested = (resp as any)?.data?.data;
			return Array.isArray(nested) ? (nested as TodoOverview[]) : [];
		},
	});
}

// ToDo id 배열 기반 상세 조회 훅 (상세 병렬 조회)
/**
 * 주어진 ToDo id 배열에 대해 상세 정보를 병렬 조회하여 `IToDo[]`로 반환합니다.
 *
 * @param {number[]} todoIds - 상세 조회할 ToDo id 배열(중복 없는 것을 권장)
 * @returns {{ isLoading: boolean; todos: IToDo[] }} 로딩 상태와 상세 ToDo 배열
 *
 * @remarks (필요 시)
 * - 상세 쿼리 키: [QueryKey.TODO_LIST, 'detail', todoId]
 * - 데이터 소스: ToDoService.todo.detail(todoId)
 */
export function useTodosByIds(todoIds: number[]) {
	const detailQueries = useQueries({
		queries: (todoIds ?? []).map(id => ({
			queryKey: [QueryKey.TODO_LIST, 'detail', id],
			queryFn: () => ToDoService.todo.detail(id),
			enabled: Array.isArray(todoIds) && todoIds.length > 0,
		})),
	});

	const isLoading = detailQueries.length > 0 && detailQueries.some(q => q.isLoading);
	const todos = useMemo<IToDo[]>(() => {
		return detailQueries.map(q => q.data?.data as IToDo | undefined).filter((t): t is IToDo => Boolean(t));
	}, [detailQueries]);

	return { isLoading, todos } as const;
}

/**
 * @desc 월 기반 투두 목록 조회 훅 옵션
 */
export interface UseMonthPeriodTodoListOptions extends Omit<UsePeriodTodoListParams, 'start' | 'end'> {
	monthInput: number | string | Date;
}

/**
 * @desc 지정한 월에 대한 투두를 조회합니다.
 */
export function useMonthPeriodTodoList({ monthInput, ...options }: UseMonthPeriodTodoListOptions) {
	const { start, end } = useMemo(() => {
		try {
			return calculateMonthBoundaries(monthInput);
		} catch (error) {
			throw new Error(`useMonthPeriodTodoList: ${error instanceof Error ? error.message : 'Unknown error'}`);
		}
	}, [monthInput]);

	return usePeriodTodoList({
		start,
		end,
		...options,
	});
}

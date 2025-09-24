import { useQueries, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { QueryKey } from '../statics/constants/Querykey';
import { ToDoService } from '../service/ToDoService';
import { PeriodTodoListParams, TodoOverviewResponse } from '../service/type/api/todo';
import { IToDoListResponse, IToDo, TodoOverview } from '../../types/ToDo';

// TODO todoList에서 기간으로 조회할 수 있도록 업데이트 되면 기간 추가
export function useTodoList(pets: number[] = [], done: boolean | null = null, page: number = 1, size: number = 15) {
    return useQuery<IToDoListResponse, unknown, IToDo[]>({
        queryKey: [QueryKey.TODO_LIST, pets, done, page, size],
        queryFn: () => ToDoService.todo.list({ done, pets, page, size }),
        select: data => data.toDoList ?? [],
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
 * @param {UsePeriodTodoListParams} params 기간별 조회 파라미터
 * @returns {import('@tanstack/react-query').UseQueryResult<TodoOverview[], unknown>} React Query 결과
 */
export function usePeriodTodoList(params: UsePeriodTodoListParams) {
    const { start, end, completed, page = 1, size = 15 } = params;
    return useQuery<TodoOverviewResponse, unknown, TodoOverview[]>({
        queryKey: [QueryKey.TODO_LIST, 'period', start, end, completed, page, size],
        queryFn: () => ToDoService.todo.periodList({ start, end, completed, page, size }),
        select: resp => {
            const direct = (resp as any)?.data;
            if (Array.isArray(direct)) return direct as TodoOverview[];
            const nested = (resp as any)?.data?.data;
            return Array.isArray(nested) ? (nested as TodoOverview[]) : [];
        },
        enabled: Boolean(start && end) && page > 0 && size > 0,
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
        return detailQueries
            .map(q => q.data?.data as IToDo | undefined)
            .filter((t): t is IToDo => Boolean(t));
    }, [detailQueries]);

    return { isLoading, todos } as const;
}

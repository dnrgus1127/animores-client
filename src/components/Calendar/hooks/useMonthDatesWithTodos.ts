import { useMemo } from 'react';
import { useMonthBoundaries } from './useMonthBoundaries';
import { usePeriodTodoList, UsePeriodTodoListParams } from '../../../hooks/useTodoList';

interface MonthDatesWithTodosOptions extends Omit<UsePeriodTodoListParams, 'start' | 'end'> {
    completed?: boolean;
    page?: number;
    size?: number;
}

/**
 * @desc 현재 캘린더에서 보이는 달 범위의 투두를 조회하고, 데이터를 가진 날짜(YYYY-MM-DD)의 집합을 생성합니다.
 * @param {MonthDatesWithTodosOptions} options 조회 옵션(완료 여부, 페이지/사이즈)
 * @returns {{ dateSet: Set<string>; start: string; end: string; currentMonth: string } & import('@tanstack/react-query').UseQueryResult<TodoOverview[], unknown>} 날짜 집합과 쿼리 결과, 월 경계 문자열
 */
export function useMonthDatesWithTodos(options?: MonthDatesWithTodosOptions) {
    const { start, end, currentMonth } = useMonthBoundaries();
    const query = usePeriodTodoList({
        start,
        end,
        completed: options?.completed,
        page: options?.page ?? 1,
        size: options?.size ?? 200,
    });

    const dateSet = useMemo(() => {
        const set = new Set<string>();
        for (const item of query.data ?? []) {
            if (item?.date) set.add(item.date);
        }
        return set;
    }, [query.data]);

    return { ...query, dateSet, start, end, currentMonth } as const;
}



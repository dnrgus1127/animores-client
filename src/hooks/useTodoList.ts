import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../statics/constants/Querykey";
import { ToDoService } from "../service/ToDoService";
import { IToDoListResponse, IToDo, IPeriodTodosResponse, IPeriodTodo } from '../../types/ToDo';

// TODO todoList에서 기간으로 조회할 수 있도록 업데이트 되면 기간 추가
export function useTodoList(
    pets: number[] = [],
    done: boolean | null = null,
    page: number = 1,
    size: number = 15
) {
    return useQuery<IToDoListResponse, unknown, IToDo[]>({
        queryKey: [QueryKey.TODO_LIST, pets, done, page, size],
        queryFn: () => ToDoService.todo.list({ done, pets, page, size }),
        select: data => data.toDoList ?? [],
    });
}

// 기간/완료 상태 기반 투두 목록 훅
export function usePeriodTodoList(
    start?: string,
    end?: string,
    completed?: boolean,
    page: number = 1,
    size: number = 15
) {
    return useQuery<IPeriodTodosResponse, unknown, IPeriodTodo[]>({
        queryKey: [QueryKey.TODO_LIST, 'period', start, end, completed, page, size],
        queryFn: () => ToDoService.todo.periodList({ start, end, completed, page, size }),
        select: resp => {
            const direct = (resp as any)?.data;
            if (Array.isArray(direct)) return direct as IPeriodTodo[];
            const nested = (resp as any)?.data?.data;
            return Array.isArray(nested) ? (nested as IPeriodTodo[]) : [];
        },
        enabled: Boolean(start && end) && page > 0 && size > 0,
    });
}
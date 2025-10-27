import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../statics/constants/Querykey";
import { ToDoService } from "../service/ToDoService";
import { IToDoListResponse, IToDo } from "../../types/ToDo";


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
import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../statics/constants/Querykey";
import { ToDoService } from "../service/ToDoService";
import { IToDoListResponse, IToDo } from "../../types/ToDo";


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
    select: (data) => data.toDoList ?? [],
  });
} 
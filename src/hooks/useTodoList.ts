import { useQuery } from "@tanstack/react-query";
import { QueryKey } from "../statics/constants/Querykey";
import { ToDoService } from "../service/ToDoService";
import { IToDoListResponse, IToDo } from "../../types/ToDo";

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
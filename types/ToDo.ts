export interface IToDo {
    id: number;
    title: string;
    pets: IPet[];
    isAllDay: boolean;
    date: string;
    time: string;
    isUsingAlarm: boolean;
    color: string;
    completeProfileImage: string|null;
    completeDateTime: string|null;
}

interface IPet {
    id: number;
    name: string;
}

export interface IToDoList {
  todoId: number;
  date: string;
  time: string | null;
  isAllDay: boolean;
  content: string;
  tag: string | null;
  color: string;
  isUsingAlarm: boolean;
  unit: string;
  intervalNum: number;
}

export interface IToDoListResponse {
  success: boolean;
  data: IToDoList[];
}
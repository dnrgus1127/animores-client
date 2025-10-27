export interface IToDo {
    id: number;
    title: string;
    pets: IPet[];
    isAllDay: boolean;
    date: string;
    time: string;
    isUsingAlarm: boolean;
    color: string;
    completeProfileImage: string | null;
    completeDateTime: string | null;
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

// 요약형 ToDo (기간/리스트 등에서 사용하는 경량 정보)
export interface TodoOverview {
    todoId: number;
    date: string;
    time: string;
    isAllDay: boolean;
    content: string;
    tag: string;
    color: string;
    isUsingAlarm: boolean;
    unit: string; // e.g. 'HOUR'
    intervalNum: number;
}

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

export interface IToDoListResponse {
  curPage: number;
  size: number;
  totalCount: number;
  totalPage: number;
  toDoList: IToDo[];
}
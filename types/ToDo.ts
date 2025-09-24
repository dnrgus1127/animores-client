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

export interface IToDoListResponse {
    curPage: number;
    size: number;
    totalCount: number;
    totalPage: number;
    toDoList: IToDo[];
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

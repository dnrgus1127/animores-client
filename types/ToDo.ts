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

// 기간 조회 API 응답을 위한 타입들
export interface IPeriodTodo {
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

export interface IApiError {
    code: string;
    message: string;
}

export interface IApiResponse<T> {
    success: boolean;
    data: T;
    error?: IApiError;
}

export type IPeriodTodosResponse = IApiResponse<IPeriodTodo[]>;

import axios from "axios";
import { IAddTodo, IListToDoParam } from '../../types/AddToDo';
import { IToDoListResponse, IPeriodTodosResponse } from '../../types/ToDo';
import AxiosContext from "../screens/context/AxiosContext";
import { normalizeToYmd } from '../js/util';

// moved date utils to src/js/util.js

export namespace ToDoService {
    export const todo = {
        create: async (content: IAddTodo) => {
            try {
                const response = await AxiosContext.post(`/api/v1/todos`, content);
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.create:', error);
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('ToDoService.todo.create:', error.response.data);
                    } else {
                        console.error('ToDoService.todo.create:', error.message);
                    }
                }
                throw error;
            }
        },
        list: async (params: IListToDoParam): Promise<IToDoListResponse> => {
            try {
                var queryString = `/api/v1/todos?page=${params.page}&size=${params.size}`;
                if (params.done !== null) {
                    queryString += `&done=${params.done}`;
                }
                if (params.pets !== null) {
                    for (const pet of params.pets) {
                        queryString += `&pets=${pet}`;
                    }
                }
                const response = await AxiosContext.get(queryString);
                return response.data.data;
            } catch (error) {
                console.error('ToDoService.todo.list:', error);
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('ToDoService.todo.list:', error.response.data);
                    } else {
                        console.error('ToDoService.todo.list:', error.message);
                    }
                }
                throw error;
            }
        },
        /**
         * @desc 기간/완료 상태 필터 기반 목록 조회
         * @param params.start YYYY-MM-DD
         * @param params.end YYYY-MM-DD
         * @param params.completed 완료 여부 필터
         * @param params.page 페이지 번호
         * @param params.size 페이지 크기
         */
        periodList: async (params: {
            start?: string;
            end?: string;
            completed?: boolean;
            page: number;
            size: number;
        }): Promise<IPeriodTodosResponse> => {
            try {
                let queryString = `/api/v1/todos?page=${params.page}&size=${params.size}`;
                const start = normalizeToYmd(params.start);
                const end = normalizeToYmd(params.end);
                if (start) {
                    queryString += `&start=${encodeURIComponent(start)}`;
                }
                if (end) {
                    queryString += `&end=${encodeURIComponent(end)}`;
                }
                if (typeof params.completed === 'boolean') {
                    queryString += `&completed=${params.completed}`;
                }
                const response = await AxiosContext.get(queryString);
                return response.data as IPeriodTodosResponse;
            } catch (error) {
                console.error('ToDoService.todo.periodList:', error);
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('ToDoService.todo.periodList:', error.response.data);
                    } else {
                        console.error('ToDoService.todo.periodList:', error.message);
                    }
                }
                throw error;
            }
        },
        today: async (page: number, size: number) => {
            try {
                const response = await AxiosContext.get(
                    `/api/v1/todos/today?page=${page}&size=${size}`
                );
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.today:', error);
                return { data: null, status: error || 500 };
            }
        },
        check: async (id: number) => {
            try {
                const response = await AxiosContext.post(`/api/v1/todos/${id}/check`);
                console.log(response);
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.check:', error);
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('ToDoService.todo.check:', error.response.data);
                    }
                }
            }
        },
        delete: async (id: number) => {
            try {
                const response = await AxiosContext.delete(`/api/v1/todos/${id}`);
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.delete:', error);
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('ToDoService.todo.delete:', error.response.data);
                    }
                }
            }
        },
    };
}

import axios from "axios";
import {IAddTodo, IListToDoParam} from "../../types/AddToDo";
import { IToDoListResponse } from "../../types/ToDo";
import AxiosContext from "../screens/context/AxiosContext";

export namespace ToDoService {
    export const todo = {
        create: async (content: IAddTodo) => {
            try {
                const response = await AxiosContext.post(`/api/v1/todos`, content);
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.create:', error);
                if	(axios.isAxiosError(error)) {
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
                var startEnd = ''
                var completed = ''
                var queryString = `/api/v1/todos/?${startEnd}${completed}page=${params.page}&size=${params.size}`;
                if(params.start != null) {
                    startEnd = `&start=${params.start}`;
                }
                if(params.end != null) {
                    startEnd = `&end=${params.end}`;
                }
                if(params.completed !=  null) {
                    completed = `&completed=${params.completed}`;
                }
                console.log(params.start, params.end);
                const response = await AxiosContext.get(queryString);
                return response.data;
            } catch (error) {
                console.error('ToDoService.todo.list:', error);
                if	(axios.isAxiosError(error)) {
					if (error.response) {
						console.error('ToDoService.todo.list:', error.response.data);
					} else {
						console.error('ToDoService.todo.list:', error.message);
					}
				}
                throw error;
            }
        },
        today: async (page: number, size: number) => {
            try {
                const response = await AxiosContext.get(`/api/v1/todos/today?page=${page}&size=${size}`);
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.today:', error);
                return { data: null, status: error || 500 };
            }
        },
        check: async (id: number) => {
            try {
                const response = await AxiosContext.post(`/api/v1/todos/${id}/check`);
                console.log(response.data);
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.check:', error);
                if	(axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('ToDoService.todo.check:', error.response.data);
                    }
                }
            }
        },
		update: async (id: number) => {
			try {
				const response = await AxiosContext.patch(
                    `/api/v1/todos/${id}`, 
					{
						headers: {
							'Content-Type': 'application/json',
						},
					});
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('ToDoService.todo.update:', error);
				return { data: null, status: error || error };
			}
		},
        delete: async (id: number) => {
            try {
                const response = await AxiosContext.delete(`/api/v1/todos/${id}`);
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.delete:', error);
                if	(axios.isAxiosError(error)) {
                    if (error.response) {
                        console.error('ToDoService.todo.delete:', error.response.data);
                    }
                }
            }
        }
    }
}
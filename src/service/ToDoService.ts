import axios from "axios";
import {IAddTodo, IListToDoParam} from "../../types/AddToDo";
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
						console.error('ProfileService.Profile.create:', error.response.data);
					} else {
						console.error('ProfileService.Profile.create:', error.message);
					}
				}
                throw error;
            }
        },
        list: async (params: IListToDoParam) => { 
            try {
                var queryString = `/api/v1/todos?page=${params.page}&size=${params.size}`;
                if(params.done !==  null) {
                    queryString += `&done=${params.done}`;
                }
                if(params.pets !== null) {
                    for(const pet of params.pets) {
                        queryString += `&pets=${pet}`;
                    }
                }
                const response = await AxiosContext.get(queryString);
                return response.data;
            } catch (error) {
                console.error('ToDoService.todo.list:', error);
                if	(axios.isAxiosError(error)) {
					if (error.response) {
						console.error('ProfileService.Profile.list:', error.response.data);
					} else {
						console.error('ProfileService.Profile.list:', error.message);
					}
				}
            }
        },
    }
}
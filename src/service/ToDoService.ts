import IAddTodo from "../../types/AddToDo";
import AxiosContext from "../screens/context/AxiosContext";

export namespace ToDoService {
    export const todo = {
        create: async (content: IAddTodo) => {
            try {
                const response = await AxiosContext.post(`/api/v1/todos`, content);
                return { data: response.data, status: response.status };
            } catch (error) {
                console.error('ToDoService.todo.create:', error);
                return { data: null, status: error || 500 };
            }
        }    
    }
}
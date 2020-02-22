import { delay } from '../utils/promise.utils';
import Todo from '../models/todo.model';

class TodoService {
    static async addTodo(title: string, userId: number): Promise<Todo> {
        await delay(1000);
        const id = new Date().getTime();

        return new Todo({
            id,
            title,
            userId,
            completed: false
        });
    }

    static async updateTodo(
        todoId: number,
        title: string,
        userId: number
    ): Promise<{
        todoId: number;
        title: string;
        userId: number;
    }> {
        await delay(1000);

        return {
            todoId,
            title,
            userId
        };
    }

    static async removeTodo(
        todoId: number,
        userId: number
    ): Promise<{
        todoId: number;
        userId: number;
    }> {
        await delay(1000);

        return {
            todoId,
            userId
        };
    }
}

export default TodoService;

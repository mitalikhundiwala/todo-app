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
}

export default TodoService;

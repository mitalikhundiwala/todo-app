import { IAppState } from '../store/index.js';
import Todo from '../models/todo.model';

export default class LocalStorageService {
    static saveState(state: IAppState) {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('wakecap', serializedState);
        } catch (err) {
            // Ignore Errors
        }
    }

    static fetchTodosByUser(userId: number): { [key: string]: Todo } {
        try {
            const serializedState = localStorage.getItem('wakecap');
            if (serializedState === null) {
                return {};
            }
            const data = JSON.parse(serializedState);
            const todosForUser: { [key: string]: Todo } = {};
            Object.keys(data.todos)
                .filter(todoId => {
                    return data.todos[todoId].userId === userId;
                })
                .forEach(todoId => {
                    todosForUser[todoId] = new Todo(data.todos[todoId]);
                });
            return todosForUser;
        } catch (err) {
            return {};
        }
    }
}

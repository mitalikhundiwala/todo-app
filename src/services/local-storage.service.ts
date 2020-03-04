import { IAppState } from '../store/index';
import Todo from '../models/todo.model';
import TodoHistory from '../models/history';

export default class LocalStorageService {
    static saveState(state: IAppState) {
        try {
            const serializedState = JSON.stringify({
                users: state.users,
                todos: state.todos,
                history: state.history
            });
            localStorage.setItem('todo-app', serializedState);
        } catch (err) {
            // Ignore Errors
        }
    }

    static loadState(): any {
        try {
            const serializedState = localStorage.getItem('todo-app');
            if (serializedState === null) {
                return {};
            }
            const parsedState = JSON.parse(serializedState);
            const parsedHistory = parsedState.history.map((history: any) => {
                return new TodoHistory({
                    ...history,
                    performedAt: new Date(history.performedAt)
                });
            });
            return {
                ...parsedState,
                history: parsedHistory
            };
        } catch (err) {
            return {};
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

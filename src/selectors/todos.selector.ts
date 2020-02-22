import { IState } from '../reducers/todos.reducer';
import Todo from '../models/todo.model';

export const getTodos = (
    todos: IState,
    userId: number | null
): Todo[] | null => {
    if (!userId) {
        return null;
    }
    const todoIds = Object.keys(todos).filter((todoId: string) => {
        return todos[todoId].userId === userId;
    });
    return todoIds
        .map(todoId => {
            return todos[todoId];
        })
        .sort((a, b) => {
            return a.id < b.id ? 1 : -1;
        });
};

import { createSelector } from 'reselect';
import { IAppState } from '../store';

const getTodos = (state: IAppState) => state.todos;
const getSelectedUser = (state: IAppState) => state.ui.selectedUser;

export const getTodosSelector = createSelector(
    [getTodos, getSelectedUser],
    (todos, userId) => {
        if (!userId) {
            return null;
        }

        return Object.values(todos)
            .map(todo => {
                return todos[todo.todoId];
            })
            .sort((a, b) => {
                return a.todoId < b.todoId ? 1 : -1;
            });
    }
);

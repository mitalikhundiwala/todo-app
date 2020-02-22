import { AppThunkDispatch } from '../store';
import TodoService from '../services/todos.service';
import { setTodosForUser } from './todos.action';

export enum UsersAction {
    SET_SELECTED_USER = 'SET_SELECTED_USER'
}

export const setSelectedUser = (userId: number) => ({
    type: UsersAction.SET_SELECTED_USER,
    payload: {
        userId
    }
});

export const selectUser = (userId: number) => {
    return async (dispatch: AppThunkDispatch) => {
        dispatch(setSelectedUser(userId));
        const todosForUser = await TodoService.retriveTodosForUser(userId);
        dispatch(setTodosForUser(userId, todosForUser));
        return todosForUser;
    };
};

import { Dispatch, AnyAction } from 'redux';
import Todo from '../models/todo.model';
import { delay } from '../utils/promise.utils';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../store';
import TodoService from '../services/todos.service';

export enum TodosAction {
    TOGGLE_COMPLETE = 'TOGGLE_COMPLETE',
    REMOVE_TODO = 'REMOVE_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
    ADD_TODO = 'ADD_TODO'
}

export const toggleCompleted = (
    todoId: number,
    userId: number,
    completed: boolean
) => ({
    type: TodosAction.TOGGLE_COMPLETE,
    payload: {
        todoId,
        userId,
        completed
    }
});

export const removeTodo = (todoId: number, userId: number) => ({
    type: TodosAction.REMOVE_TODO,
    payload: {
        todoId,
        userId
    }
});

export const updateTodoSuccess = (
    todoId: number,
    title: string,
    userId: number
) => ({
    type: TodosAction.UPDATE_TODO,
    payload: {
        todoId,
        title,
        userId
    }
});

export const updateTodo = (
    todoId: number,
    title: string,
    userId: number
): ThunkAction<Promise<any>, IAppState, undefined, AnyAction> => {
    return async (dispatch: Dispatch) => {
        await delay(1000);
        dispatch(updateTodoSuccess(todoId, title, userId));
        return {
            todoId,
            title,
            userId
        };
    };
};

export const addTodoSuccess = (todo: Todo) => ({
    type: TodosAction.ADD_TODO,
    payload: {
        ...todo
    }
});

export const addTodo = (
    title: string,
    userId: number
): ThunkAction<Promise<any>, IAppState, undefined, AnyAction> => {
    return async (dispatch: Dispatch) => {
        const todo = await TodoService.addTodo(title, userId);
        dispatch(addTodoSuccess(todo));
        return todo;
    };
};

import { Dispatch, AnyAction } from 'redux';
import Todo from '../models/todo.model';
import { delay } from '../utils/promise.utils';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../store';
import TodoService from '../services/todos.service';

export enum TodosAction {
    SET_TODOS = 'SET_TODOS',
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

export const setTodosForUser = (userId: number, todos: Todo[]) => ({
    type: TodosAction.SET_TODOS,
    payload: {
        userId,
        todos
    }
});

export const removeTodoSuccess = (todo: {
    todoId: number;
    userId: number;
}) => ({
    type: TodosAction.REMOVE_TODO,
    payload: {
        ...todo
    }
});

export const removeTodo = (
    todoId: number,
    userId: number
): ThunkAction<Promise<any>, IAppState, undefined, AnyAction> => {
    // return async (dispatch: Dispatch) => {
    //     const todo = await TodoService.removeTodo(todoId, userId);
    //     dispatch(removeTodoSuccess(todo));
    //     return todo;
    // };

    return (dispatch: Dispatch) => {
        return TodoService.removeTodo(todoId, userId).then((todo) => {
            dispatch(removeTodoSuccess(todo));
            return todo;
        })
    };
};

export const updateTodoSuccess = (todo: {
    todoId: number;
    title: string;
    userId: number;
}) => ({
    type: TodosAction.UPDATE_TODO,
    payload: {
        ...todo
    }
});

export const updateTodo = (
    todoId: number,
    title: string,
    userId: number
): ThunkAction<Promise<any>, IAppState, undefined, AnyAction> => {
    return async (dispatch: Dispatch) => {
        const todo = await TodoService.updateTodo(todoId, title, userId);
        dispatch(updateTodoSuccess(todo));
        return todo;
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
): ThunkAction<Promise<Todo>, IAppState, undefined, AnyAction> => {
    return async (dispatch: Dispatch) => {
        const todo = await TodoService.addTodo(title, userId);
        dispatch(addTodoSuccess(todo));
        return todo;
    };
};

import { Dispatch } from 'redux';
import Todo from '../models/todo.model';

export enum TodosAction {
    TOGGLE_COMPLETE = 'TOGGLE_COMPLETE',
    REMOVE_TODO = 'REMOVE_TODO'
}

export const toggleCompleted = (todoId: number, completed: boolean) => ({
    type: TodosAction.TOGGLE_COMPLETE,
    payload: {
        todoId,
        completed
    }
});

export const removeTodo = (todoId: number) => ({
    type: TodosAction.REMOVE_TODO,
    payload: todoId
});

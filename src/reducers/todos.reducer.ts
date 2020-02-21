import Todo from '../models/todo.model';
import { SET_INITIAL_DATA } from '../actions/app.action';
import { AnyAction } from 'redux';
import { IInitialData } from '../services/app.service';
import { TodosAction } from '../actions/todos.action';

export type IState = { [key: string]: Todo };

const defaultState: IState = {};

export default (state: IState = defaultState, action: AnyAction): IState => {
    switch (action.type) {
        case SET_INITIAL_DATA: {
            const payload: IInitialData = action.payload;
            const todos: { [key: string]: Todo } = {};
            payload.todos?.forEach((todo: Todo) => {
                todos[`${todo.id}`] = todo;
            });
            return {
                ...state,
                ...todos
            };
        }
        case TodosAction.TOGGLE_COMPLETE: {
            const payload: { todoId: number; completed: boolean } =
                action.payload;
            return {
                ...state,
                [payload.todoId]: {
                    ...state[payload.todoId],
                    completed: payload.completed
                }
            };
        }
        case TodosAction.REMOVE_TODO: {
            const todoId: number = action.payload;
            const todos = {
                ...state
            };
            delete todos[todoId];
            return todos;
        }
        default:
            return state;
    }
};

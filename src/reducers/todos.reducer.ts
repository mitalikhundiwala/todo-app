import Todo from '../models/todo.model';
import { SET_INITIAL_DATA } from '../actions/app.action';
import { AnyAction } from 'redux';
import { IInitialData } from '../services/app.service';

export type IState = { [key: string]: Todo };

const defaultState: IState = {};

export default (state: IState = defaultState, action: AnyAction): IState => {
    switch (action.type) {
        case SET_INITIAL_DATA:
            const payload: IInitialData = action.payload;
            const todos: { [key: string]: Todo } = {};
            payload.todos?.forEach((todo: Todo) => {
                todos[`${todo.id}`] = todo;
            });
            return {
                ...state,
                ...todos
            };
        default:
            return state;
    }
};

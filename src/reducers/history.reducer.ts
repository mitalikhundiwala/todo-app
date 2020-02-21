import { AnyAction } from 'redux';
import TodoHistory, { TodoAction } from '../models/history';
import { TodosAction } from '../actions/todos.action';

export type IState = TodoHistory[];

const defaultState: IState = [];

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case TodosAction.TOGGLE_COMPLETE: {
            const payload: {
                todoId: number;
                userId: number;
                completed: boolean;
            } = action.payload;
            return [
                {
                    todoId: payload.todoId,
                    userId: payload.userId,
                    action: payload.completed
                        ? TodoAction.COMPLETED
                        : TodoAction.UNCOMPLETED,
                    performedAt: new Date()
                },
                ...state
            ];
        }
        case TodosAction.REMOVE_TODO: {
            const payload: {
                todoId: number;
                userId: number;
            } = action.payload;
            return [
                {
                    todoId: payload.todoId,
                    userId: payload.userId,
                    action: TodoAction.DELETED,
                    performedAt: new Date()
                },
                ...state
            ];
        }
        default:
            return state;
    }
};

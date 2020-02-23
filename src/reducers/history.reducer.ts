import { AnyAction } from 'redux';
import TodoHistory, { TodoAction } from '../models/history';
import { TodosAction } from '../actions/todos.action';

export type IState = TodoHistory[];

const defaultState: IState = [];

export const getHistoryAction = (action: AnyAction) => {
    const payload: {
        todoId: number;
        userId: number;
        completed?: boolean;
    } = action.payload;
    return {
        todoId: payload.todoId,
        userId: payload.userId,
        performedAt: new Date()
    };
};

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case TodosAction.TOGGLE_COMPLETE: {
            return [
                {
                    ...getHistoryAction(action),
                    action: action.payload.completed
                        ? TodoAction.COMPLETED
                        : TodoAction.UNCOMPLETED
                },
                ...state
            ];
        }
        case TodosAction.REMOVE_TODO: {
            return [
                {
                    ...getHistoryAction(action),
                    action: TodoAction.DELETED
                },
                ...state
            ];
        }
        case TodosAction.UPDATE_TODO: {
            return [
                {
                    ...getHistoryAction(action),
                    action: TodoAction.UPDATED
                },
                ...state
            ];
        }
        case TodosAction.ADD_TODO: {
            return [
                {
                    ...getHistoryAction(action),
                    action: TodoAction.CREATED
                },
                ...state
            ];
        }
        default:
            return state;
    }
};

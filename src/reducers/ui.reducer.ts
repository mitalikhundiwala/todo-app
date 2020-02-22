import { AnyAction } from 'redux';
import { UsersAction } from '../actions/users.action';
import { UIAction } from '../actions/ui.action';
import { TodosAction } from '../actions/todos.action';

export interface IState {
    selectedUser: number | null;
    isAddingTodo: boolean;
}

const defaultState: IState = {
    selectedUser: null,
    isAddingTodo: false
};

export default (state: IState = defaultState, action: AnyAction): IState => {
    switch (action.type) {
        case UsersAction.SELECT_USER:
            return {
                ...state,
                selectedUser: action.payload.userId
            };
        case UIAction.TOGGLE_ADD_TODO:
        case TodosAction.ADD_TODO:
            return {
                ...state,
                isAddingTodo: action.payload.isAddingTodo
            };
        default:
            return state;
    }
};

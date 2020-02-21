import { AnyAction } from 'redux';
import { UsersAction } from '../actions/users.action';

export interface IState {
    selectedUser: number | null;
}

const defaultState: IState = {
    selectedUser: null
};

export default (state: IState = defaultState, action: AnyAction): IState => {
    switch (action.type) {
        case UsersAction.SELECT_USER:
            return {
                ...state,
                selectedUser: action.payload
            };
        default:
            return state;
    }
};

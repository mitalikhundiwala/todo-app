import User from '../models/user.model';
import { SET_INITIAL_DATA } from '../actions/app.action';
import { AnyAction } from 'redux';
import { IInitialData } from '../services/app.service';

export type IState = { [key: string]: User };

const defaultState: IState = {};

export default (state: IState = defaultState, action: AnyAction): IState => {
    switch (action.type) {
        case SET_INITIAL_DATA:
            const payload: IInitialData = action.payload;
            const users: { [key: string]: User } = {};
            payload.users?.forEach((user: User) => {
                users[`${user.id}`] = user;
            });
            return {
                ...state,
                ...users
            };
        default:
            return state;
    }
};

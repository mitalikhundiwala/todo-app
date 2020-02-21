import { AnyAction } from 'redux';
import TodoHistory from '../models/history';

export type IState = TodoHistory[];

const defaultState: IState = [];

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

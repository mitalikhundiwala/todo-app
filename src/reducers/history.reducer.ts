import { AnyAction } from 'redux';

export type IState = any[];

const defaultState: IState = [];

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

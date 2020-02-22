import { retrieveInitialData, IInitialData } from '../services/app.service';
import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from '../store';

export const SET_INITIAL_DATA = 'SET_INITIAL_DATA';

const setInitialData = (data: IInitialData): AnyAction => ({
    type: SET_INITIAL_DATA,
    payload: data
});

export const loadInitialData = (): ThunkAction<
    Promise<any>,
    IAppState,
    undefined,
    AnyAction
> => {
    return async (dispatch: Dispatch) => {
        const data = await retrieveInitialData();
        dispatch(setInitialData(data));
        return data;
    };
};

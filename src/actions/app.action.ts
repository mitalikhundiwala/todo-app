import { retrieveInitialData } from '../services/app.service';

const setInitialData = data => ({
    type: 'SET_INITIAL_DATA',
    payload: data
});

export const loadInitialData = () => {
    return async (dispatch, getState) => {
        const data = await retrieveInitialData();
        dispatch(setInitialData(data));
    };
};

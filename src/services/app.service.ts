import data from '../data/db.json';
import { delay } from '../utils/promise.utils';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('wakecap');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('wakecap', serializedState);
    } catch (err) {
        // Ignore Errors
    }
};

export const retrieveInitialData = async () => {
    try {
        await delay(1000);
        let serializedState = localStorage.getItem('wakecap');
        let unserializedState;
        if (!serializedState) {
            unserializedState = data;
            localStorage.setItem('wakecap', JSON.stringify(unserializedState));
        } else {
            unserializedState = JSON.parse(serializedState);
        }
        return unserializedState;
    } catch (err) {
        // Ignore Errors
    }
};

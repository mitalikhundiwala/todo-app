import data from '../data/db.json';
import { delay } from '../utils/promise.utils';
import User from '../models/user.model';
import Todo from '../models/todo.model';
import { IAppState } from '../store/index.js';

export interface IInitialData {
    users?: User[];
    todos?: Todo[];
}

export const loadState = (): IInitialData | undefined => {
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

export const saveState = (state: IAppState | IInitialData) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('wakecap', serializedState);
    } catch (err) {
        // Ignore Errors
    }
};

export const retrieveInitialData = async (): Promise<IInitialData> => {
    await delay(1000);
    let appState = loadState();
    if (!appState) {
        appState = data;
        saveState(appState as IInitialData);
    }

    const users = appState?.users?.map((user: any) => {
        return new User(user);
    });
    // const todos = appState?.todos?.map((todo: any) => {
    //     return new Todo(todo);
    // });
    return {
        users,
        // todos
    };
};

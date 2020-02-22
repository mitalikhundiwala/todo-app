import data from '../data/db.json';
import { delay } from '../utils/promise.utils';
import User from '../models/user.model';
import Todo from '../models/todo.model';

export interface IInitialData {
    users?: User[];
    todos?: Todo[];
}

export const retrieveInitialData = async (): Promise<IInitialData> => {
    await delay(1000);
    const users = data?.users?.map((user: any) => {
        return new User(user);
    });
    return {
        users
    };
};

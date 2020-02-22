import { IState } from '../reducers/users.reducer';

export const getUsers = (users: IState) => {
    return Object.keys(users).map((userId: string) => {
        return users[userId];
    });
};

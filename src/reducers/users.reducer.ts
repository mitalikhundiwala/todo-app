import User from '../models/user.model';

export interface IState {
    users: { [key: string]: any };
}

const defaultState: IState = { users: {} };

export default (state: IState = defaultState, action) => {
    switch (action.type) {
        case 'SET_INITIAL_DATA':
            const users: { [key: string]: User } = {};
            action.payload.users.forEach((user: User) => {
                users[`${user.id}`] = new User(user);
            });
            return {
                ...state,
                ...users
            };
        case 'SET_USERS':
            return action.users;
        default:
            return state;
    }
};

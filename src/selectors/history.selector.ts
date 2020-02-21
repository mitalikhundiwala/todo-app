import { IState as IHistoryState } from '../reducers/history.reducer';
import TodoHistory from '../models/history';
import { IState as IUsersState } from '../reducers/users.reducer';
import User from '../models/user.model';

export const getHistory = (
    history: IHistoryState,
    userId: number | null,
    users: IUsersState
): {
    todoHistory: TodoHistory,
    user: User
}[] | null => {
    if (!userId) {
        return null;
    }
    return history
        .filter(datum => {
            return datum.userId === userId;
        })
        .map(datum => {
            return {
                todoHistory: datum,
                user: users[datum.userId]
            };
        });
};

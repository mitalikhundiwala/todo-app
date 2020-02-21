export enum UsersAction {
    SELECT_USER = 'SELECT_USER'
}

export const selectUser = (userId: number) => ({
    type: UsersAction.SELECT_USER,
    payload: userId
});

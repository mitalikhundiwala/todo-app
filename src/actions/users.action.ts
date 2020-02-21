export const setUsers = users => ({
    type: 'SET_USERS',
    users
});

export const startSetUsers = users => {
    return (dispatch, getState) => {
        dispatch(setUsers(users));
    };
};

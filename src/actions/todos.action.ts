export const setTodos = todos => ({
    type: 'SET_TODOS',
    todos
});

export const startSetTodos = todos => {
    return (dispatch, getState) => {
        dispatch(setTodos(todos));
    };
};

export enum UIAction {
    TOGGLE_ADD_TODO = 'TOGGLE_ADD_TODO'
}

export const ToggleAddTodo = (isAddingTodo: boolean) => ({
    type: UIAction.TOGGLE_ADD_TODO,
    payload: {
        isAddingTodo
    }
});

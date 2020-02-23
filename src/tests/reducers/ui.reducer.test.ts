import uiReducer from '../../reducers/ui.reducer';
import { setSelectedUser } from '../../actions/users.action';
import { ToggleAddTodo } from '../../actions/ui.action';
import { addTodoSuccess } from '../../actions/todos.action';

test('should set selected user', () => {
    const action = setSelectedUser(1);
    const state = uiReducer(
        {
            selectedUser: 1,
            isAddingTodo: false
        },
        action
    );
    expect(state.selectedUser).toEqual(1);
});

test('should set adding todo to true', () => {
    const action = ToggleAddTodo(true);
    const state = uiReducer(
        {
            selectedUser: null,
            isAddingTodo: true
        },
        action
    );
    expect(state.isAddingTodo).toEqual(true);
});

test('should set adding todo to false', () => {
    const action = ToggleAddTodo(false);
    const state = uiReducer(
        {
            selectedUser: null,
            isAddingTodo: false
        },
        action
    );
    expect(state.isAddingTodo).toEqual(false);
});

test('should set adding todo to false', () => {
    const action = ToggleAddTodo(false);
    const state = uiReducer(
        {
            selectedUser: null,
            isAddingTodo: false
        },
        action
    );
    expect(state.isAddingTodo).toEqual(false);
});

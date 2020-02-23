import historyReducer from '../../reducers/history.reducer';
import {
    toggleCompleted,
    removeTodoSuccess,
    updateTodoSuccess,
    addTodoSuccess
} from '../../actions/todos.action';
import { TodoAction } from '../../models/history';
import Todo from '../../models/todo.model';

test('should mark todo as done', () => {
    const action = toggleCompleted(1, 1, true);
    const state = historyReducer([], action);
    expect(state[0].action).toEqual(TodoAction.COMPLETED);
});

test('should mark todo as undone', () => {
    const action = toggleCompleted(1, 1, false);
    const state = historyReducer([], action);
    expect(state[0].action).toEqual(TodoAction.UNCOMPLETED);
});

test('should mark todo as deleted', () => {
    const action = removeTodoSuccess({
        todoId: 1,
        userId: 1
    });
    const state = historyReducer([], action);
    expect(state[0].action).toEqual(TodoAction.DELETED);
});

test('should mark todo as updated', () => {
    const action = updateTodoSuccess({
        todoId: 1,
        title: 'updated title',
        userId: 1
    });
    const state = historyReducer([], action);
    expect(state[0].action).toEqual(TodoAction.UPDATED);
});

test('should mark todo as added', () => {
    const action = addTodoSuccess(
        new Todo({
            todoId: 1,
            title: 'updated title',
            userId: 1
        })
    );
    const state = historyReducer([], action);
    expect(state[0].action).toEqual(TodoAction.CREATED);
});

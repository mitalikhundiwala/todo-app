import todosReducer from '../../reducers/todos.reducer';
import {
    setTodosForUser,
    toggleCompleted,
    removeTodoSuccess,
    addTodoSuccess,
    updateTodoSuccess
} from '../../actions/todos.action';
import todos from '../fixtures/todos';
import data from '../../data/db.json';
import Todo from '../../models/todo.model';

test('should set todos for user', () => {
    const action = setTodosForUser(1, todos);
    const state = todosReducer({}, action);
    expect(state['1']).toEqual(todos[0]);
});

test('should set todo as completed', () => {
    const action = toggleCompleted(
        todos[0].todoId,
        todos[0].userId,
        todos[0].completed
    );
    const state = todosReducer({}, action);
    expect(state['1'].completed).toBe(true);
});

test('should set todo as uncompleted', () => {
    const action = toggleCompleted(
        todos[1].todoId,
        todos[1].userId,
        todos[1].completed
    );
    const state = todosReducer({}, action);
    expect(state['2'].completed).toBe(false);
});

test('should remove todo', () => {
    const action = removeTodoSuccess({ todoId: 2, userId: 1 });
    const data = {
        1: new Todo({
            todoId: 1,
            userId: 1,
            completed: false
        }),
        2: new Todo({
            todoId: 2,
            userId: 1,
            completed: true
        })
    };
    const state = todosReducer(data, action);
    expect(state['1']).toBe(data['1']);
});

test('should add todo', () => {
    const action = addTodoSuccess(
        new Todo({
            todoId: 4,
            userId: 1,
            title: 'khjsd',
            completed: false
        })
    );
    const data = {
        1: new Todo({
            todoId: 1,
            userId: 1,
            completed: false
        }),
        2: new Todo({
            todoId: 2,
            userId: 1,
            completed: true
        })
    };
    const state = todosReducer(data, action);
    expect(Object.keys(state).length).toBe(3);
});

test('should update todo', () => {
    const action = updateTodoSuccess({
        todoId: 1,
        userId: 1,
        title: 'Updated Title'
    });
    const data = {
        1: new Todo({
            todoId: 1,
            userId: 1,
            title: 'Hello',
            completed: false
        }),
        2: new Todo({
            todoId: 2,
            userId: 1,
            completed: true
        })
    };
    const state = todosReducer(data, action);
    expect(state['1'].title).toEqual('Updated Title');
});

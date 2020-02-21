import Todo from "../models/todo.model";

export interface IState {
    todos: { [key: string]: any };
}

const defaultState: IState = { todos: {} };

export default (state: IState = defaultState, action) => {
    switch (action.type) {
        case 'SET_INITIAL_DATA':
            const todos: { [key: string]: Todo } = {};
            action.payload.todos.forEach((todo: Todo) => {
                todos[`${todo.id}`] = new Todo(todo);
            });
            return {
                ...state,
                ...todos
            };
        case 'SET_TODOS':
            return action.todos;
        default:
            return state;
    }
};

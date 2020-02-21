import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
    Reducer
} from 'redux';
import thunk from 'redux-thunk';

import usersReducer, { IState as IUsersState } from '../reducers/users.reducer';
import todosReducer, { IState as ITodosState } from '../reducers/todos.reducer';
import historyReducer, {
    IState as IHistoryState
} from '../reducers/history.reducer';

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IAppState {
    users: IUsersState;
    todos: ITodosState;
    history: IHistoryState;
}

const combinedReducers: Reducer<IAppState> = combineReducers({
    users: usersReducer,
    todos: todosReducer,
    history: historyReducer
});

export default () => {
    const store = createStore(
        combinedReducers,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};

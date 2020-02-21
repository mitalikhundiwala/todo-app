import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
    Reducer,
    AnyAction
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import usersReducer, { IState as IUsersState } from '../reducers/users.reducer';
import todosReducer, { IState as ITodosState } from '../reducers/todos.reducer';
import historyReducer, {
    IState as IHistoryState
} from '../reducers/history.reducer';
import uiReducer, { IState as IUIState } from '../reducers/ui.reducer';

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IAppState {
    users: IUsersState;
    todos: ITodosState;
    history: IHistoryState;
    ui: IUIState;
}

export type AppThunkDispatch = ThunkDispatch<IAppState, undefined, AnyAction>;

const combinedReducers: Reducer<IAppState> = combineReducers({
    users: usersReducer,
    todos: todosReducer,
    history: historyReducer,
    ui: uiReducer
});

export default () => {
    const store = createStore(
        combinedReducers,
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};

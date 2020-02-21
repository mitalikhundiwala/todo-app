import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import usersReducer from '../reducers/users.reducer';
import todosReducer from '../reducers/todos.reducer';
import historyReducer from '../reducers/history.reducer';

const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

export default () => {
  const store = createStore(
    combineReducers({
      users: usersReducer,
      todos: todosReducer,
      history: historyReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

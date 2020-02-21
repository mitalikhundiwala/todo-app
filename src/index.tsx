import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import configureStore from './store';
import App from './app';
import './styles/global.styles.scss';

const store = configureStore();
// store.subscribe(() => {
//   debugger;
//   saveState(store.getState());
// });

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

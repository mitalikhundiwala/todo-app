import React, { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IAppState } from './store';
import { Spinner } from 'reactstrap';

import { loadInitialData } from './actions/app.action';

interface IProps {
    loadInitialData: () => Promise<any>;
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<IAppState, undefined, AnyAction>
) => ({
    loadInitialData: () => {
        return dispatch(loadInitialData());
    }
});

const App: React.FunctionComponent<IProps> = (props: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        props.loadInitialData().then(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div>{isLoading ? <Spinner color="primary"></Spinner> : 'Hello'}</div>
    );
};

export default connect(undefined, mapDispatchToProps)(App);

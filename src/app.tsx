import * as React from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { saveState } from './database/localStorage';
import { loadInitialData } from './actions/app.action';

import Loader from './components/loader.component';

interface IProps {
    loadInitialData: () => Promise<any>;
}

const mapDispatchToProps = (dispatch): Partial<IProps> => ({
    loadInitialData: () => {
        return dispatch(loadInitialData());
    }
});

const App = (props: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        props.loadInitialData().then(() => {
            setIsLoading(false);
        });
    }, []);

    return <div>{isLoading ? <Loader /> : 'Hello'}</div>;
};

export default connect(undefined, mapDispatchToProps)(App);

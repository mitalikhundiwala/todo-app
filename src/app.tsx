import React, { FunctionComponent, createContext } from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppThunkDispatch, IAppState } from './store';
import { Spinner, Navbar, NavbarBrand, Alert } from 'reactstrap';

import { loadInitialData } from './actions/app.action';
import UserList from './components/user-list.component';
import UserDetail from './components/user-detail.component';

interface IProps {
    loadInitialData: () => Promise<any>;
    selectedUser: number | null;
}

export const { Provider, Consumer } = React.createContext({
    isTodosFetching: false,
    toggleIsTodosFetching: (isTodosFetching: boolean) => {}
});

const App: FunctionComponent<IProps> = ({
    loadInitialData,
    selectedUser
}: IProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isTodosFetching, setIsTodosFetching] = useState(false);

    const toggleIsTodosFetching = (isTodosFetching: boolean) => {
        setIsTodosFetching(isTodosFetching);
    };

    useEffect(() => {
        setIsLoading(true);
        loadInitialData().then(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <Navbar color="dark" dark>
                <NavbarBrand href="/">WakeCap</NavbarBrand>
            </Navbar>
            <div className="container my-4">
                {isLoading ? (
                    <div className="text-center">
                        <Spinner size="sm" color="primary"></Spinner> Loading Users...
                    </div>
                ) : (
                    <Provider
                        value={{ isTodosFetching, toggleIsTodosFetching }}
                    >
                        <>
                            <UserList />
                            {selectedUser ? (
                                <UserDetail></UserDetail>
                            ) : (
                                <Alert color="warning">No User selected</Alert>
                            )}
                        </>
                    </Provider>
                )}
            </div>
        </>
    );
};

const mapStateToProps = (state: IAppState) => {
    return {
        selectedUser: state.ui.selectedUser
    };
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => ({
    loadInitialData: () => {
        return dispatch(loadInitialData());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

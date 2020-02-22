import React, { FunctionComponent } from 'react';
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

const App: FunctionComponent<IProps> = ({
    loadInitialData,
    selectedUser
}: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

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
                    <Spinner color="primary"></Spinner>
                ) : (
                    <>
                        <UserList />
                        {selectedUser ? <UserDetail></UserDetail> : <Alert color="warning">No User selected</Alert>}
                    </>
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

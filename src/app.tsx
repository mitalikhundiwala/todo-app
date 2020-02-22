import React, { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppThunkDispatch } from './store';
import { Spinner, Navbar, NavbarBrand } from 'reactstrap';

import { loadInitialData } from './actions/app.action';
import UserList from './components/user-list.component';
import UserDetail from './components/user-detail.component';

interface IProps {
    loadInitialData: () => Promise<any>;
}

const mapDispatchToProps = (dispatch: AppThunkDispatch) => ({
    loadInitialData: () => {
        return dispatch(loadInitialData());
    }
});

const App: FunctionComponent<IProps> = (props: IProps) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        props.loadInitialData().then(() => {
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
                        <UserDetail></UserDetail>
                    </>
                )}
            </div>
        </>
    );
};

export default connect(undefined, mapDispatchToProps)(App);

import React, { FunctionComponent, useEffect } from 'react';
import { IAppState, AppThunkDispatch } from '../store';
import { connect } from 'react-redux';
import User from '../models/user.model';
import { FormGroup, Label, Input } from 'reactstrap';
import { selectUser } from '../actions/users.action';
import { getUsers } from '../selectors/users.selector';

interface IProps {
    users: User[];
    selectUser: (userId: number) => void;
}

const UserList: FunctionComponent<IProps> = ({ users, selectUser }) => {

    return (
        <FormGroup>
            <Label for="usersSelect">Please select User</Label>
            <Input
                type="select"
                name="select"
                id="usersSelect"
                onChange={e => {
                    selectUser(parseInt(e.target.value));
                }}
            >
                <option value="">Select User</option>
                {users.map((user: User) => {
                    return (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    );
                })}
            </Input>
        </FormGroup>
    );
};

const mapStateToProps = (state: IAppState) => {
    const users = getUsers(state.users);

    return {
        users: users
    };
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => ({
    selectUser: (userId: number) => {
        return dispatch(selectUser(userId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

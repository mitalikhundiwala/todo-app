import React, { FunctionComponent } from 'react';
import { IAppState, AppThunkDispatch } from '../store';
import { connect } from 'react-redux';
import User from '../models/user.model';
import { FormGroup, Label, Input } from 'reactstrap';
import { selectUser } from '../actions/users.action';

interface IProps {
    users: User[];
    selectUser: (userId: number) => void;
}

const UserList: FunctionComponent<IProps> = ({ users, selectUser }) => {
    return (
        <FormGroup>
            <Label for="usersSelect">Select User</Label>
            <Input
                type="select"
                name="select"
                id="usersSelect"
                onChange={e => {
                    selectUser(parseInt(e.target.value));
                }}
            >
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
    const users = Object.keys(state.users).map(userId => {
        return state.users[userId];
    });

    return {
        users: users
    };
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => ({
    selectUser: (userId: number) => {
        dispatch(selectUser(userId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);

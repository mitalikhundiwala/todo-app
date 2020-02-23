import usersReducer from '../../reducers/users.reducer';
import { setInitialData } from '../../actions/app.action';
import data from "../../data/db.json";

test('should set default state', () => {
    const state = usersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
});

test('should set users', () => {
    const action = setInitialData(data);
    const state = usersReducer({}, action);
    expect(Object.keys(state).length).toEqual(data.users.length);
    expect(state[2]).toEqual(data.users[1]);
});

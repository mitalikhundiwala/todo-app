import React, { FunctionComponent, useState } from 'react';
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
    Alert
} from 'reactstrap';
import classnames from 'classnames';
import { IAppState, AppThunkDispatch } from '../store';
import { getTodos } from '../selectors/todos.selector';
import { getHistory } from '../selectors/history.selector';
import Todo from '../models/todo.model';
import { connect } from 'react-redux';
import TodoList from './todo-list.component';
import HistoryList from './history-list.component';
import AddTodo from './add-todo.component';
import TodoHistory from '../models/history';
import User from '../models/user.model';
import { ToggleAddTodo } from '../actions/ui.action';

interface IProps {
    todos: Todo[] | null;
    historyWithUser:
        | {
              todoHistory: TodoHistory;
              user: User;
          }[]
        | null;
    toggleAddTodo: (isAddingTodo: boolean) => void;
    isAddingTodo: boolean;
}

const UserDetail: FunctionComponent<IProps> = ({
    todos,
    historyWithUser,
    toggleAddTodo,
    isAddingTodo
}) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <Nav tabs className="mb-4">
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === '1'
                        })}
                        onClick={() => {
                            toggle('1');
                        }}
                        href="#"
                    >
                        TODOs
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active: activeTab === '2'
                        })}
                        onClick={() => {
                            toggle('2');
                        }}
                        href="#"
                    >
                        History
                    </NavLink>
                </NavItem>
                <NavItem className="ml-auto">
                    <Button
                        color="primary"
                        onClick={() => {
                            toggleAddTodo(!isAddingTodo);
                        }}
                    >
                        Add TODO
                    </Button>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    {isAddingTodo ? (
                        <div className="mb-4">
                            <AddTodo></AddTodo>
                        </div>
                    ) : (
                        ''
                    )}

                    {todos && todos.length ? (
                        <TodoList todos={todos}></TodoList>
                    ) : (
                        <Alert color="warning">No Todos found</Alert>
                    )}
                </TabPane>
                <TabPane tabId="2">
                    {historyWithUser && historyWithUser.length ? (
                        <HistoryList history={historyWithUser}></HistoryList>
                    ) : (
                        <Alert color="warning">No History found</Alert>
                    )}
                </TabPane>
            </TabContent>
        </>
    );
};

const mapStateToProps = (state: IAppState) => {
    const todos = getTodos(state.todos, state.ui.selectedUser);
    const history = getHistory(
        state.history,
        state.ui.selectedUser,
        state.users
    );
    return {
        todos: todos,
        historyWithUser: history,
        isAddingTodo: state.ui.isAddingTodo
    };
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        toggleAddTodo: (isAddingTodo: boolean) => {
            dispatch(ToggleAddTodo(isAddingTodo));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);

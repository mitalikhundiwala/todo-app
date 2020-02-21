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
    Col
} from 'reactstrap';
import classnames from 'classnames';
import { IAppState } from '../store';
import { getTodos } from '../selectors/todos.selector';
import Todo from '../models/todo.model';
import { connect } from 'react-redux';
import TodoList from './todo-list.component';

interface IProps {
    todos: Todo[] | null;
}

const UserDetail: FunctionComponent<IProps> = ({ todos }) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab: string) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => {
                            toggle('1');
                        }}
                    >
                        TODOs
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => {
                            toggle('2');
                        }}
                    >
                        History
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    {todos && todos.length ? (
                        <TodoList todos={todos}></TodoList>
                    ) : (
                        'No Todos found'
                    )}
                </TabPane>
                <TabPane tabId="2">e3243242</TabPane>
            </TabContent>
        </>
    );
};

// const mapStateToProps = (state) => {
//     return {};
// };

const mapStateToProps = (state: IAppState) => {
    const todos = getTodos(state.todos, state.ui.selectedUser);
    console.log('Todos', todos);
    return {
        todos: todos
    };
};

export default connect(mapStateToProps)(UserDetail);

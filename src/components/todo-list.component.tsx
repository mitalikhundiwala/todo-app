import React, { FunctionComponent } from 'react';
import Todo from '../models/todo.model';
import TodoListItem from './todo-list-item.component';
import { ListGroup } from 'reactstrap';

interface IProps {
    todos: Todo[];
}

const TodoList: FunctionComponent<IProps> = ({ todos }) => {
    return (
        <ListGroup>
            {todos.map((todo: Todo) => {
                return <TodoListItem key={todo.todoId} todo={todo}></TodoListItem>;
            })}
        </ListGroup>
    );
};

export default TodoList;

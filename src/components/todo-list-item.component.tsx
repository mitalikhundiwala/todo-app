import React, { FunctionComponent } from 'react';
import Todo from '../models/todo.model';
import { ListGroupItem, FormGroup, Label, Input, Button } from 'reactstrap';
import { AppThunkDispatch } from '../store';
import { toggleCompleted, removeTodo } from '../actions/todos.action';
import { connect } from 'react-redux';

interface IProps {
    todo: Todo;
    toggleCompleted: (todoId: number, userId: number, completed: boolean) => void;
    removeTodo: (todoId: number, userId: number) => void;
}

const TodoListItem: FunctionComponent<IProps> = ({ todo, toggleCompleted, removeTodo }) => {
    return (
        <ListGroupItem>
            <FormGroup check>
                <Label check>
                    <Input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={e => {
                            toggleCompleted(todo.id, todo.userId, e.target.checked);
                        }}
                    />
                </Label>
            </FormGroup>
            {todo.title}
            <Button close onClick={e => {
                removeTodo(todo.id, todo.userId)
            }}></Button>
        </ListGroupItem>
    );
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        toggleCompleted: (todoId: number, userId: number, completed: boolean) => {
            dispatch(toggleCompleted(todoId, userId, completed));
        },
        removeTodo: (todoId: number, userId: number) => {
            dispatch(removeTodo(todoId, userId));
        }
    };
};

export default connect(undefined, mapDispatchToProps)(TodoListItem);

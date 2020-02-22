import React, { FunctionComponent, useState, RefObject } from 'react';
import Todo from '../models/todo.model';
import {
    ListGroupItem,
    FormGroup,
    Input,
    Button,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import { AppThunkDispatch } from '../store';
import {
    toggleCompleted,
    removeTodo,
    updateTodo
} from '../actions/todos.action';
import { connect } from 'react-redux';

interface IProps {
    todo: Todo;
    toggleCompleted: (
        todoId: number,
        userId: number,
        completed: boolean
    ) => void;
    removeTodo: (todoId: number, userId: number) => void;
    updateTodo: (todoId: number, title: string, userId: number) => void;
}

const TodoListItem: FunctionComponent<IProps> = ({
    todo,
    toggleCompleted,
    removeTodo,
    updateTodo
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(todo.title);
    const inputRef: RefObject<HTMLInputElement> = React.createRef();

    return (
        <ListGroupItem>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    const title = inputValue;
                    updateTodo(todo.id, title, todo.userId);
                    setIsEditing(false);
                }}
            >
                <div className="row">
                    <div className="col-auto">
                        <FormGroup check>
                            <Input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={e => {
                                    toggleCompleted(
                                        todo.id,
                                        todo.userId,
                                        e.target.checked
                                    );
                                }}
                            />
                        </FormGroup>
                    </div>
                    <div className="col">
                        {isEditing ? (
                            <InputGroup>
                                <Input
                                    type="text"
                                    name="todoTitle"
                                    value={inputValue}
                                    innerRef={inputRef}
                                    onChange={e => {
                                        setInputValue(e.target.value);
                                    }}
                                />
                                <InputGroupAddon addonType="append">
                                    <Button
                                        color="success"
                                        type="submit"
                                        outline
                                    >
                                        Update
                                    </Button>

                                    <Button
                                        outline
                                        color="secondary"
                                        onClick={e => {
                                            setInputValue(todo.title);
                                            setIsEditing(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                        ) : (
                            <div
                                className="text-break"
                                onClick={() => {
                                    setIsEditing(!isEditing);
                                }}
                            >
                                {todo.completed ? (
                                    <del className="text-secondary">{todo.title}</del>
                                ) : (
                                    <span>{todo.title}</span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="col-auto">
                        <Button
                            close
                            onClick={e => {
                                removeTodo(todo.id, todo.userId);
                            }}
                        ></Button>
                    </div>
                </div>
            </form>
        </ListGroupItem>
    );
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        toggleCompleted: (
            todoId: number,
            userId: number,
            completed: boolean
        ) => {
            dispatch(toggleCompleted(todoId, userId, completed));
        },
        removeTodo: (todoId: number, userId: number) => {
            dispatch(removeTodo(todoId, userId));
        },
        updateTodo: (todoId: number, title: string, userId: number) => {
            dispatch(updateTodo(todoId, title, userId));
        }
    };
};

export default connect(undefined, mapDispatchToProps)(TodoListItem);

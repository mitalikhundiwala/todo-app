import React, { FunctionComponent, useState, RefObject } from 'react';
import Todo from '../models/todo.model';
import {
    ListGroupItem,
    FormGroup,
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Spinner
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
    const [updateTodoInProgress, setUpdateTodoInProgress] = useState(false);
    const [removeTodoInProgress, setRemoveTodoInProgress] = useState(false);

    return (
        <ListGroupItem>
            <form
                onSubmit={async e => {
                    e.preventDefault();
                    const title = inputValue;
                    setUpdateTodoInProgress(true);
                    await updateTodo(todo.todoId, title, todo.userId);
                    setUpdateTodoInProgress(false);
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
                                        todo.todoId,
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
                                    {updateTodoInProgress ? (
                                        <InputGroupText>
                                            <Spinner
                                                size="sm"
                                                color="primary"
                                            />
                                        </InputGroupText>
                                    ) : (
                                        <>
                                            <Button
                                                color="success"
                                                type="submit"
                                                outline
                                                disabled={!inputValue}
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
                                        </>
                                    )}
                                </InputGroupAddon>
                            </InputGroup>
                        ) : (
                            <div
                                className="text-break"
                                onClick={() => {
                                    !todo.completed
                                        ? setIsEditing(!isEditing)
                                        : '';
                                }}
                            >
                                {todo.completed ? (
                                    <del className="text-secondary">
                                        {todo.title}
                                    </del>
                                ) : (
                                    <span>{todo.title}</span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="col-auto">
                        {removeTodoInProgress ? (
                            <InputGroupText>
                                <Spinner size="sm" color="primary" />
                            </InputGroupText>
                        ) : (
                            <>
                                <Button
                                    close
                                    onClick={async e => {
                                        setRemoveTodoInProgress(true);
                                        await removeTodo(
                                            todo.todoId,
                                            todo.userId
                                        );
                                        setRemoveTodoInProgress(false);
                                    }}
                                ></Button>
                            </>
                        )}
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
            return dispatch(removeTodo(todoId, userId));
        },
        updateTodo: (todoId: number, title: string, userId: number) => {
            return dispatch(updateTodo(todoId, title, userId));
        }
    };
};

export default connect(undefined, mapDispatchToProps)(TodoListItem);

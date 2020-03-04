import React, { FunctionComponent, useState, RefObject, useRef } from 'react';
import {
    Input,
    Button,
    InputGroup,
    InputGroupAddon,
    Spinner,
    InputGroupText
} from 'reactstrap';
import { AppThunkDispatch, IAppState } from '../store';
import { addTodo } from '../actions/todos.action';
import { connect } from 'react-redux';
import { ToggleAddTodo } from '../actions/ui.action';
import Todo from '../models/todo.model';
import { render } from 'react-dom';

interface IProps {
    addTodo: (title: string, userId: number) => Promise<Todo>;
    userId: number;
    toggleAddTodo: (isAddingTodo: boolean) => void;
    isAddingTodo: boolean;
}

const AddTodo: FunctionComponent<IProps> = ({
    addTodo,
    userId,
    toggleAddTodo,
    isAddingTodo
}) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef: RefObject<HTMLInputElement> = React.createRef();
    // const inputRef: RefObject<HTMLInputElement> = useRef(null);
    const [addTodoInProgress, setAddTodoInProgress] = useState(false);

    setTimeout(() => {
        inputRef.current?.focus();
    });


    return (
        
        <form
            onSubmit={async e => {
                e.preventDefault();
                const title = inputValue;
                setAddTodoInProgress(true);
                await addTodo(title, userId);
            }}
        >
            <InputGroup>
                <Input
                    type="text"
                    name="todoTitle"
                    innerRef={inputRef}
                    onChange={e => {
                        setInputValue(e.target.value);
                    }}
                />
                <InputGroupAddon addonType="append">
                    {addTodoInProgress ? (
                        <InputGroupText>
                            <Spinner size="sm" color="primary" />
                        </InputGroupText>
                    ) : (
                        <>
                            <Button color="success" type="submit" outline disabled={!inputValue}>
                                Add
                            </Button>
                            <Button
                                outline
                                color="secondary"
                                onClick={e => {
                                    setInputValue('');
                                    toggleAddTodo(!isAddingTodo);
                                }}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </InputGroupAddon>
            </InputGroup>
        </form>
    );
};

const mapStateToProps = (state: IAppState) => {

    return {
        userId: state.ui.selectedUser as number,
        isAddingTodo: state.ui.isAddingTodo
    };
};

const mapDispatchToProps = (dispatch: AppThunkDispatch) => {
    return {
        addTodo: (title: string, userId: number) => {
            return dispatch(addTodo(title, userId));
        },
        toggleAddTodo: (isAddingTodo: boolean) => {
            dispatch(ToggleAddTodo(isAddingTodo));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);

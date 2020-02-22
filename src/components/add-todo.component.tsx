import React, { FunctionComponent, useState, RefObject } from 'react';
import { Input, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { AppThunkDispatch, IAppState } from '../store';
import { addTodo } from '../actions/todos.action';
import { connect } from 'react-redux';
import { ToggleAddTodo } from '../actions/ui.action';

interface IProps {
    addTodo: (title: string, userId: number) => void;
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

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                const title = inputValue;
                addTodo(title, userId);
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
                    <Button color="success" type="submit" outline>
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
            dispatch(addTodo(title, userId));
        },
        toggleAddTodo: (isAddingTodo: boolean) => {
            dispatch(ToggleAddTodo(isAddingTodo));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo);

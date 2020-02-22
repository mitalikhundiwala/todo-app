import React, { FunctionComponent } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { formatDistanceToNow } from 'date-fns';
import TodoHistory, { TodoAction } from '../models/history';
import User from '../models/user.model';

interface IProps {
    history: {
        todoHistory: TodoHistory;
        user: User;
    }[];
}

const getActionDescription = (todoHistory: TodoHistory, user: User) => {
    if (todoHistory.action === TodoAction.COMPLETED) {
        return (
            <>
                <span className="text-primary">{user.name}</span>{' '}
                <span>changed</span> ToDo#{' '}
                <span className="text-primary">{todoHistory.todoId}</span> to{' '}
                <span>Done</span>
            </>
        );
    } else if (todoHistory.action === TodoAction.UNCOMPLETED) {
        return (
            <>
                <span className="text-primary">{user.name}</span>{' '}
                <span>changed</span> ToDo#{' '}
                <span className="text-primary">{todoHistory.todoId}</span> to{' '}
                <span>Undone</span>
            </>
        );
    } else if (todoHistory.action === TodoAction.CREATED) {
        return (
            <>
                <span className="text-primary">{user.name}</span>{' '}
                <span>added</span> ToDo#{' '}
                <span className="text-primary">{todoHistory.todoId}</span>
            </>
        );
    } else if (todoHistory.action === TodoAction.DELETED) {
        return (
            <>
                <span className="text-primary">{user.name}</span>{' '}
                <span>removed</span> ToDo#{' '}
                <span className="text-primary">{todoHistory.todoId}</span>
            </>
        );
    } else if (todoHistory.action === TodoAction.UPDATED) {
        return (
            <>
                <span className="text-primary">{user.name}</span>{' '}
                <span>updated</span> ToDo#{' '}
                <span className="text-primary">{todoHistory.todoId}</span>
            </>
        );
    }
};

const HistoryList: FunctionComponent<IProps> = ({ history }) => {
    return (
        <ListGroup>
            {history.map(datum => {
                return (
                    <ListGroupItem
                        key={datum.todoHistory.performedAt.getTime()}
                    >
                        <div className="row">
                            <div className="col">
                                {getActionDescription(
                                    datum.todoHistory,
                                    datum.user
                                )}
                            </div>
                            <div className="col-auto text-right">
                                <em className="text-secondary">
                                    {formatDistanceToNow(
                                        datum.todoHistory.performedAt,
                                        {
                                            includeSeconds: true,
                                            addSuffix: true
                                        }
                                    )}
                                </em>
                            </div>
                        </div>
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
};

export default HistoryList;

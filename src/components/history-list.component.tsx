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
        return `${user.name} Changed TODO#${todoHistory.todoId} to done`;
    } else if (todoHistory.action === TodoAction.UNCOMPLETED) {
        return `${user.name} Changed TODO#${todoHistory.todoId} to undone`;
    } else if (todoHistory.action === TodoAction.CREATED) {
        return `${user.name} Added TODO#${todoHistory.todoId}`;
    } else if (todoHistory.action === TodoAction.DELETED) {
        return `${user.name} Removed TODO#${todoHistory.todoId}`;
    } else if (todoHistory.action === TodoAction.UPDATED) {
        return `${user.name} Updated TODO#${todoHistory.todoId}`;
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
                                {formatDistanceToNow(
                                    datum.todoHistory.performedAt,
                                    { includeSeconds: true, addSuffix: true }
                                )}
                            </div>
                        </div>
                    </ListGroupItem>
                );
            })}
        </ListGroup>
    );
};

export default HistoryList;

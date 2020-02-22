export enum TodoAction {
    COMPLETED,
    UNCOMPLETED,
    UPDATED,
    CREATED,
    DELETED
}

export interface ITodoHistory {
    todoId: number;
    userId: number;
    action: TodoAction;
    performedAt: Date;
}

export default class TodoHistory {
    todoId: number;
    userId: number;
    action: TodoAction;
    performedAt: Date;

    constructor(data: ITodoHistory) {
        this.todoId = data.todoId;
        this.userId = data.userId;
        this.action = data.action;
        this.performedAt = data.performedAt;
    }
}

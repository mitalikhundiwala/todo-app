export enum TodoAction {
    COMPLETED,
    UNCOMPLETED,
    UPDATED,
    CREATED,
    DELETED
}

export default class TodoHistory {
    todoId: number;
    userId: number;
    action: TodoAction;
    performedAt: Date;

    constructor(data: any) {
        this.todoId = data.todoId;
        this.userId = data.userId;
        this.action = data.action;
        this.performedAt = data.performedAt;
    }
}

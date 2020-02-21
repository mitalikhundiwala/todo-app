export default class TodoHistory {
    todoId: number;
    userId: number;
    action: string;
    performedAt: Date;

    constructor(data: any) {
        this.todoId = data.todoId;
        this.userId = data.userId;
        this.action = data.action;
        this.performedAt = data.performedAt;
    }
}

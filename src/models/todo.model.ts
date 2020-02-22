export default class Todo {
    todoId: number;
    userId: number;
    title: string;
    completed: boolean;

    constructor(data: any) {
        this.todoId = data.todoId;
        this.userId = data.userId;
        this.title = data.title;
        this.completed = data.completed;
    }
}

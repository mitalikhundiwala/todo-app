export default class Todo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.userId = data.userId;
        this.title = data.title;
        this.completed = data.completed;
    }
}

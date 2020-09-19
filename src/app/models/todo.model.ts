import { typeWithParameters } from '@angular/compiler/src/render3/util';

export class Todo {
    id: number;
    title: string;
    completed: boolean;

    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}

import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos:Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos()
    .subscribe( 
      (res) => {
        this.todos = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteTodo(todo: Todo) {
    console.log(todo);
    //Delete from UI 
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //Delete from Server
    this.todoService.deleteTodo(todo)
    .subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addTodo(todo: Todo) {
    console.log(todo);
    //Add to server
    this.todoService.addTodo(todo)
      .subscribe(
        (res) => {
          console.log(res);
          this.todos.push(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

}

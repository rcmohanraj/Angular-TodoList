import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  animations: [
    trigger('fallOverState', [
        state('hide', style({
          transform: 'translateY(8rem) rotateZ(20deg)',
          opacity: 0,
        })),
        transition('show => hide', animate('600ms ease-out')),
      ]
    )
  ]
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @Output() deleteEvent: EventEmitter<Todo> = new EventEmitter();

  isDelete:boolean = false;

  stateName:string = 'show';

  classes = {
    'todo': true,
    'is-completed': false,
    'fall': false
  }

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  setClasses() {
    this.classes['is-completed'] = this.todo.completed;
    return this.classes;
  }

  toggle(todo) {
    //toggle in UI
    todo.completed = !todo.completed;
    //toggle in server
    this.todoService.updateCompleted(todo)
    .subscribe( 
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  delete(todo) {
    this.stateName = 'hide';
    //this.classes['fall'] = true;
    //this.deleteEvent.emit(todo);
  }

  handleDelete(event, todo) {
    if(event.fromState === 'show') {
      console.log(event);
      this.deleteEvent.emit(todo);
    }
  }

}

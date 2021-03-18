import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService} from '../../service/todo.service';

import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todo: Todo = new Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
  }

  //Set Dynamic classes
  setClasses() {
    let classes = {
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToggle(todo: Todo) {
    //Toggle in UI
    todo.completed = !todo.completed;
    //Toggle on server
    this.todoService.toggleCompleted(todo).subscribe((todo: any) => console.log(todo));
  }//We update service, subscribe gives todo back

  //emitting deleting component and catching it in todos.component.html
  onDelete(todo: any) {
    this.deleteTodo.emit(todo);
}
}
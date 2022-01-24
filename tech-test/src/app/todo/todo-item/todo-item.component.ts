import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  todo: Todo;

  constructor(private route: ActivatedRoute, private todoService: TodoService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      this.getTodoDetail(id);
    })
  }

  getTodoDetail(id) {
    this.todoService.getTodo(id).subscribe((data: Todo) => {
      this.todo = data;
    }, error => {
      console.log(error);
    })
  }

}

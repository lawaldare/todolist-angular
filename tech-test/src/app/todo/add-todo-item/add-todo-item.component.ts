import { TodoService } from './../todo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.scss']
})
export class AddTodoItemComponent implements OnInit, OnDestroy {

  title: string;
  description: string;
  category: string;
  pageTitle: string;
  id: number;
  done: boolean;

  sub = new Subscription();

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get("id");
      if (this.id) {
        this.pageTitle = "Update";
        this.getTodoDetail(this.id);
      } else {
        this.pageTitle = "Add";
      }
    })
  }


  getTodoDetail(id) {
    this.todoService.getTodo(id).subscribe((data: Todo) => {
      this.title = data.label;
      this.description = data.description;
      this.category = data.category;
      this.done = data.done;
    }, error => {
      console.log(error);
    })
  }

  changeState(event) {
    this.done = event.target.checked;
  }


  addTodo(form: NgForm) {
    let payload: any = {};
    payload.id = Math.ceil(Math.random() * 10e13);
    payload.label = this.title;
    payload.description = this.description;
    payload.category = this.category
    payload.done = false;
    this.sub = this.todoService.addTodo(payload).subscribe(data => {
      this.resetForm();
      this.router.navigate(['/todos'])
    }, error => {
      console.log('Error occured!')
    })
  }

  updateTodo() {
    let payload: any = {};
    payload.label = this.title;
    payload.description = this.description;
    payload.category = this.category
    payload.done = this.done;
    this.sub = this.todoService.updateTodo(this.id, payload).subscribe(data => {
      this.resetForm();
      this.router.navigate(['/todos'])
    }, error => {
      console.log('Error occured!')
    })
  }

  resetForm() {
    this.title = "";
    this.category = "";
    this.description = "";
    this.done = false;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';


@NgModule({
  declarations: [TodoListComponent, TodoItemComponent, AddTodoItemComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
  ]
})
export class TodoModule { }

import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';


const routes: Routes = [
  { path: '', component: TodoListComponent },
  { path: 'add', component: AddTodoItemComponent },
  { path: 'edit/:id', component: AddTodoItemComponent },
  { path: ':id', component: TodoItemComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }

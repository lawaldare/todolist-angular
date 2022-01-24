import { TodoService } from './../todo.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


export interface Todo {
  id: number;
  category: string;
  description: string;
  done: boolean;
  label: string;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos: Todo[];
  filteredTodos: Todo[];

  deleteSub = new Subscription();
  todosSub = new Subscription();

  private _searchTerm = "";

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(text: string) {
    this._searchTerm = text;
    this.performFilter(this.searchTerm)
  }

  constructor(private todoService: TodoService, private router: Router) { }

  ngOnInit() {
    this.getTodos();
  }


  performFilter(term: string): void {
    if (term) {
      this.filteredTodos = this.todos.filter((todo: Todo) => todo.label.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) !== -1);
    } else {
      this.filteredTodos = this.todos;
    }
  }


  getTodos() {
    this.todosSub = this.todoService.getAllTodos().subscribe((data: Todo[]) => {
      this.todos = data;
      this.performFilter(this.searchTerm)
    }, error => {
      console.log(error);
    })
  }

  editTodo(todo: Todo) {
    this.router.navigate(['todos/edit', todo.id])
  }

  deleteTodo(id: number) {
    this.deleteSub = this.todoService.deleteTodo(id).subscribe(data => {
      this.getTodos();
    }, error => {
      console.log(error)
    })
  }

  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
    this.todosSub.unsubscribe();
  }
}

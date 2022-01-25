import { MockTodos } from './todo.mock';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { TodoService } from './todo.service';
import { Todo } from './todo-list/todo-list.component';

describe('TodoService', () => {

  let todoService: TodoService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    })

    todoService = TestBed.get(TodoService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  })



  it('should be created', () => {
    // const service: TodoService = TestBed.get(TodoService);
    expect(todoService).toBeTruthy();
  });

  it('should get all todos', () => {

    todoService.getAllTodos().subscribe((todos: Todo[]) => {
      expect(todos).toBeTruthy('No todos returned');

      const todo = todos.find(todo => todo.id === 1);

      expect(todo.label).toBe("Kitchen Cleanup");
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');

    expect(req.request.method).toEqual('GET');

    req.flush(MockTodos);

  })


  it('should get a todo by Id', () => {

    todoService.getTodo(1).subscribe((todo: Todo) => {
      expect(todo).toBeTruthy('No todos returned');
      expect(todo.id).toBe(1);
      expect(todo.label).toBe("Kitchen Cleanup");
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks/1');

    expect(req.request.method).toEqual('GET');

    req.flush(MockTodos[0])

  })

  it('should delete a todo by Id', () => {

    todoService.deleteTodo(1).subscribe((todo: Todo) => {
      expect(todo).toBeFalsy();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks/1');

    expect(req.request.method).toEqual('DELETE');

    req.flush(null)

  })


  it('should update a todo by Id', () => {

    const updatedTodo = {
      label: "Kitchen Cleanup updated",
      description: "Clean my dirty kitchen neatly",
      category: "house cleaning",
      done: false
    }

    todoService.updateTodo(1, updatedTodo).subscribe((todo: Todo) => {
      expect(todo).toBeTruthy('No todos returned');
      expect(todo.id).toBe(1);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks/1');

    expect(req.request.method).toEqual('PATCH');

    expect(req.request.body.label).toEqual(updatedTodo.label);

    req.flush({
      ...MockTodos[0],
      ...updatedTodo
    })

  })


  it('should add a todo', () => {

    const newTodo = {
      id: Math.ceil(Math.random() * 10e13),
      label: "Kitchen Cleanup updated",
      description: "Clean my dirty kitchen neatly",
      category: "house cleaning",
      done: false
    }

    todoService.addTodo(newTodo).subscribe((todo: Todo) => {
      expect(todo).toBeTruthy('No todos returned');
    });

    const req = httpTestingController.expectOne('http://localhost:3000/tasks');

    expect(req.request.method).toEqual('POST');

    expect(req.request.body.label).toEqual(newTodo.label);

    req.flush({
      ...MockTodos,
      newTodo
    })

  })
});

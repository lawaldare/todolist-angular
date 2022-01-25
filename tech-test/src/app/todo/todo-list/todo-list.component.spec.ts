import { MockTodos } from './../todo.mock';
import { TodoService } from './../todo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoModule } from './../todo.module';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators'

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TodoModule, RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTodos and return data', fakeAsync(() => {
    let todoService = fixture.debugElement.injector.get(TodoService);
    spyOn(todoService, "getAllTodos").and.callFake(() => {
      return of(MockTodos);
    })
    component.getTodos();
    expect(component.todos).toEqual(MockTodos);
  }))
});

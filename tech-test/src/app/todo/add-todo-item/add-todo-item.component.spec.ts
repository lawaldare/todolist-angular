import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoModule } from '../todo.module';

import { AddTodoItemComponent } from './add-todo-item.component';

describe('AddTodoItemComponent', () => {
  let component: AddTodoItemComponent;
  let fixture: ComponentFixture<AddTodoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TodoModule, RouterTestingModule, HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

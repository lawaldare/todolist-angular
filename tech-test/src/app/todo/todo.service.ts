import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  baseUrl = "http://localhost:3000/tasks";

  constructor(private http: HttpClient) { }


  getAllTodos() {
    return this.http.get(this.baseUrl);
  }

  addTodo(payload: { id: number, label: string, description: string, done: boolean }) {
    return this.http.post(this.baseUrl, payload);
  }

  getTodo(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateTodo(id: number, payload) {
    return this.http.patch(`${this.baseUrl}/${id}`, payload);
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

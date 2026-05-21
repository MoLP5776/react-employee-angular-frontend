import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/employee';
import {Task} from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  search(name: string) {
    return this.http.get<Employee[]>(
      `${this.apiUrl}?name=${name}`
    );
  }

  getById(id: string) {
    return this.http.get<Employee>(
      `${this.apiUrl}/${id}`
    );
  }

  create(employee: Employee) {
    return this.http.post<Employee>(
      this.apiUrl,
      employee
    );
  }

  getHoursWorked(id: string) {
    return this.http.get<number>(
      `${this.apiUrl}/${id}/hoursWorked`
    );
  }

  getTasks(id: string, from: string, to: string) {
    return this.http.get<Task[]>(
      `${this.apiUrl}/${id}/tasks?from=${from}&to=${to}`
    );
  }
}

import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { Task } from '../../../core/models/task';

@Component({
  selector: 'app-employee-tasks',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './employee-tasks.html',
  styleUrl: './employee-tasks.css',
})
export class EmployeeTasks implements OnInit {
  @Input() employeeId?: string;
  tasks = signal<Task[]>([]);
  from = '';
  to = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    if (this.employeeId) {
      this.setDefaultDates();
      this.loadTasks();
    }
  }

  setDefaultDates() {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

    this.to = today.toISOString().split('T')[0];
    this.from = lastMonth.toISOString().split('T')[0];
  }

  loadTasks() {
    if (this.employeeId && this.from && this.to) {
      this.employeeService.getTasks(this.employeeId, this.from, this.to).subscribe(
        (data) => {
          this.tasks.set(data);
        },
        (error) => {
          console.error('Error loading tasks:', error);
        }
      );
    }
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee';
import { EmployeeTasks } from '../employee-tasks/employee-tasks';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, RouterLink, EmployeeTasks],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail implements OnInit {
  employee = signal<Employee | undefined>(undefined);
  hoursWorked = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.loadEmployee(id);
        this.loadHoursWorked(id);
      }
    });
  }

  loadEmployee(id: string) {
    this.employeeService.getById(id).subscribe(
      (data) => {
        this.employee.set(data);
      },
      (error) => {
        console.error('Error loading employee:', error);
      }
    );
  }

  loadHoursWorked(id: string) {
    this.employeeService.getHoursWorked(id).subscribe(
      (hours) => {
        this.hoursWorked.set(hours);
      },
      (error) => {
        console.error('Error loading hours worked:', error);
      }
    );
  }
}

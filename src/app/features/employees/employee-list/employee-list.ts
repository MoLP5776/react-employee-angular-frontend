import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee';

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit {
  employees = signal<Employee[]>([]);
  searchText = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAll().subscribe(
      (data) => {
        this.employees.set(data);
      },
      (error) => {
        console.error('Error loading employees:', error);
      }
    );
  }

  search() {
    if (this.searchText.trim()) {
      this.employeeService.search(this.searchText).subscribe(
        (data) => {
          this.employees.set(data);
        },
        (error) => {
          console.error('Error searching employees:', error);
        }
      );
    } else {
      this.loadEmployees();
    }
  }
}

import {Component} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {EmployeeService} from '../../../core/services/employee.service';
import {Employee} from '../../../core/models/employee';

@Component({
  selector: 'app-employee-create',
  imports: [FormsModule, RouterLink],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.css',
})
export class EmployeeCreate {
  id = '';
  firstName = '';
  lastName = '';
  message = '';
  messageType: 'success' | 'error' | null = null;

  constructor(
    private employeeService: EmployeeService,
  ) {
  }

  private setMessage(message: string, type: 'success' | 'error') {
    this.message = message;
    this.messageType = type;
  }

  save() {
    const employee: Employee = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
    };

    if (employee.id && employee.firstName && employee.lastName) {
      this.employeeService.create(employee).subscribe(
        (data) => {
          this.setMessage(`Employee created successfully: ${data.firstName} ${data.lastName}`, 'success');
        },
        (error) => {
          const details = error?.error?.message || error?.message || 'Unknown error occurred';
          this.setMessage(`Error creating employee: ${details}`, 'error');
        },
      );
    } else {
      this.setMessage('Please fill in all fields', 'error');
    }
  }
}

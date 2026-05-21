import {Component} from '@angular/core';

import {FormsModule} from '@angular/forms';
import {RouterLink, Router} from '@angular/router';
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

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {
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
          console.log('Employee created successfully:', data);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error creating employee:', error);
        },
      );
    } else {
      alert('Please fill in all fields');
    }
  }
}

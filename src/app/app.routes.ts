import {Routes} from '@angular/router';
import {EmployeeList} from './features/employees/employee-list/employee-list';
import {EmployeeCreate} from './features/employees/employee-create/employee-create';
import {EmployeeDetail} from './features/employees/employee-detail/employee-detail';

export const routes: Routes = [

  {path: '', component: EmployeeList},
  {path: 'employees/create', component: EmployeeCreate},
  {path: 'employees/:id', component: EmployeeDetail}
];

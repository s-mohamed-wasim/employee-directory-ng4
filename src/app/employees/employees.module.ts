import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

/**
 * Lazy-loaded feature module (loadChildren string syntax).
 */
@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, EmployeesRoutingModule],
  declarations: [EmployeeListComponent, EmployeeDetailComponent, EmployeeFormComponent]
})
export class EmployeesModule { }

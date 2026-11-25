import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../core/employee.service';
import { DepartmentService } from '../../core/department.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  departmentNames: { [id: number]: string } = {};
  search = '';
  showInactive = true;
  loading = true;

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(depts => {
      depts.forEach(d => this.departmentNames[d.id] = d.name);
    });
    this.load();
  }

  load() {
    this.employeeService.getEmployees().subscribe(list => {
      this.employees = list;
      this.loading = false;
    });
  }

  get visibleEmployees(): Employee[] {
    return this.showInactive ? this.employees : this.employees.filter(e => e.active);
  }

  remove(employee: Employee) {
    if (confirm(`Delete ${employee.firstName} ${employee.lastName}?`)) {
      this.employeeService.delete(employee.id).subscribe(() => this.load());
    }
  }
}

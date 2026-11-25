import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../core/employee.service';
import { DepartmentService } from '../core/department.service';
import { Employee } from '../models/employee';
import { Department } from '../models/department';

interface DepartmentStat {
  name: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  total = 0;
  active = 0;
  inactive = 0;
  stats: DepartmentStat[] = [];
  recent: Employee[] = [];
  now = new Date();

  constructor(private employees: EmployeeService, private departments: DepartmentService) { }

  ngOnInit() {
    setInterval(() => this.now = new Date(), 1000);

    // Nested subscriptions (legacy pattern)
    this.employees.getEmployees().subscribe(list => {
      this.total = list.length;
      this.active = list.filter(e => e.active).length;
      this.inactive = this.total - this.active;
      this.recent = list.slice().sort((a, b) => b.joinedOn.localeCompare(a.joinedOn)).slice(0, 5);

      this.departments.getDepartments().subscribe((depts: Department[]) => {
        this.stats = depts.map(d => ({
          name: d.name,
          count: list.filter(e => e.departmentId === d.id).length
        }));
        console.log('Dashboard stats loaded', this.stats);
      });
    });
  }
}

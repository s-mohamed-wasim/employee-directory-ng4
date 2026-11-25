import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { EmployeeService } from '../../core/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {

  employee: Employee;
  bioHtml: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeService.getEmployee(+params['id']).subscribe(emp => {
        this.employee = emp;
        if (emp) {
          // tslint:disable-next-line
          this.bioHtml = this.sanitizer.bypassSecurityTrustHtml(emp.bio);
        }
      });
    });
  }
}

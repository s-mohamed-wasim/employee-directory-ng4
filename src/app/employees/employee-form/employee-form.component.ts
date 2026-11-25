import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../core/employee.service';
import { DepartmentService } from '../../core/department.service';
import { Department } from '../../models/department';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {

  form: FormGroup;
  departments: Department[] = [];
  editingId: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      departmentId: [null, Validators.required],
      location: [''],
      joinedOn: [new Date().toISOString().substring(0, 10)],
      active: [true],
      bio: ['']
    });

    this.departmentService.getDepartments().subscribe(d => this.departments = d);

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editingId = +id;
      this.employeeService.getEmployee(this.editingId).subscribe(emp => {
        if (emp) {
          this.form.patchValue(emp);
        }
      });
    }
  }

  get f() {
    return this.form.controls;
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    const employee: Employee = Object.assign({}, this.form.value, { id: this.editingId });
    employee.departmentId = +employee.departmentId;
    this.employeeService.save(employee).subscribe(saved => {
      this.router.navigate(['/employees', saved.id]);
    });
  }
}

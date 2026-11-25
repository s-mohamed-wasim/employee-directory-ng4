import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { environment } from '../../environments/environment';
import { Employee } from '../models/employee';

/**
 * Loads employees from a static JSON file (assets/data/employees.json)
 * and keeps added/edited employees in memory.
 *
 * Uses the legacy @angular/http module on purpose (removed in later Angular versions).
 */
@Injectable()
export class EmployeeService {

  private cache: Employee[];

  constructor(private http: Http) { }

  getEmployees(): Observable<Employee[]> {
    if (this.cache) {
      return Observable.of(this.cache);
    }
    return this.http.get(`${environment.apiBaseUrl}/employees.json`)
      .map((res: Response) => res.json() as Employee[])
      .do(list => this.cache = list)
      .catch(err => {
        console.error('Failed to load employees', err);
        return Observable.throw(err);
      });
  }

  getEmployee(id: number): Observable<Employee> {
    return this.getEmployees()
      .map(list => list.find(e => e.id === id));
  }

  save(employee: Employee): Observable<Employee> {
    // @ts-ignore
    const list: Employee[] = this.cache || [];
    if (employee.id) {
      const index = list.findIndex(e => e.id === employee.id);
      list[index] = employee;
    } else {
      employee.id = Math.max(0, ...list.map(e => e.id)) + 1;
      list.push(employee);
    }
    this.cache = list;
    return Observable.of(employee);
  }

  delete(id: number): Observable<boolean> {
    this.cache = (this.cache || []).filter(e => e.id !== id);
    return Observable.of(true);
  }
}

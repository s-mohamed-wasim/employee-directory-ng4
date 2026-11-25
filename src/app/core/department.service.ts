import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Department } from '../models/department';

/**
 * Uses the newer HttpClient (introduced in Angular 4.3).
 */
@Injectable()
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${environment.apiBaseUrl}/departments.json`);
  }
}

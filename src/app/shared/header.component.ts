import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-inverse navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand brand" routerLink="/">Employee Directory</a>
        </div>
        <ul class="nav navbar-nav" *ngIf="auth.isLoggedIn()">
          <li routerLinkActive="active"><a routerLink="/dashboard">Dashboard</a></li>
          <li routerLinkActive="active"><a routerLink="/employees">Employees</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right" *ngIf="auth.isLoggedIn()">
          <li><p class="navbar-text">Signed in as {{ auth.currentUser }}</p></li>
          <li><a href="" (click)="logout($event)">Logout</a></li>
        </ul>
      </div>
    </nav>
  `
})
export class HeaderComponent {

  constructor(public auth: AuthService, private router: Router) { }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

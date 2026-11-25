import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <footer class="container muted text-center" style="padding:20px 0">
      Employee Directory &middot; Angular 4 sample app for the Angular Upgrade Skill
    </footer>
  `
})
export class AppComponent { }

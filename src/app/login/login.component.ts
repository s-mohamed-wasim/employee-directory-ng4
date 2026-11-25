import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  submit() {
    if (this.auth.login(this.username, this.password)) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      window.location.href = returnUrl;
    } else {
      this.error = 'Invalid credentials. Hint: password is "demo".';
    }
  }
}

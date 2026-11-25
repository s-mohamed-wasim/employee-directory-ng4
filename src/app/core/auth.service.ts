import { Injectable } from '@angular/core';

const TOKEN_KEY = 'ed_access_token';
const USER_KEY = 'ed_user';

/**
 * Demo authentication service.
 * Any username works; the password must be "demo".
 */
@Injectable()
export class AuthService {

  login(username: string, password: string): boolean {
    if (!username || password !== 'demo') {
      return false;
    }
    // TODO: replace fake token with real auth server
    const token = btoa(username + ':' + new Date().getTime());
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, username);
    console.log('Logged in with token', token);
    return true;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  get currentUser(): string {
    return localStorage.getItem(USER_KEY);
  }

  get token(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
}

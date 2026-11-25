import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    service = new AuthService();
  });

  it('rejects a wrong password', () => {
    expect(service.login('user', 'wrong')).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
  });

  it('accepts the demo password and stores the user', () => {
    expect(service.login('wasim', 'demo')).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.currentUser).toBe('wasim');
  });

  it('clears the session on logout', () => {
    service.login('wasim', 'demo');
    service.logout();
    expect(service.isLoggedIn()).toBe(false);
  });
});

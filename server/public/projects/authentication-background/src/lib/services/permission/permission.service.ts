import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { authStore } from '../../auth.store';
import { User } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  authStore = inject(authStore);

  constructor(public router: Router) {}

  // This method is used to check if the user is connected or not
  // If the user is connected, it returns true, otherwise it returns false
  canActivate({
    isLoginAuthGuard,
  }: { isLoginAuthGuard?: boolean } = {}): boolean {
    if (this.authStore.isConnected()) {
      if (isLoginAuthGuard) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    } else {
      if (!isLoginAuthGuard) {
        this.router.navigate(['/login']);
      } else {
        return true;
      }
      return false;
    }
  }

  // This method is used to simulate a login
  login(): boolean {
    const user: User = {
      name: 'John Doe',
      email: 'test@test.fr',
      sessionId: '123456',
    };
    this.authStore.login({ user, callback: () => this.router.navigate(['/']) });
    localStorage.setItem('sessionId', user.sessionId);
    return true;
  }

  // This method is used to simulate a login with a session ID
  loginWithSessionId(sessionId: string) {
    const user: User = {
      name: 'John Doe',
      email: 'test@test.fr',
      sessionId,
    };
    this.authStore.login({ user, callback: () => this.router.navigate(['/']) });
  }

  // This method is used to simulate a logout
  logout(): boolean {
    this.authStore.logout({ callback: () => this.router.navigate(['/login']) });
    localStorage.removeItem('sessionId');
    return true;
  }
}

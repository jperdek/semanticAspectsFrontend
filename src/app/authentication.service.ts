import { Injectable } from '@angular/core';
import { UserRole } from './models/user';
import { Role } from './models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  private user: UserRole = new UserRole();

  isAuthorized() {
      return this.user.role != Role.Guest;
  }

  hasRole(role: Role) {
      return this.isAuthorized() && this.user.role == role;
  }

  login(role: Role) {
    this.user = { role: role };
  }

  logout() {
    this.user =  { role: Role.Guest };
  }
}

import { Injectable } from '@angular/core';
import { Role } from 'src/app/models/role';
import { UserRole } from 'src/app/models/user';


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

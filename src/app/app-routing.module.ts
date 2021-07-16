import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { CategoryObserverComponent } from './category-observer/category-observer.component';
import { LoginComponent } from './login/login.component';
import { Role } from './models/role';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'analyser',
    canLoad: [],
    canActivate: [],
    data: {
      roles: [
        Role.Admin,
        Role.User,
        Role.Guest
      ]
    },
    children: [
      {
        path: 'category',
        component: CategoryObserverComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

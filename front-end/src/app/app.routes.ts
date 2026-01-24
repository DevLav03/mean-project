import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./layout/auth-layout/login-component/login-component')
        .then(m => m.LoginComponent)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./layout/auth-layout/register-component/register-component')
        .then(m => m.RegisterComponent)
  },

  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/dashboard-component/dashboard-component')
        .then(m => m.DashboardComponent)
  },

  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/users-component/users-component')
        .then(m => m.UsersComponent)
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/profile-component/profile-component')
        .then(m => m.ProfileComponent)
  },

    {
    path: 'user-form/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/users-component/user-form/user-form')
        .then(m => m.UserForm)
  },


  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/admin-layout/dashboard-component/dashboard-component')
        .then(m => m.DashboardComponent)
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

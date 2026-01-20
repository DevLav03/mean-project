import { Routes } from '@angular/router';

import { LoginComponent } from "./layout/auth-layout/login-component/login-component";
import { RegisterComponent } from "./layout/auth-layout/register-component/register-component";

import { DashboardComponent } from './layout/admin-layout/dashboard-component/dashboard-component';
import { ProfileComponent } from './layout/admin-layout/profile-component/profile-component';
import { UsersComponent } from './layout/admin-layout/users-component/users-component';

export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    //{ path: '**', component: LoginComponent }, 

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 

    { path: 'dashboard', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'users', component: UsersComponent },
];
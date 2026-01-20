import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.scss',
})
export class ProfileComponent {

  userData: any = {};

  navItems = [
    { title: 'Dashboard', value: '/dashbaord' },
    { title: 'User Data', value: '/users' },
    { title: 'Profile', value: '/profile' }
  ];

  constructor(private userService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadProfile();
  }


  loadProfile() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.userData = res.user;

      },
      error: (err) => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
        console.log(err);

      }
    });
  };

  logout() {
   
    sessionStorage.clear();
    this.router.navigate(['/login']);
   
  }
}



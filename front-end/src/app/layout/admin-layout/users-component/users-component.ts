import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './users-component.html',
  styleUrls: ['./users-component.scss'],
   standalone: true
})
export class UsersComponent implements OnInit {

  users = signal<any | null>(null);
  page = 1;
  limit = 5;
  sort: 'asc' | 'desc' = 'asc';

  navItems = [
    { title: 'Dashboard', value: '/dashboard' },
    { title: 'User Data', value: '/users' },
    { title: 'Profile', value: '/profile' }
  ];

  

   constructor(private userService: AuthService, private router: Router) { }

   ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUserData({
      page: this.page,
      limit: this.limit,
      sort: this.sort
    }).subscribe(res => {
      this.users.set(res.data);
    });
  }

  toggleSort() {
    this.sort = this.sort === 'asc' ? 'desc' : 'asc';
    this.page = 1;
    this.loadUsers();
  }

  next() {
    this.page++;
    this.loadUsers();
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.loadUsers();
    }
  }

  addUser() {
    console.log('Navigating to add user form');
    this.router.navigate(['/user-form', 0]);
  }

  updateUser(data: any) {
    this.router.navigate(['/user-form', data._id]);
  }

  deleteUser(data: any) {
    console.log(event);
   
    const userId = data._id;

    console.log('Deleting user with ID:', userId);

    if (userId) {
      this.userService.deleteUser(userId).subscribe({
        next: (res) => {
          console.log('User deleted:', res);
          this.loadUsers();
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        }
      });
    }
  }

}

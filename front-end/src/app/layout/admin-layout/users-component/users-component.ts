import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { navbarComponent } from '../navbar-component/navbar-component';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-component',
  imports: [CommonModule, RouterModule, navbarComponent],
  templateUrl: './users-component.html',
  styleUrls: ['./users-component.scss'],
  standalone: true
})
export class UsersComponent implements OnInit {

  users = signal<any | null>(null);
  page = 1;
  limit = 5;
  sort: 'asc' | 'desc' = 'asc';
  searchValue: any = '';
  roleValue: any = '';

  searchText = signal('');
  selectedRole = signal('');

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
      search: this.searchText(),
      role: this.selectedRole(),
      page: this.page,
      limit: this.limit,
      sort: this.sort
    }).subscribe(res => {
      this.users.set(res.data);
    });
  }


  // handlers
  onSearch(event: Event) {
    this.page = 1;
    this.searchText.set((event.target as HTMLInputElement).value);
    this.loadUsers();
  }

  onRoleChange(event: Event) {
    this.page = 1;
    this.selectedRole.set((event.target as HTMLSelectElement).value);
    this.loadUsers();
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
    this.router.navigate(['/user-form', 0]);
  }

  updateUser(data: any) {
    this.router.navigate(['/user-form', data._id]);
  }

  deleteUser(data: any) {
    console.log(event);

    const userId = data._id;

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

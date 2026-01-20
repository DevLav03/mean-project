import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule  } from '@angular/router';

@Component({
  selector: 'app-users-component',
  imports: [CommonModule, RouterModule ],
  templateUrl: './users-component.html',
  styleUrl: './users-component.scss',
})
export class UsersComponent {

    navItems = [
    { title: 'Dashboard', value: '/dashbaord' },
    { title: 'User Data', value: '/users' },
    { title: 'Profile', value: '/profile' }
  ];

users = [
{ name: 'Admin', email: 'admin@gmail.com', role: 'admin' },
{ name: 'User One', email: 'user1@gmail.com', role: 'user' }
];

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule  } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule, RouterModule ],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.scss',
})
export class DashboardComponent {

  navItems = [
    { title: 'Dashboard', value: '/dashbaord' },
    { title: 'User Data', value: '/users' },
    { title: 'Profile', value: '/profile' }
  ];

}

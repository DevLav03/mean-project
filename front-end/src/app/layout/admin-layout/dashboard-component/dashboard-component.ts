import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule  } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
})
export class DashboardComponent {

  navItems = [
    { title: 'Dashboard', value: '/dashboard' },
    { title: 'User Data', value: '/users' },
    { title: 'Profile', value: '/profile' }
  ];

}

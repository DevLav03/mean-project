import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'navbar-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-component.html',
  styleUrls: ['./navbar-component.scss'],
})
export class navbarComponent implements OnInit {

  // ✅ SIGNALS
  userRole = signal<string>(''); 

  navItems = signal([
    { title: 'Dashboard', value: '/dashboard', roles: ['admin', 'user'] },
    { title: 'User Data', value: '/users', roles: ['admin'] },
    { title: 'Profile', value: '/profile', roles: ['admin', 'user'] }
  ]);

  // ✅ COMPUTED (AUTO FILTER)
  filteredNavItems = computed(() =>
    this.navItems().filter(item =>
      item.roles.includes(this.userRole())
    )
  );

  constructor(private userService: AuthService) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.userRole.set(res.user.role); // 🔥 auto updates navbar
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  }
}

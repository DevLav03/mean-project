import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { navbarComponent } from '../navbar-component/navbar-component';

import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [CommonModule, RouterModule, navbarComponent],
  templateUrl: './profile-component.html',
  styleUrls: ['./profile-component.scss'],
})
export class ProfileComponent implements OnInit {

  user = signal<any | null>(null);

  constructor(private userService: AuthService, private router: Router, private tokenS: TokenService) { }

  ngOnInit() {

    this.userService.getProfile().subscribe({
      next: (res) => {
        this.user.set(res.user);

      },
      error: (err) => {
        this.tokenS.clearToken();
        this.router.navigate(['/login']);
      }
    });
  }

  onLogout() {
   
    this.tokenS.clearToken();
    this.router.navigate(['/login']);
   
  }
}



import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: any;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.loading = true;

      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log('API Response:', res);

          this.loading = false;

          if(res.status === 'success'){
            this.router.navigate(['/dashboard']);
             sessionStorage.setItem('token', res.token);
          }else{
            this.errorMsg = res.message;
          }

        },
        error: (err) => {

          this.loading = false;

          console.log('API Error:', err);

          this.errorMsg = err.error.message || err.message;

        }
      });
    }
  }
}

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-register-component',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMsg: any;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;

      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          //console.log('API Response:', res);

          this.loading = false;

          if(res.status === 'success'){
            this.errorMsg = '';
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


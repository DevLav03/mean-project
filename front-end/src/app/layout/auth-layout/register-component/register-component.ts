import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';


@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrls: ['./register-component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMsg = signal<string | null>(null);
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private tokenService: TokenService) {
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
     this.submitted = true;
     this.errorMsg.set(null);

    if (this.registerForm.valid) {
      //this.loading = true;

      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          //console.log('API Response:', res);

          //this.loading = false;

          if(res.status === 'success'){
            this.tokenService.setToken(res.token);
            this.router.navigate(['/dashboard']);
           
          }else{
            this.errorMsg.set(res.message);
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


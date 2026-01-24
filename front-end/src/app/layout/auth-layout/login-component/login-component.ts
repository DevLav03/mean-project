import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';


@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = signal<string | null>(null);
  //loading = false;
  submitted = false;


  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private tokenService: TokenService  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {

    this.submitted = true;
    this.errorMsg.set(null);

    if (this.loginForm.valid) {

      //this.loading = true;

      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          //this.loading = false;

          if(res.status === 'success'){
            this.tokenService.setToken(res.token);
             this.router.navigate(['/dashboard']);
          }else{
            this.errorMsg.set(res.message);
            return;
          }

        },
        error: (err) => {

          //this.loading = false;

          console.log('API Error:', err);

          this.errorMsg.set(err.error?.message || err.message);

        }
      });
    }
  }
}

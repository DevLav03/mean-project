import { Component, OnInit, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserForm implements OnInit {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errorMsg = signal<string | null>(null);
  submitted = false;
  user_id: any | null = null;
  isEditMode = false;

  navItems = [
    { title: 'Dashboard', value: '/dashboard' },
    { title: 'User Data', value: '/users' },
    { title: 'Profile', value: '/profile' }
  ];

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['user', Validators.required]
  });

  ngOnInit() {
    this.user_id = this.route.snapshot.paramMap.get('id');

    // 👉 EDIT MODE
    if (this.user_id !== '0') {
      this.isEditMode = true;
      this.loadUser(this.user_id);
    }
  }

  loadUser(id: string) {
    this.auth.getOneUserData(id).subscribe({
      next: (res: any) => {
        if (res.status === 'success' && res.userData) {

          // ✅ Patch only existing controls
          this.registerForm.patchValue({
            name: res.userData.name,
            email: res.userData.email,
            role: res.userData.role
          });

          // ✅ Password not required in edit
          this.registerForm.get('password')?.clearValidators();
          this.registerForm.get('password')?.updateValueAndValidity();

        } else {
          this.errorMsg.set(res.message);
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMsg.set(err?.error?.message || err.message);
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.errorMsg.set(null);

    if (this.registerForm.invalid) return;

    const payload = this.registerForm.value;

    // 👉 CREATE
    if (!this.user_id) {
      this.auth.InsertUser(payload).subscribe({
        next: (res: any) => {
          this.errorMsg.set(res.message);
          if (res.status === 'success') {
            this.router.navigate(['/users']);
          }
        },
        error: (err) => {
          this.errorMsg.set(err?.error?.message || err.message);
        }
      });
    }

    // 👉 UPDATE
    else {
      this.auth.UpdateUser(this.user_id, payload).subscribe({
        next: (res: any) => {
          this.errorMsg.set(res.message);
          if (res.status === 'success') {
            this.router.navigate(['/users']);
          }
        },
        error: (err) => {
          this.errorMsg.set(err?.error?.message || err.message);
        }
      });
    }
  }

  navigateToBackPage() {
    this.router.navigate(['/users']);
  }
}

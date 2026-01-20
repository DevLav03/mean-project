import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//import { LoginComponent } from './layout/auth-layout/login-component/login-component';
//import { RegisterComponent } from './layout/auth-layout/register-component/register-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front-end');
}

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserRequestModel} from '../../models/user-request.model';
import {UserService} from '../../services/user.service';
import {UserResponseModel} from '../../models/user-response.model';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-wrapper">
      <form (ngSubmit)="login()" class="login">
        <app-big-logo></app-big-logo>
        <span class="spinner spinner-inverse eb-centered" *ngIf="logging"></span>
        <div *ngIf="!logging" class="login-group">
          <clr-input-container>
            <label class="clr-sr-only">Nazwa użytkownika</label>
            <input type="text" name="username" clrInput placeholder="Nazwa użytkownika" [(ngModel)]="form.login"/>
          </clr-input-container>
          <clr-password-container>
            <label class="clr-sr-only">Hasło</label>
            <input type="password" name="password" clrPassword placeholder="Hasło" [(ngModel)]="form.password"/>
          </clr-password-container>
          <div class="error" [class.active]="error">
            Nieprawidłowy login lub hasło
          </div>
          <button type="submit" class="btn btn-primary">ZALOGUJ</button>
            <a class="signup" (click)="this.router.navigate(['/register'])">Zarejestruj się</a>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['../shared/user-components.scss']
})
export class LoginComponent {

  form: UserRequestModel = {
    login: '',
    password: ''
  };

  logging: boolean;
  error: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  login(): Subscription {
    this.logging = true;
    this.error = false;
    return this.userService.tryToLogin(this.form).subscribe(this.loginSuccess, this.loginFail);
  }

  loginSuccess = (response: HttpResponse<UserResponseModel>) => {
    sessionStorage.setItem('auth', response.body.token);
    sessionStorage.setItem('username', response.body.username);
    this.logging = false;
  };

  loginFail = () => {
    this.logging = false;
    this.error = true;
  };
}

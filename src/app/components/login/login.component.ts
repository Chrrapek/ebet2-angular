import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserModel} from '../../models/user.model';
import {UserService} from '../../services/user.service';

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
          <a href="javascript://" class="signup">Zarejestruj się</a>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private form: UserModel = {
    login: '',
    password: ''
  };

  logging: boolean;
  error: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): Subscription {
    this.logging = true;
    this.error = false;
    return this.userService.tryToLogin(this.form).subscribe(this.loginSuccess, this.loginFail);
  }

  loginSuccess = (response: string) => {
    sessionStorage.setItem('auth', response);
    sessionStorage.setItem('username', this.form.login);
    this.logging = false;
  };

  loginFail = () => {
    this.logging = false;
    this.error = true;
  };
}

import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

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
            <input type="text" name="username" clrInput placeholder="Nazwa użytkownika" [(ngModel)]="form.username"/>
          </clr-input-container>
          <clr-password-container>
            <label class="clr-sr-only">Hasło</label>
            <input type="password" name="password" clrPassword placeholder="Hasło" [(ngModel)]="form.password"/>
          </clr-password-container>
          <clr-checkbox-wrapper>
            <label>Zapamiętaj mnie</label>
            <input type="checkbox" name="rememberMe" clrCheckbox [(ngModel)]="form.rememberMe"/>
          </clr-checkbox-wrapper>
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

  private form: {
    username: string;
    password: string;
    rememberMe: boolean;
  } = {
    username: '',
    password: '',
    rememberMe: false
  };

  private logging: boolean;
  private error: boolean;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login(): Subscription {
    this.logging = true;
    this.error = false;
    return this.userService.tryToLogin(this.form.username, this.form.password).subscribe(this.loginSuccess, this.loginFail);
  }

  private loginSuccess = (response: string) => {
    sessionStorage.setItem('auth', response);
    sessionStorage.setItem('username', this.form.username);
  };

  private loginFail = () => {
    this.logging = false;
    this.error = true;
  };
}

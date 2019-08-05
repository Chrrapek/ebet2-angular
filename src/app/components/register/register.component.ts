import {Component} from '@angular/core';
import {UserRequestModel} from '../../models/user-request.model';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {UserResponseModel} from '../../models/user-response.model';

@Component({
  selector: 'app-register',
  template: `
      <div class="login-wrapper">
          <form (ngSubmit)="register()" class="login">
              <app-big-logo></app-big-logo>
              <span class="spinner spinner-inverse eb-centered" *ngIf="registering"></span>
              <div *ngIf="!registering" class="login-group">
                  <clr-input-container>
                      <label class="clr-sr-only">Nazwa użytkownika</label>
                      <input type="text" name="username" clrInput placeholder="Nazwa użytkownika" [(ngModel)]="form.login"/>
                  </clr-input-container>
                  <clr-password-container>
                      <label class="clr-sr-only">Hasło</label>
                      <input type="password" name="password" clrPassword placeholder="Hasło" [(ngModel)]="form.password"/>
                  </clr-password-container>
                  <div class="error" [class.active]="error">
                      Błąd rejestracji - taki użytkownik już istnieje
                  </div>
                  <button type="submit" class="btn btn-primary">ZAREJESTRUJ</button>
                  <a class="signup" (click)="this.router.navigate(['/'])">Powrót</a>
              </div>
          </form>
      </div>`,
  styleUrls: ['../shared/user-components.scss']
})
export class RegisterComponent {
  form: UserRequestModel = {
    login: '',
    password: ''
  };

  registering: boolean;
  error: boolean;

  constructor(private userService: UserService, public router: Router) {
  }

  register(): Subscription {
    this.registering = true;
    this.error = false;
    return this.userService.tryToRegister(this.form).subscribe(this.registerSuccess, this.registerFail);
  }

  registerSuccess = (responseBody: HttpResponse<UserResponseModel>) => {
    sessionStorage.setItem('auth', responseBody.body.token);
    sessionStorage.setItem('username', responseBody.body.username);
    this.registering = false;
  };

  registerFail = () => {
    this.error = true;
    this.registering = false;
  };
}

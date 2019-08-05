import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterComponent} from './register.component';
import {By} from '@angular/platform-browser';
import {HttpResponse} from '@angular/common/http';
import {UserResponseModel} from '../../models/user-response.model';
import {BigLogoComponent} from '../shared/big-logo/big-logo.component';
import {FormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ClrFormsModule, ClrInputModule} from '@clr/angular';
import {RouterModule} from '@angular/router';
import {routes} from '../../app.module';
import {LoginComponent} from '../login/login.component';

describe('RegisterComponent', () => {
  let app: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, BigLogoComponent, LoginComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ClrFormsModule,
        ClrInputModule,
        RouterModule.forRoot(routes)
      ]
    })
      .compileComponents();

    // given
    fixture = TestBed.createComponent(RegisterComponent);
    app = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(app).toBeTruthy();
  });

  it('should call UserService method', () => {
    // given
    spyOn(app, 'register');
    fixture.detectChanges();
    // when
    const debugElement = fixture.debugElement;
    const form = debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    fixture.detectChanges();

    // then
    expect(app.register).toHaveBeenCalled();
  });

  it('should change state on login call', () => {
    // given
    fixture.detectChanges();

    // when
    app.register();
    fixture.detectChanges();

    // then
    expect(app.error).toBe(false);
    expect(app.registering).toBe(true);
  });

  it('should set auth in sessionStorage', () => {
    // given
    fixture.detectChanges();
    // when
    app.registerSuccess(new HttpResponse<UserResponseModel>({
      body: {
        token: 'testAuth',
        username: 'testUser',
        userUUID: 'it is not even an uuid'
      }
    }));
    fixture.detectChanges();

    // then
    expect(app.registering).toBe(false);
    expect(sessionStorage.getItem('username')).toBe('testUser');
    expect(sessionStorage.getItem('auth')).toBe('testAuth');
  });

  it('should show error message', () => {
    // given
    fixture.detectChanges();
    // when
    app.registerFail();
    fixture.detectChanges();

    // then
    expect(app.error).toBe(true);
    expect(app.registering).toBe(false);
  });

});

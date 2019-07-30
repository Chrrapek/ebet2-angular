import {HttpClientModule} from '@angular/common/http';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ClrFormsModule, ClrInputModule} from '@clr/angular';
import {routes} from '../../app.module';
import {BigLogoComponent} from '../shared/big-logo/big-logo.component';

import {LoginComponent} from './login.component';
import {By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let app: LoginComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        BigLogoComponent],
      imports: [
        FormsModule,
        ClrFormsModule,
        ClrInputModule,
        HttpClientModule,
        RouterModule.forRoot(routes)
      ],
    })
      .compileComponents();

    // given
    fixture = TestBed.createComponent(LoginComponent);
    app = fixture.componentInstance;
  }));

  it('should render the component', () => {
    expect(app).toBeTruthy();
  });

  it('should call UserService method', () => {
    // given
    spyOn(app, 'login');
    fixture.detectChanges();
    // when
    const debugElement = fixture.debugElement;
    const form = debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    fixture.detectChanges();

    // then
    expect(app.login).toHaveBeenCalled();
  });

  it('should set auth in sessionStorage', () => {
    // given
    fixture.detectChanges();
    // when
    app.loginSuccess('testAuth');
    fixture.detectChanges();

    // then
    expect(app.logging).toBe(false);
    expect(sessionStorage.getItem('auth')).toBe('testAuth');
  });

  it('should show error message', () => {
    // given
    fixture.detectChanges();
    // when
    app.loginFail();
    fixture.detectChanges();

    // then
    expect(app.error).toBe(true);
    expect(app.logging).toBe(false);
  });
});

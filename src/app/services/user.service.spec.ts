import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {UserService} from './user.service';

describe('UserService', () => {
  let injector: TestBed;
  let userService: UserService;
  const mockObject = {
    body: {
      userUUID: 'testUUID',
      username: 'testUsername',
      token: 'testAuth'
    }
  };
  const mockService = {
    tryToLogin: jasmine.createSpy('tryToLogin').and.returnValue(of(mockObject)),
    tryToRegister: jasmine.createSpy('tryToRegister').and.returnValue(of(mockObject))
  };
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: UserService,
        useValue: mockService
      }]
    });

    injector = getTestBed();
    userService = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should make request for login', () => {
    let fakeResponse = null;
    userService.tryToLogin({login: 'testLogin', password: 'testPassword'}).subscribe(res => {
      fakeResponse = res;
    });
    expect(fakeResponse.body.token).toBe('testAuth');
    expect(fakeResponse.body.username).toBe('testUsername');
    expect(fakeResponse.body.userUUID).toBe('testUUID');
  });

  it('should make request for registration', () => {
    let fakeResponse = null;
    userService.tryToRegister({login: 'testLogin', password: 'testPassword'}).subscribe(res => {
      fakeResponse = res;
    });
    expect(fakeResponse.body.token).toBe('testAuth');
    expect(fakeResponse.body.username).toBe('testUsername');
    expect(fakeResponse.body.userUUID).toBe('testUUID');
  });

});

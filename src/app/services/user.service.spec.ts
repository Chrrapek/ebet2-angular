import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {of} from 'rxjs';
import {environment} from '../../environments/environment.prod';
import {UserService} from './user.service';

describe('UserService', () => {
  let injector: TestBed;
  let userService: UserService;
  const mockService = {tryToLogin: jasmine.createSpy('tryToLogin').and.returnValue(of('fakeConfirmation'))};
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;

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

  it('should make request', () => {
    let fakeResponse = null;
    userService.tryToLogin({login: 'testLogin', password: 'testPassword'}).subscribe(res => {
      fakeResponse = res;
    });
    expect(fakeResponse).toBe('fakeConfirmation');
  })

});

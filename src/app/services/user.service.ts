import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserRequestModel} from '../models/user-request.model';
import {UserResponseModel} from '../models/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlDomain: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  tryToLogin(loginData: UserRequestModel): Observable<HttpResponse<UserResponseModel>> {
    const body = {
      username: loginData.login,
      password: loginData.password
    };

    return this.http.post<UserResponseModel>(`${this.urlDomain}/api/user/login`, body, {observe: 'response'});
  }

  tryToRegister(registerData: UserRequestModel): Observable<HttpResponse<UserResponseModel>> {
    const body = {
      username: registerData.login,
      password: registerData.password
    };

    return this.http.post<UserResponseModel>(`${this.urlDomain}/api/user/register`, body, {observe: 'response'});
  }
}

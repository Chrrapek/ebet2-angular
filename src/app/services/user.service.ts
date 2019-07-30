import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlDomain: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  tryToLogin(loginData: UserModel): Observable<string> {
    const body = {
      username: loginData.login,
      password: loginData.password
    };

    const options: { responseType: 'text' } = {
      responseType: 'text'
    };

    return this.http.post(`${this.urlDomain}/api/user/login`, body, options);
  }
}

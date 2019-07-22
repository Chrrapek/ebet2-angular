import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlDomain: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  tryToLogin(username: string, password: string): Observable<string> {
    const body = {
      username: username,
      password: password
    };

    const options: { responseType: 'text' } = {
      responseType: 'text'
    };

    return this.http.post(`${this.urlDomain}/api/user/login`, body, options);
  }
}

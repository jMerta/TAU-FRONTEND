import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  registerUser(user: User) {
    const body = {
      username: user.username,
      password: user.password
    };

    return this.http.post(this.rootUrl + '/api/account/register', body);
  }

}

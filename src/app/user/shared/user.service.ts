import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from './user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient, private router: Router) {}

  public loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  registerUser(user: User): Observable<any> {
    const body = {
      username: user.username,
      password: user.password
    };
    const reqHeader = new HttpHeaders({ 'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/api/account/register', body, { headers: reqHeader} );
  }

  authenticateUser(username, password): Observable<any> {
    const body = {
      username: username,
      password: password
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json', 'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/api/account/login', body, {headers: reqHeader});
  }

  getUserBoards() {
    return this.http.get(this.rootUrl + 'api/boards/all');
  }

  logout() {
    localStorage.removeItem('userToken');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }


}

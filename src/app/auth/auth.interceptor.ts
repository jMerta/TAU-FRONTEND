import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpUserEvent} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
    if (localStorage.getItem('userToken') !== null) {
      const clonedreq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
      });
      return next.handle(clonedreq).do(
        succ => {},
        err => {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
      );
    } else {
      this.router.navigateByUrl('/login');
    }
  }


}

import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  OnSubmit(username, password) {
    this.userService.authenticateUser(username, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this.userService.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
      this.toastr.success('Logged in');
    },
    err => this.toastr.error('Invalid data passed, try again'));
  }
}

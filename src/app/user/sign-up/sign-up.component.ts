import { Component, OnInit } from '@angular/core';
import {User} from '../shared/user.model';
import {NgForm} from '@angular/forms';
import {UserService} from '../shared/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
      this.user = {
        username: '',
        password: ''
      };
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe(() => {
          this.resetForm(form);
          this.toastr.success('User successfully registered');
        },
        err => this.toastr.error('Error occurred, try again.')
       );
  }
}

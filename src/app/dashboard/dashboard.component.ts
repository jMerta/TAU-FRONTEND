import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/shared/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userBoards: Array<any>;

  constructor(private userService: UserService) {
    this.userService.getUserBoards().subscribe((data: any) => {
      this.userBoards = data;
    });
  }

  ngOnInit() {
  }

}

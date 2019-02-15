import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';

import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserService, AuthenticationService } from '@/_services';


@Component({
  selector: 'app-profile-widget',
  templateUrl: './profile-widget.component.html',
  styleUrls: ['./profile-widget.component.css']
})
export class ProfileWidgetComponent implements OnInit {
  updatUserData: User;
  users: User[] = [];
  currentUser: User;
  curUser: User;

  currentUserSubscription: Subscription;
  constructor(private authenticationService: AuthenticationService,private userService: UserService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  deleteUser(id: number) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
          this.loadAllUsers()
      });
  }

  updateUser(id: number) {
    this.updatUserData={
              "id": this.currentUser._id,
              "friends": [{"id":id}]
            }
      this.userService.update(this.updatUserData).pipe(first()).subscribe(() => {
      });
  }

  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
      });
  }

}

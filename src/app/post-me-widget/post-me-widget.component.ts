import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { Blog } from '../_models/blog';

import { AlertService,UserService, AuthenticationService } from '@/_services';

@Component({
  selector: 'app-post-me-widget',
  templateUrl: './post-me-widget.component.html',
  styleUrls: ['./post-me-widget.component.css']
})
export class PostMeWidgetComponent implements OnInit {
  postForm: FormGroup;
  loading = false;
  submitted = false;


  currentUser: User;
  postblogdata: Blog;
  currentUserSubscription: Subscription;
  users: User[] = [];
  blogs: Blog[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private userService: UserService

    )
    {
   this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
       this.currentUser = user;
   });

  }

  ngOnInit() {

    this.postForm = this.formBuilder.group({
        username: ['', Validators.required]
    });
  }

      // convenience getter for easy access to form fields
        get f() { return this.postForm.controls};
        onSubmit() {
            this.submitted = true;

            // stop here if form is invalid
            if (this.postForm.invalid) {
                return;
            }

            // this.loading = true;
            this.postblogdata={
                    	"author": this.currentUser,
                    	"content": this.f.username.value
                    }
            this.userService.postBlog(this.postblogdata)
                .pipe(first())
                .subscribe(
                  blogs => {
                      this.blogs = blogs;
                  },
                    error => {
                        this.alertService.error(error);
                        this.loading = false;
                    });
        }

}

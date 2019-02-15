import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { Blog } from '../_models/blog';
import { AlertService,UserService, AuthenticationService } from '@/_services';


@Component({
  selector: 'app-allblog-wigdet',
  templateUrl: './allblog-wigdet.component.html',
  styleUrls: ['./allblog-wigdet.component.css']
})

export class AllblogWigdetComponent implements OnInit, OnDestroy {
    postForm: FormGroup;
    loading = false;
    submitted = false;
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    blogs: Blog[] = [];
    postblogdata: Blog;

    constructor(
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
      this.postForm = this.formBuilder.group({
          username: ['', Validators.required],
          title: ['', Validators.required]
      });
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

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
                  "title":  this.f.title.value,
                  "content": this.f.username.value
                }
                this.postForm = this.formBuilder.group({
                    username: [''],
                    title: ['']
                });

        this.userService.postBlog(this.postblogdata)
            .pipe(first())
            .subscribe(
              blogs => {
                  this.loadAllUsers();
              },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
        this.userService.getAllBlogs(this.currentUser).pipe(first()).subscribe(blogs => {
            this.blogs = blogs;
        });
    }
}

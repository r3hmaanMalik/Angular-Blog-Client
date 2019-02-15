import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';


import { AlertService, AuthenticationService } from '@/_services';

@Component({templateUrl: 'post.component.html'})
export class PostComponent implements OnInit {
    jar: string;
    postForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;


    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        this.createForm();
            }

    createForm() {
   this.postForm = this.formBuilder.group({
    message: ['Tyooooooo']

  });


}

get f() { return this.postForm.controls};
    // convenience getter for easy access to form fields

    onSubmit() {
     this.jar = this.f.message.value;
      console.log(this.jar);
    }


}

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import "froala-editor/js/froala_editor.pkgd.min.js";
import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { PostComponent } from './post';
import { TopbarComponent } from './topbar/topbar.component';
import { ProfileWidgetComponent } from './profile-widget/profile-widget.component';
import { PostMeWidgetComponent } from './post-me-widget/post-me-widget.component';
import { AllblogWigdetComponent } from './allblog-wigdet/allblog-wigdet.component';
import { FriendsComponent } from './friends/friends.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        FroalaViewModule,
        FroalaEditorModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        AngularEditorModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        PostComponent,
        TopbarComponent,
        ProfileWidgetComponent,
        PostMeWidgetComponent,
        AllblogWigdetComponent,
        FriendsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },


    ],
    bootstrap: [AppComponent]
})

export class AppModule { }

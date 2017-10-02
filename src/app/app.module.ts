import { NotFoundComponent } from './errors/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';

// Do not import from 'firebase' as you'd lose the tree shaking benefits
import * as firebase from 'firebase/app';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { StatsComponent } from './stats/stats.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginEmailComponent } from './auth/login-email/login-email.component';
import { RegisterEmailComponent } from './auth/register-email/register-email.component';
import { MyMilesComponent } from './my-miles/my-miles.component';
import { MilesComponent } from './miles/miles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    FeedbackComponent,
    StatsComponent,
    LoginComponent,
    LoginEmailComponent,
    RegisterEmailComponent,
    MyMilesComponent,
    MilesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, environment.firebase.projectName),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

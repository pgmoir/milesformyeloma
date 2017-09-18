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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
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

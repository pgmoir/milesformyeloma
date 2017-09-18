import { AuthService } from './auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {}

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
      this.afAuth.auth.signOut();
  }
}

import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  topMenu = true;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {}

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
      this.afAuth.auth.signOut();
  }

  activateBurgerBun() {
    this.topMenu = !this.topMenu;
    console.log(this.topMenu, '>> topMenu');

  }
}

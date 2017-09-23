import { AuthService } from '../../auth/auth.service';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  topMenu = true;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {}

  logout() {
      this.afAuth.auth.signOut();
  }

  activateBurgerBun() {
    this.topMenu = !this.topMenu;
    console.log(this.topMenu, '>> topMenu');

  }
}

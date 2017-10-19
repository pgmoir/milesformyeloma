import { Subscription } from 'rxjs/Subscription';
import { OrderBySelection } from 'angularfire2/database/interfaces';
import { AuthService } from './../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component, Injectable, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
@Component({
  selector: 'app-miles',
  templateUrl: './miles.component.html',
  styleUrls: ['./miles.component.css']
})
export class MilesComponent implements OnDestroy {
  private userSubscription: Subscription;
  private milesSubscription: Subscription;

  miles: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.userSubscription = this.authService.user.subscribe(
      (user) => {
        // console.log('miles', user);
        this.miles = db.list('miles', { query: { orderByChild: 'email', equalTo: this.authService.email, limitToLast: 3 } });
        this.milesSubscription = this.miles.subscribe(
          (any) => {
            // console.log('miles', any);
          }
        );
      }
    );
  }

  ngOnDestroy() {
    this.milesSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    // console.log('miles double destroy');
  }

  deleteMiles(mile: any) {
    // console.log(mile);
    // console.log(mile.$key);
    // console.log(mile.distanceInMiles);
    // console.log(mile.activity);
    this.miles.remove(mile).then(
      (item) => {
        this.updateMiles('m4m', 'all', mile.distanceInMiles);
        this.updateMiles(this.authService.uid, 'all', mile.distanceInMiles);
        this.updateMiles(this.authService.uid, mile.activity, mile.distanceInMiles);
      }
    );

  }

  private updateMiles(id: string, activity: string, distance: number) {
    const url = `/stats/${id}/${activity}/total`;
    this.db.object(url).$ref.ref.transaction(total => Math.round((total - distance) * 100) / 100);
  }

  isYou(email) {
    return (email === this.authService.email) ? true : false;
  }

  isMe(email) {
    return (email === this.authService.email) ? false : true;
  }

}

import { AuthService } from './../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  miles: FirebaseListObservable<any>;
  currentTotals: FirebaseObjectObservable<any>;

  measurement: string;
  activity: string;
  distance: number;
  reason: string;

  verifyActivity = false;
  verified = false;
  totalMiles = 0;
  state = 0;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.miles = db.list('miles', { query: { limitToLast: 5 } });
    this.currentTotals = db.object('/stats/m4m/all/total', { preserveSnapshot: true });
    this.currentTotals.subscribe(snapshot => {
      console.log(snapshot.val());
      this.totalMiles = snapshot.val();
    });
  }

  ngOnInit() {
    this.measurement = 'miles';
    this.activity = 'cycle';
    this.resetForm();
    this.state = 1;
  }

  resetForm() {
    this.distance = null;
    this.reason = null;
    this.verifyActivity = false;
    this.verified = false;
  }

  needToVerify(distanceInMiles: number) {
    if (!this.verified &&
      ((this.activity === 'cycle' && distanceInMiles > 110) ||
      (this.activity === 'run' && distanceInMiles > 30) ||
      (this.activity === 'walk' && distanceInMiles > 30) ||
      (this.activity === 'swim' && distanceInMiles > 15) ||
      (this.activity === 'static-cycle' && distanceInMiles > 30))) {
      return true;
    } else {
      return false;
    }
  }

  doubleCheckDistance(distanceInMiles: number) {
    if ((this.activity === 'cycle' && (distanceInMiles > 250 || distanceInMiles < 1)) ||
      (this.activity === 'run' && (distanceInMiles > 60 || distanceInMiles < 1)) ||
      (this.activity === 'walk' && (distanceInMiles > 50 || distanceInMiles < 1)) ||
      (this.activity === 'swim' && (distanceInMiles > 30 || distanceInMiles < 1)) ||
      (this.activity === 'static-cycle' && (distanceInMiles > 30 || distanceInMiles < 1))) {
      return true;
    } else {
      return false;
    }
  }

  submitMiles() {
    const distanceInMiles = (this.measurement === 'kms') ? this.distance / 1.609344 : this.distance;
    if (this.needToVerify(distanceInMiles)) {
      this.verifyActivity = true;
      this.state = 3;
      return;
    }

    if (this.doubleCheckDistance(distanceInMiles)) {
      this.state = 5;
      return;
    }

    const mile = {
      measurement: this.measurement,
      activity: this.activity,
      distance: this.distance,
      reason: this.reason,
      distanceInMiles: distanceInMiles,
      displayName: this.authService.displayName,
      email: this.authService.email,
      timestamp: Date.now()
    };

    this.miles.push(mile);
    this.updateMiles('m4m', 'all', distanceInMiles);
    this.updateMiles(this.authService.uid, 'all', distanceInMiles);
    this.updateMiles(this.authService.uid, this.activity, distanceInMiles);
    this.state = 2;
    this.resetForm();
  }

  private updateMiles(id: string, activity: string, distance: number) {
    const url = `/stats/${id}/${activity}/total`;
    this.db.object(url).$ref.ref.transaction(total => Math.round((total + distance) * 100) / 100);
  }

  isYou(email) {
    return (email === this.authService.email) ? true : false;
  }

  isMe(email) {
    return (email === this.authService.email) ? false : true;
  }

  verify() {
    if (this.reason === null) {
      this.state = 4;
      return;
    }
    this.verified = true;
    this.submitMiles();
  }

  cancel() {
    this.resetForm();
    this.state = 1;
  }
}

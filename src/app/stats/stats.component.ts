import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../auth/auth.service';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnDestroy {
  userSubscription: Subscription;
  userStatsSubscription: Subscription;
  userStats: FirebaseObjectObservable<any>;

  totalAll = 0;
  totalCycle = 0;
  totalRun = 0;
  totalWalk = 0;
  totalSwim = 0;
  totalRow = 0;
  totalGolf = 0;
  totalStaticCycle = 0;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.userSubscription = this.authService.user.subscribe(
        (user) => {
          // console.log('stats', user);
          const url = `/stats/${this.authService.uid}`;
          this.userStats = db.object(url, { preserveSnapshot: true });
          this.userStatsSubscription = this.userStats.subscribe(
            (stats) => {
              // console.log('stats', stats);
              this.totalAll = stats.val().all ? stats.val().all.total : 0;
              this.totalCycle = stats.val().cycle ? stats.val().cycle.total : 0;
              this.totalRun = stats.val().run ? stats.val().run.total : 0;
              this.totalWalk = stats.val().walk ? stats.val().walk.total : 0;
              this.totalSwim = stats.val().swim ? stats.val().swim.total : 0;
              this.totalRow = stats.val().row ? stats.val().row.total : 0;
              this.totalGolf = stats.val().golf ? stats.val().golf.total : 0;
              this.totalStaticCycle = stats.val()['static-cycle'] ? stats.val()['static-cycle'].total : 0;
            }
          );
        }
      );
  }

  ngOnDestroy() {
    this.userStatsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    // console.log('stats double destroy');
  }
}

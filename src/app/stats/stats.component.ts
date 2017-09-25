import { AuthService } from './../auth/auth.service';
import { FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  userStats: FirebaseObjectObservable<any>;

  totalAll = 0;
  totalCycle = 0;
  totalRun = 0;
  totalWalk = 0;
  totalSwim = 0;
  totalStaticCycle = 0;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.authService.user.subscribe(
        (user) => {
          console.log('stats', this.authService.uid);
          const url = `/stats/${this.authService.uid}`;
          console.log('url>>', url);
          this.userStats = db.object(url, { preserveSnapshot: true });
          this.userStats.subscribe(
            (stats) => {
              console.log(stats.val().all.total);
              this.totalAll = stats.val().all ? stats.val().all.total : 0;
              this.totalCycle = stats.val().cycle ? stats.val().cycle.total : 0;
              this.totalRun = stats.val().run ? stats.val().run.total : 0;
              this.totalWalk = stats.val().walk ? stats.val().walk.total : 0;
              this.totalSwim = stats.val().swim ? stats.val().swim.total : 0;
              this.totalStaticCycle = stats.val()['static-cycle'] ? stats.val()['static-cycle'].total : 0;
            }
          );
        }
      );
  }

  ngOnInit() {
  }

}

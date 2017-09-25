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

  totalAll: number;
  totalCycle: number;
  totalRun: number;
  totalWalk: number;
  totalSwim: number;
  totalStaticCycle: number;

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
              this.totalAll = stats.val().all.total;
              this.totalCycle = stats.val().cycle.total;
              this.totalRun = stats.val().run.total;
              this.totalWalk = stats.val().walk.total;
              this.totalSwim = stats.val().swim.total;
              this.totalStaticCycle = stats.val()['static-cycle'].total;
            }
          );
        }
      );
  }

  ngOnInit() {
  }

}

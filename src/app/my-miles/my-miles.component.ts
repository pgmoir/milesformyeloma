import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-my-miles',
  templateUrl: './my-miles.component.html',
  styleUrls: ['./my-miles.component.css']
})
export class MyMilesComponent implements OnInit, OnDestroy {
  private routeSubscription: Subscription;

  name: string;
  activity: string;
  distance: number;
  reason: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to router event
    this.routeSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      // console.log('mymiles', params);
      this.name = params['name'] ? params['name'] : 'I';
      this.activity = params['activity'];
      this.distance = params['distance'];
      this.reason = params['reason'] ? params['reason'] : '';

      this.name = this.name.replace(/\+/g, ' ');
      this.reason = this.reason.replace(/\+/g, ' ');
    });
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    // console.log('mymiles destroy');
  }
}

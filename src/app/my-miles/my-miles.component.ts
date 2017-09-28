import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-my-miles',
  templateUrl: './my-miles.component.html',
  styleUrls: ['./my-miles.component.css']
})
export class MyMilesComponent implements OnInit {
  name: string;
  activity: string;
  distance: number;
  reason: string;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.name = params['name'] ? params['name'] : 'I';
      this.activity = params['activity'];
      this.distance = params['distance'];
      this.reason = params['reason'] ? params['reason'] : '';

      this.name = this.name.replace(/\+/g, ' ');
      this.reason = this.reason.replace(/\+/g, ' ');
    });
  }

}

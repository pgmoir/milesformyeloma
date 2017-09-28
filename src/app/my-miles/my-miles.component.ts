import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-my-miles',
  templateUrl: './my-miles.component.html',
  styleUrls: ['./my-miles.component.css']
})
export class MyMilesComponent implements OnInit {
  activity: string;
  distance: number;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to router event
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.activity = params['activity'];
      this.distance = params['distance'];
    });
  }

}

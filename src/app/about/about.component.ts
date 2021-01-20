import { Component, OnInit, Inject } from '@angular/core';

import {Leader} from '../shared/leader.interface';

import {LeaderService} from '../services/leader.service';

import {flyInOut} from '../animations/app.animation';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style':'display:block'
  },
  animations: [
    flyInOut(),
  ]
})
export class AboutComponent implements OnInit {

  leaders:Leader[] = [];
  leaderErrMsg:string = '';

  constructor(private leaderServ:LeaderService, @Inject('BaseURL') public BaseURL: string) { }

  ngOnInit(): void {
    this.leaderServ.getLeaders().subscribe((leaders) => this.leaders = leaders, errmess => this.leaderErrMsg = <any> errmess);
  }

}

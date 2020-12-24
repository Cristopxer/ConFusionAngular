import { Component, OnInit } from '@angular/core';

import {Leader} from '../shared/leader.interface';

import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  leaders:Leader[] = [];

  constructor(private leaderServ:LeaderService) { }

  ngOnInit(): void {
    this.leaders = this.leaderServ.getLeaders();
  }

}

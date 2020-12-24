import { Injectable } from '@angular/core';
import {Leaders} from '../shared/leaders';
import {Leader} from '../shared/leader.interface';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  
  constructor() { }
  getLeaders(): Leader[] {
    return Leaders;
  }
  getFeaturedLeader(): Leader{
    return Leaders.filter((leader) => leader.featured)[0];
  }
}

import { Injectable } from '@angular/core';
import {Leaders} from '../shared/leaders';
import {Leader} from '../shared/leader.interface';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  
  constructor() { }
  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(Leaders);
  }
  getFeaturedLeader(): Promise<Leader>{
    return Promise.resolve(Leaders.filter((leader) => leader.featured)[0]);
  }
}

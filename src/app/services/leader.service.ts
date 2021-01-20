import { Injectable } from '@angular/core';
import {Leader} from '../shared/leader.interface';

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {
  
  constructor(private http:HttpClient, private HTTPMsgServ: ProcessHTTPMsgService) { }
  getLeaders(): Observable<Leader[]> {
    // return Promise.resolve(Leaders);
    return this.http.get<Leader[]>(baseURL + 'leadership').pipe(catchError(this.HTTPMsgServ.handleError));
  }
  getFeaturedLeader(): Observable<Leader>{
    // return Promise.resolve(Leaders.filter((leader) => leader.featured)[0]);
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map((leader) => (leader as Record<string,any>)[0])).pipe(catchError(this.HTTPMsgServ.handleError));
  }
}

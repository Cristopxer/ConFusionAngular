import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {ProcessHTTPMsgService} from '../services/process-httpmsg.service';
@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private http: HttpClient, private HTTPMsgServ:ProcessHTTPMsgService) {}
  postFeedback(fb: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<Feedback>(baseURL + 'feedback',fb,httpOptions).pipe(catchError(this.HTTPMsgServ.handleError));
  }
}

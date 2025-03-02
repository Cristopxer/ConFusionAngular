import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  constructor(
    private http: HttpClient,
    private processHTTPMsgServ: ProcessHTTPMsgService
  ) {}
  getDishes(): Observable<Dish[]> {
    return this.http
      .get<Dish[]>(baseURL + 'dishes')
      .pipe(catchError(this.processHTTPMsgServ.handleError));
  }
  getDish(id: string): Observable<Dish> {
    return this.http
      .get<Dish>(baseURL + 'dishes/' + id)
      .pipe(catchError(this.processHTTPMsgServ.handleError));
  }
  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get<Dish>(baseURL + 'dishes?featured=true')
      .pipe(map((dishes) => (dishes as Record<string, any>)[0]))
      .pipe(catchError(this.processHTTPMsgServ.handleError));
  }
  getDishIds(): Observable<string[] | any> {
    return this.getDishes()
      .pipe(map((dishes) => dishes.map((dish) => dish.id)))
      .pipe(catchError((error) => error));
  }

  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
      }),
    };       
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id,dish,httpOptions).pipe(catchError(this.processHTTPMsgServ.handleError));
  }
}

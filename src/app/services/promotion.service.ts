import { Injectable } from '@angular/core';

import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';

import {Observable} from 'rxjs';
import {baseURL} from '../shared/baseurl';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(private http: HttpClient) {}

  getPromotions(): Observable<Promotion[]> {
    // return Promise.resolve(PROMOTIONS);
    return this.http.get<Promotion[]>(baseURL + 'promotions');
  }
  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?id=' + id).pipe(map((promotion) => (promotion as Record<string, any>)[0]));
  }
  getFeaturedPromotions(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true').pipe(map((promotion) => (promotion as Record<string, any>)[0]));

  }
}

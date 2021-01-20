import { Component, OnInit, Inject } from '@angular/core';

import {Leader} from '../shared/leader.interface';
import { Dish } from '../shared/dish.interface';
import { Promotion } from '../shared/promotion';
import {LeaderService} from '../services/leader.service';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';

import {flyInOut} from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style':'display:block'
  },
  animations: [
    flyInOut(),
  ]
})
export class HomeComponent implements OnInit {
  dish: Dish = {};
  promotion: Promotion = {};
  leader:Leader = {};
  dishErrMsg:string ="";
  promoErrMsg:string = "";
  leaderErrMsg:string = "";

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderServ:LeaderService,
    @Inject('BaseURL') public BaseURL:string
  ) {}

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish, errmess => this.dishErrMsg = <any>errmess);
    this.promotionService.getFeaturedPromotions().subscribe((promo) => this.promotion = promo, errmess => this.promoErrMsg = <any>errmess);
    this.leaderServ.getFeaturedLeader().subscribe((leader) => this.leader = leader, errmess => this.leaderErrMsg=<any>errmess);
  }
}

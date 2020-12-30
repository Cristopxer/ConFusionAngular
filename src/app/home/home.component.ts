import { Component, OnInit } from '@angular/core';

import {Leader} from '../shared/leader.interface';
import { Dish } from '../shared/dish.interface';
import { Promotion } from '../shared/promotion';

import {LeaderService} from '../services/leader.service';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  dish: Dish = {};
  promotion: Promotion = {};
  leader:Leader = {};

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderServ:LeaderService
  ) {}

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe((dish) => this.dish = dish);
    this.promotionService.getFeaturedPromotions().then((promo) => this.promotion = promo);
    this.leaderServ.getFeaturedLeader().then((leader) => this.leader = leader);
  }
}

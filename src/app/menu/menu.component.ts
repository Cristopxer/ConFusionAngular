import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish.interface';

import { DishService } from '../services/dish.service';

import {flyInOut} from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style':'display:block'
  },
  animations: [
    flyInOut(),
  ]
})
export class MenuComponent implements OnInit {
  dishes: Dish[] = [];
  errMsg: string = '';

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') public BaseURL: string
  ) {}

  ngOnInit(): void {
    this.dishService.getDishes().subscribe(
      (dishes) => (this.dishes = dishes),
      (errmess) => (this.errMsg = <any>errmess)
    );
  }
}

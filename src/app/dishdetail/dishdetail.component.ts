import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router/';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../shared/comment.interface';
import { Dish } from '../shared/dish.interface';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
})
export class DishdetailComponent implements OnInit {
  dish: Dish = {};
  dishIds: string[] = [];
  prev: string = '';
  next: string = '';
  newComment: Comment = {};

  formErrors = {
    name: '',
    comment: '',
  };

  validationMessage = {
    name: {
      required: 'Name is required.',
      minlength: 'Name must be at leat 2 characters long.',
    },
    comment: {
      required: 'Comment is required.',
    },
  };

  commentForm: FormGroup = new FormGroup({});

  createForm() {
    this.commentForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      stars: new FormControl(''),
      comment: new FormControl('', Validators.required),
    });
    this.commentForm.valueChanges.subscribe((data) => this.onValueChange(data));
  }
  constructor(
    private dishService: DishService,
    private location: Location,
    private route: ActivatedRoute
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.dishService
      .getDishIds()
      .subscribe((dishIds) => (this.dishIds = dishIds));
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishService.getDish(params['id']))
      )
      .subscribe((dish) => {
        this.dish = dish;
        this.setPrevNext(dish.id as string);
      });
  }

  onSubmit(){
    var d = new Date();
    this.newComment = {
      author: this.commentForm.value.name,
      rating: this.commentForm.value.stars,
      date: d.toISOString(),
      comment: this.commentForm.value.comment,
    };
    // this.dish.comments.push(this.newComment);
    this.commentForm.reset();
  }

  onValueChange(data: any) {
    if (!this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // this.formErrors[field] = "";
        (this.formErrors as Record<string, any>)[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = (this.validationMessage as Record<string, any>)[
            field
          ];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              (this.formErrors as Record<string, any>)[field] +=
                messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[
      (this.dishIds.length + index - 1) % this.dishIds.length
    ];
    this.next = this.dishIds[
      (this.dishIds.length + index + 1) % this.dishIds.length
    ];
  }

  goBack() {
    this.location.back();
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { Params, ActivatedRoute } from '@angular/router/';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../shared/comment.interface';
import { Dish } from '../shared/dish.interface';
import { DishService } from '../services/dish.service';

import { switchMap } from 'rxjs/operators';

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
  errMsg: string = '';
  dishCopy:Dish = {};

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
    private route: ActivatedRoute,
    @Inject('BaseURL') public BaseURL: string
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
      .subscribe(
        (dish) => {
          this.dish = dish;
          this.dishCopy = dish;
          this.setPrevNext(dish.id as string);
        },
        (errmess) => (this.errMsg = <any>errmess)
      );
  }

  onSubmit() {
    var d = new Date();
    this.newComment = {
      author: this.commentForm.value.name,
      rating: this.commentForm.value.stars,
      date: d.toISOString(),
      comment: this.commentForm.value.comment,
    };
     this.dishCopy.comments?.push(this.newComment);     
     this.dishService.putDish(this.dishCopy).subscribe((dish) => {       
       this.dish = dish;
       this.dishCopy = dish;
     }, errmess => {this.dishCopy = {}; this.dish = {}; this.errMsg = <any>errmess})
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

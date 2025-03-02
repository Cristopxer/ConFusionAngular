import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

import { flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    style: 'display:block',
  },
  animations: [flyInOut()],
})
export class ContactComponent implements OnInit {
  formErrors = {
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
  };

  validationMessage = {
    firstname: {
      required: 'First name is required.',
      minlength: 'First name must be at leat 2 characters long.',
      maxlength: 'First name cannot be more than 25 characters long.',
    },
    lastname: {
      required: 'Last name is required.',
      minlength: 'Last name must be at leat 2 characters long.',
      maxlength: 'Last name cannot be more than 25 characters long.',
    },
    telnum: {
      required: 'Telephone number is required.',
      pattern: 'Telephone number must contain only number.',
    },
    email: {
      required: 'Email is required.',
      pattern: 'Email not a valid format.',
    },
  };

  feedbackForm: FormGroup = new FormGroup({});
  feedback: Feedback = {};
  feedb: Feedback = {};
  contactType = ContactType;
  errMsg:string = "";
  sendingForm:boolean = false;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.createForm();
  }

  ngOnInit(): void {}

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
    });

    this.onValueChange();

    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChange(data)
    );
  }
  onSubmit() {
    this.sendingForm = true;
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackService
      .postFeedback(this.feedback)
      .subscribe((feed) => {this.feedb = feed; this.sendingForm=false;},
      (errmess) => {
        this.feedback = {};
        this.feedback = {};
        this.errMsg = <any>errmess;        
      });
      
  }

  onValueChange(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
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
}

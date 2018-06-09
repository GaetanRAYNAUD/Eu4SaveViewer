import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../Services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  email: FormControl;
  emailError: any;
  formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initFormControls();
    this.initForm();

    this.emailError = {};
  }

  initFormControls() {
    this.email = new FormControl(
      '',
      [Validators.required, Validators.email]
    );
  }

  initForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: this.email,
    });
  }

  handFirebaseAuthErrors(error) {
    switch (error.code) {
      case 'auth/invalid-email':
        this.emailError.invalid = true;
        this.emailError.email = true;
        break;
    }
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    this.emailError = {};

    this.emailError.invalid = this.email.invalid;
    if (this.emailError.invalid) {
      this.emailError.required = this.email.errors.required || false;
      this.emailError.email = this.email.errors.email || false;
    }

    if (this.forgotPasswordForm.valid && !this.emailError.invalid) {
      this.authService.resetPassword(this.email.value).then(
        () => {
          this.router.navigate(['']);
        },
        (error) => {
          this.handFirebaseAuthErrors(error);
        }
      )
    }
  }
}

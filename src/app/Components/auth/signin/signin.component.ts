import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../Services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  email: FormControl;
  password: FormControl;
  emailError: any;
  passwordError: any;
  formSubmitAttempt: boolean;

  @Output() userEvent = new EventEmitter<{}>();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initFormControls();
    this.initForm();

    this.emailError = {};
    this.passwordError = {};
  }

  initFormControls() {
    this.email = new FormControl(
      '',
      [Validators.required, Validators.email]
    );
    this.password = new FormControl(
      '',
      [Validators.required, Validators.pattern('[0-9a-zA-Z]+'), Validators.minLength(6), Validators.maxLength(24)]
    );
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

  handFirebaseAuthErrors(error) {
    switch (error.code) {
      case 'auth/invalid-email':
      case 'auth/user-disabled':
      case 'auth/user-not-found':
        this.emailError.invalid = true;
        this.emailError.email = true;
        this.password.setValue('');
        break;

      case 'auth/wrong-password':
        this.passwordError.invalid = true;
        this.passwordError.wrong = true;
        break;
    }
  }

  forgotPassword() {
    this.router.navigate(['/auth/forgotPassword']);
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    this.emailError = {};
    this.passwordError = {};

    this.emailError.invalid = this.email.invalid;
    if (this.emailError.invalid) {
      this.emailError.required = this.email.errors.required || false;
      this.emailError.email = this.email.errors.email || false;
    }

    this.passwordError.invalid = this.password.invalid;
    if (this.passwordError.invalid) {
      this.passwordError.required = this.password.errors.required || false;
    }

    if (this.signInForm.valid && !this.passwordError.invalid && !this.emailError.invalid) {
      this.authService.signInUser(this.email.value, this.password.value).then(
        (credential) => {
          this.userEvent.emit(credential);
          this.router.navigate(['']);
        },
        (error) => {
          this.handFirebaseAuthErrors(error);
        }
      )
    }
  }
}

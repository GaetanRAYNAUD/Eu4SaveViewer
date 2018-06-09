import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../Services/auth.service";
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

export interface User {
  email: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  usersListed: boolean;
  usersCollection: AngularFirestoreCollection<User>;
  users: Array<string>;
  newUser: User;
  signUpForm: FormGroup;
  username: FormControl;
  usernameError: any;
  email: FormControl;
  emailError: any;
  password: FormControl;
  passwordError: any;
  formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private firestore: AngularFirestore) { }

  ngOnInit() {
    this.usersListed = false;

    this.initFormControls();
    this.initForm();
    this.initUsers();
  }

  initFormControls() {
    this.username = new FormControl(
      '',
      [Validators.required, Validators.pattern('[0-9a-zA-Z]+'), Validators.minLength(4), Validators.maxLength(24)]
    );
    this.email = new FormControl(
      '',
      [Validators.required, Validators.email]
    );
    this.password = new FormControl(
      '',
      [Validators.required, Validators.pattern('[0-9a-zA-Z]+'), Validators.minLength(6), Validators.maxLength(24)]
    );

    this.usernameError = {};
    this.emailError = {};
    this.passwordError = {};
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password
    });
  }

  initUsers() {
    this.users = [];
    this.usersCollection = this.firestore.collection<User>('users');
    this.usersCollection.snapshotChanges().subscribe(actions => {
      actions.map(action => {
        this.users.push(action.payload.doc.id.toLowerCase());
      });

      this.usersListed = true;
    });
  }

  handFirebaseAuthErrors(error) {
    switch (error.code) {
      case 'auth/invalid-email':
        this.emailError.invalid = true;
        this.emailError.email = true;
        break;

      case 'auth/email-already-in-use':
        this.emailError.invalid = true;
        this.emailError.alreadyUsed = true;
        break;

      case 'auth/weak-password':
        this.passwordError.invalid = true;
        this.passwordError.length = true;
        break;
    }
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    this.usernameError = {};
    this.emailError = {};
    this.passwordError = {};

    this.usernameError.invalid = this.username.invalid;
    if (this.usernameError.invalid) {
      this.usernameError.required = this.username.errors.required || false;
      this.usernameError.pattern = this.username.errors.pattern || false;
      this.usernameError.length = this.username.errors.minlength || (this.username.errors.maxlength || false);
    }

    if (this.users.includes(this.username.value.toString().toLowerCase())) {
      this.usernameError.invalid = true;
      this.usernameError.alreadyUsed = true;
    }

    this.emailError.invalid = this.email.invalid;
    if (this.emailError.invalid) {
      this.emailError.required = this.email.errors.required || false;
      this.emailError.email = this.email.errors.email || false;
    }

    this.passwordError.invalid = this.password.invalid;
    if (this.passwordError.invalid) {
      this.passwordError.required = this.password.errors.required || false;
      this.passwordError.pattern = this.password.errors.pattern || false;
      this.passwordError.length = this.password.errors.minlength || (this.password.errors.maxlength || false);
    }

    if (this.signUpForm.valid && !this.usernameError.invalid) {
      const email = this.signUpForm.get('email').value;
      const password = this.signUpForm.get('password').value;
      this.authService.createNewUser(email, password).then(
        (uid) => {
          this.newUser = {
            email: this.email.value
          };
          return this.authService.updateCurrentUser({
            displayName: this.username.value
          });
        },
        (error) => {
          this.handFirebaseAuthErrors(error);
        }
      ).then(
        () => {
          this.usersCollection = this.firestore.collection<User>('users');
          this.usersCollection.doc(this.username.value).set(this.newUser);
          this.router.navigate(['']);
        }
      );
    }
  }
}

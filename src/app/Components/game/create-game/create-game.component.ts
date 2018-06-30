import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../Models/User.model";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { DatabaseService } from "../../../Services/database.service";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit {

  gameForm: FormGroup;
  day: FormControl;
  dayError: any;
  start_hour: FormControl;
  start_hourError: any;
  end_hour: FormControl;
  end_hourError: any;
  title: FormControl;
  titleError: any;
  image_url: FormControl;
  image_urlError: any;
  admins: FormControl;
  adminsError: any;
  usersCollection: AngularFirestoreCollection<User>;
  users: Array<User>;
  formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.initUsers();
    this.initFormControls();
    this.initForm();
  }

  initFormControls() {
    this.day = new FormControl(
      '',
      [Validators.required, Validators.min(0), Validators.max(6)]
    );
    this.start_hour = new FormControl(
      '',
      [Validators.required, Validators.pattern('([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]')]
    );
    this.end_hour = new FormControl(
      '',
      [Validators.required, Validators.pattern('([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]')]
    );
    this.title = new FormControl(
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(256)]
    );
    this.image_url = new FormControl(
      '',
      [Validators.minLength(4), Validators.maxLength(256)]
    );
    this.admins = new FormControl();

    this.dayError = {};
    this.start_hourError = {};
    this.end_hourError = {};
    this.titleError = {};
    this.image_urlError = {};
    this.adminsError = {};
  }

  initForm() {
    this.gameForm = this.formBuilder.group({
      tittle: this.title,
      image_url: this.image_url,
      day: this.day,
      start_hour: this.start_hour,
      end_hour: this.end_hour,
      admins: this.admins
    });
  }

  initUsers() {
    this.databaseService.getUsers().then(
      (users) => {
        console.log(users);
        this.users = users;
      }
    );
  }

  onSubmit() {
    console.log(this.admins.value);
    this.formSubmitAttempt = true;
    this.titleError = {};
    this.dayError = {};
    this.start_hourError = {};
    this.end_hourError = {};

    this.titleError.invalid = this.title.invalid;
    if (this.titleError.invalid) {
      this.titleError.required = this.title.errors.required || false;
      this.titleError.tooShort = this.title.errors.minlength || false;
      this.titleError.tooLong = this.title.errors.maxlength || false;
    }

    this.dayError.invalid = this.day.invalid;
    if (this.dayError.invalid) {
      this.dayError.required = this.day.errors.required || false;
    }

    this.start_hourError.invalid = this.start_hour.invalid;
    if (this.start_hourError.invalid) {
      this.start_hourError.required = this.start_hour.errors.required || false;
    }

    this.end_hourError.invalid = this.end_hour.invalid;
    if (this.end_hourError.invalid) {
      this.end_hourError.required = this.end_hour.errors.required || false;
    }
  }

}

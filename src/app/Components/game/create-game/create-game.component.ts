import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../../../Models/User.model";
import { DatabaseService } from "../../../Services/database.service";
import { Game } from "../../../Models/Game";
import { WeekDay } from "@angular/common";
import { AuthService } from "../../../Services/auth.service";
import { UploadImageComponent } from "../../upload/upload-image/upload-image.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent implements OnInit, AfterViewInit {

  @ViewChild(UploadImageComponent)
  uploadImageComponent: UploadImageComponent;

  game: Game;
  gameForm: FormGroup;
  day: FormControl;
  weekDay: WeekDay;
  dayError: any;
  start_hour: FormControl;
  start_hourError: any;
  end_hour: FormControl;
  end_hourError: any;
  title: FormControl;
  titleError: any;
  admins: FormControl;
  adminsError: any;
  users: Array<User>;
  games: Array<Game>;
  formSubmitAttempt: boolean;
  imageInputHeaderText: string;

  constructor(private formBuilder: FormBuilder, private databaseService: DatabaseService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initUsers();
    this.initGames();
    this.initFormControls();
    this.initForm();

    this.formSubmitAttempt = false;
    this.imageInputHeaderText = 'Associer une image à la partie';
  }

  ngAfterViewInit() {

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
    this.admins = new FormControl();

    this.dayError = {};
    this.start_hourError = {};
    this.end_hourError = {};
    this.titleError = {};
    this.adminsError = {};
  }

  initForm() {
    this.gameForm = this.formBuilder.group({
      tittle: this.title,
      day: this.day,
      start_hour: this.start_hour,
      end_hour: this.end_hour,
      admins: this.admins
    });
  }

  initUsers() {
    this.databaseService.getUsers().then(
      (users) => {
        this.users = users.filter(user => user.id != this.authService.getCurrentUser().id);
      }
    );
  }

  initGames() {
    this.databaseService.getGames().then(
      (games) => {
        this.games = games;
      }
    );
  }

  getWeekDay() {
    switch (this.day.value) {
      case 0:
        this.weekDay = WeekDay.Sunday;
        break;

      case 1:
        this.weekDay = WeekDay.Monday;
        break;

      case 2:
        this.weekDay = WeekDay.Tuesday;
        break;

      case 3:
        this.weekDay = WeekDay.Wednesday;
        break;

      case 4:
        this.weekDay = WeekDay.Thursday;
        break;

      case 5:
        this.weekDay = WeekDay.Friday;
        break;

      case 6:
        this.weekDay = WeekDay.Saturday;
        break;

      default:
        this.weekDay = WeekDay.Sunday;
    }
  }

  onSubmit() {
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

    if (this.games.map(game => game.title.toLowerCase()).includes(this.title.value.toString().toLowerCase())) {
      this.titleError.invalid = true;
      this.titleError.alreadyUsed = true;
      this.gameForm.controls['title'].markAsTouched();
    }

    this.dayError.invalid = this.day.invalid;
    if (this.dayError.invalid) {
      this.dayError.required = this.day.errors.required || false;
    } else {
      this.getWeekDay();
    }

    this.start_hourError.invalid = this.start_hour.invalid;
    if (this.start_hourError.invalid) {
      this.start_hourError.required = this.start_hour.errors.required || false;
    }

    this.end_hourError.invalid = this.end_hour.invalid;
    if (this.end_hourError.invalid) {
      this.end_hourError.required = this.end_hour.errors.required || false;
    }

    if (!this.start_hourError.invalid && !this.dayError.invalid && !this.titleError.invalid) {
      this.game = <Game> {
        day: this.weekDay,
        start_hour: this.start_hour.value,
        end_hour: this.end_hour.value,
        creator: this.authService.getCurrentUser().id,
        admins: this.admins.value,
        title: this.title.value,
        image_url: this.uploadImageComponent.image_url
      };

      this.uploadImageComponent.startUploadImage().then(
        (url) => {
          this.game.image_url = url;
          this.databaseService.createNewGame(this.game).then(
            () => {
              this.router.navigate(['']);
            }
          );
        }
      );
    }
  }

}

import { Component, ViewChild } from '@angular/core';
import * as firebase from "firebase";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { SigninComponent } from "./Components/auth/signin/signin.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  router: Router;

  constructor(private routerParam: Router) {
    firebase.initializeApp(environment.firebase);
    this.router = this.routerParam;
  }
}

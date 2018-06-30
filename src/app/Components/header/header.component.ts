import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { AuthService } from "../../Services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  displayName: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        this.isAuth = !!user;
        if (this.isAuth) {
          this.displayName = this.authService.getCurrentUser().displayName;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}

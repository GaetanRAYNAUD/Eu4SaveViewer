// Angular dependencies
import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
// External dependencies
import { Observable } from "rxjs/internal/Observable";
import * as firebase from "firebase";

// Internal dependencies

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if(user) {
              resolve(true);
            } else {
              this.router.navigate(['/auth', 'signin']);
              resolve(false);
            }
          }
        )
      }
    )
  }
}

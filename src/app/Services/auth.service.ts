import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { User } from '../Models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (credential) => {
          resolve(credential.user.uid);
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        (credential) => {
          resolve(credential);
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  updateCurrentUser(data) {
    return new Promise((resolve, reject) => {
      firebase.auth().currentUser.updateProfile(data).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  resetPassword(email: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      )
    });
  }

  getCurrentUser() {
    return <User> {
      id: firebase.auth().currentUser.uid,
      email: firebase.auth().currentUser.email,
      displayName: firebase.auth().currentUser.displayName
    }
  }
}

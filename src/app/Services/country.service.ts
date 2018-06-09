import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { Subject } from "rxjs/internal/Subject";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  countries: string[] = [];
  countriesSubject = new Subject<string[]>();

  constructor() { }

  emitCountries() {
    this.countriesSubject.next(this.countries);
  }

  getCountries() {
    firebase.database().ref('/countries').on('value', (data) => {
      this.countries = data.val() ? data.val() : [];
      this.emitCountries();
    });
  }

  getCountry(tag: string) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('/countries/' + tag).once('value').then((data) => {
        resolve(data.val());
      }, (error) => {
        reject(error);
      })
    });
  }
}

import { Injectable } from '@angular/core';
import { User } from "../Models/User.model";
import { AngularFirestore } from "angularfire2/firestore";
import { Game } from '../Models/Game';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: AngularFirestore) {
  }

  getUsers() {
    let users: Array<User> = [];
    let usersCollection = this.firestore.collection<User>('users');
    return new Promise<Array<User>>((resolve, reject) => {
      usersCollection.snapshotChanges().subscribe(actions => {
        actions.map(action => {
          let user = <User>action.payload.doc.data();
          user.displayName = action.payload.doc.id;
          users.push(user);
        });

        resolve(users);
      });
    });
  }

  createNewGame(game) {
    console.log(game);
    let gameCollection = this.firestore.collection<Game>('games');
    gameCollection.doc(game.title).set(<Game>game);
  }
}

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
    return new Promise<Array<User>>((resolve) => {
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
    let gameCollection = this.firestore.collection<Game>('games');
    return gameCollection.doc(game.title).set(<Game>game);
  }

  getGames() {
    let games: Array<Game> = [];
    let gamesCollection = this.firestore.collection<Game>('games');
    return new Promise<Array<Game>>((resolve) => {
      gamesCollection.snapshotChanges().subscribe(actions => {
        actions.map(action => {
          let game = <Game>action.payload.doc.data();
          games.push(game);
        });

        resolve(games);
      });
    });
  }
}

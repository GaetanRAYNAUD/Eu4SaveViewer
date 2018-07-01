import { Injectable } from '@angular/core';
import { User } from "../Models/User.model";
import { AngularFirestore } from "angularfire2/firestore";
import { Game, GameStatus } from '../Models/Game';

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

  createNewGame(game: Game): Promise<null> {
    let gameCollection = this.firestore.collection<Game>('games');
    game.status = GameStatus.PENDING;
    return new Promise(resolve => {
      gameCollection.add(game).then(
        (ref) => {
          game.id = ref.id;
          gameCollection.doc(ref.id).update(game).then(
            () => {
              resolve();
            }
          );
        });
    });
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

  getGame(id: string): Promise<Game> {
    let gamesCollection = this.firestore.collection<Game>('games');
    return new Promise<Game>(resolve => {
      gamesCollection.snapshotChanges().subscribe(actions => {
        actions.map(action => {
          if (action.payload.doc.id === id) {
            resolve(<Game>action.payload.doc.data());
          }
        });
      });
    });
  }
}

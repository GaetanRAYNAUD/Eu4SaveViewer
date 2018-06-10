import { Component, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Game } from "../../Models/Game"
import { Utils } from "../../Models/Utils.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gamesCollection: AngularFirestoreCollection;
  games: Game[];
  sessions: object[];
  loading: boolean;
  dateOptions: object;

  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
    this.loading = true;
    this.dateOptions = Utils.dateOptions;
    this.initGames();
  }

  initGames() {
    this.games = [];
    this.sessions = [];

    this.gamesCollection = this.firestore.collection<Game>('games');
    this.gamesCollection.snapshotChanges().subscribe(actions => {
      actions.map(action => {
        if (action.payload.doc.data().sessions !== undefined) {
          this.games.push(HomeComponent.fillGameFromData(action));
        }
      });
      console.log(this.games);
      this.loading = false;
    });
  }

  static fillGameFromData(action) {
    let game = <Game> action.payload.doc.data();
    let nbSessions = game.sessions.length;
    let lastSession = game.sessions[nbSessions - 1];
    game.date = new Date(lastSession.end_date);
    game.dev_total = lastSession.dev_total;
    game.losses_total = lastSession.losses_total;
    game.great_powers = lastSession.great_powers;

    return game;
  }

  Click() {
    console.log('click');
  }
}

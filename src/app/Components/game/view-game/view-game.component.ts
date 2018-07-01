import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from '../../../Models/Game';
import { DatabaseService } from "../../../Services/database.service";

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.scss']
})
export class ViewGameComponent implements OnInit {

  id: string;
  game: Game;


  constructor(private router: Router, private route: ActivatedRoute,  private databaseService: DatabaseService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.game = <Game> {

    };
    this.databaseService.getGame(this.id).then(
      (game) => {
        this.game = game;
        console.log(this.game);
      }
    );
  }


}

import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})

export class BoardGameComponent implements OnInit {

  game : GameService;
  size : number [] = Array.from(Array(8), (x, index) => index + 1);

  constructor(gameService: GameService) { 
    this.game = gameService;
  }

  endTurn() : void {
    this.game.checkVictory();
  }

  ngOnInit() : void {
    this.game.initGame();
  }

  // hasPawn(row: Number, col: Number){
  //   for(let pawn of pawns){
  //     if(pawn.x == col && pawn.y = row){
  //       return true;
  //     }
  //     return false;
  //   }
  // }

  // getColor(row: Number, col: Number){
  //   for(let pawn of pawns){
  //     if(pawn.x == col && pawn.y = row){
  //       return pawn.isWhite ? {'background': 'white'} : {'background': 'black'};
  //     }
  //   }
  // }

  gameState = 'en cours ...'

}

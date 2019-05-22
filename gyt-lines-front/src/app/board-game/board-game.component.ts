import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Pawn } from '../pawn';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})

export class BoardGameComponent implements OnInit {

  gridSize : number = 5;

  game: GameService;
  size: number [] = Array.from(Array(this.gridSize), (x, index) => index);
  possibleMoves : Pawn[] = [];
  oldPlace: Pawn;
  whiteTurn : boolean = false;

  constructor(gameService: GameService) { 
    this.game = gameService;
  }

  ngOnInit(): void {
    this.game.initGame(this.gridSize);
  }

  hasPawn(row: number, col: number) {
    let result : boolean = false
    this.game.pawns.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        result = true;
      }
    });
    return result;
  }

  getColor(row: number, col: number): {background: string} {
    let result : {background: string};
    this.game.pawns.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        result = pawn.isWhite ? {background: 'white'} : {background: 'black'};
      }
    });
    return result;
  }

  onClickPawn(row: number, col: number) {
    this.game.pawns.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        if (this.whiteTurn === pawn.isWhite){
          this.oldPlace = pawn
          this.possibleMoves = pawn.possibleMoves()
        }
      }
    });
  }

  isPossibleMoves(row: number, col: number){
    let result : boolean = false;
    this.possibleMoves.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        result = true;
      }
    });
    return result;
  }

  move(row: number, col: number){
    this.possibleMoves.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        if (this.whiteTurn === pawn.isWhite){
          this.possibleMoves = [];
          this.oldPlace.move(pawn);
          this.whiteTurn = !this.whiteTurn;
          console.log(this.game.checkVictory());          
        }
      }
    });
  }

  gameState = 'en cours ...'

}

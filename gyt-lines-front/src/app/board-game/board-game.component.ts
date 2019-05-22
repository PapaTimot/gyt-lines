import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Pawn } from '../pawn';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})

export class BoardGameComponent implements OnInit {

  game: GameService;
  size: number [] = Array.from(Array(8), (x, index) => index);
  possibleMoves : Pawn[] = [];
  oldPlace: Pawn

  constructor(gameService: GameService) { 
    this.game = gameService;
  }

  endTurn(): void {
    this.game.checkVictory();
  }

  ngOnInit(): void {
    this.game.initGame();
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
        this.oldPlace = pawn
        this.possibleMoves = pawn.possibleMoves()
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
        this.possibleMoves = [];
        this.oldPlace.move(pawn);
      }
    });
  }

  gameState = 'en cours ...'

}

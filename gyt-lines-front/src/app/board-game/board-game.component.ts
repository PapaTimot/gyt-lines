import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Pawn } from '../pawn';
import { sleep } from 'sleep-ts'

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})

export class BoardGameComponent implements OnInit {

  iaPlayer : boolean = true;
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
        if (pawn.isWhite){
          result = (pawn === this.oldPlace)? {background: 'red'} : {background: 'white'}
        }
        else {
          result = (pawn === this.oldPlace)? {background: 'blue'} : {background: 'black'}
        }
      }
    });
    return result;
  }

  onClickPawn(row: number, col: number) {
    this.game.pawns.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        if (this.whiteTurn === pawn.isWhite && (!this.iaPlayer || !this.whiteTurn)){
          if (this.oldPlace && this.oldPlace === pawn){
            this.possibleMoves = [];
            this.oldPlace = null;
          } 
          else {
            this.possibleMoves = pawn.possibleMoves();
            this.oldPlace = pawn;
          } 
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
          this.oldPlace.move(pawn);
          this.possibleMoves = [];
          this.oldPlace = null;
          this.whiteTurn = !this.whiteTurn;
          console.log("Victory : " + this.game.checkVictory());  
          if (this.iaPlayer){
            this.iaPlay();
          }        
        }
      }
    });
  }

  async iaPlay(){
    let whitePawns : Pawn[] = [];
    this.game.pawns.forEach( (p) =>{
      if (p.isWhite) whitePawns.push(p);
    })

    await sleep(500);

    let pawnToPlay = whitePawns[this.getRandomInt(whitePawns.length)];
    this.oldPlace = pawnToPlay;
    this.possibleMoves = pawnToPlay.possibleMoves();
    let moveToPlay = this.possibleMoves[this.getRandomInt(this.possibleMoves.length)];
    
    await sleep(1500);

    this.possibleMoves = [];
    this.oldPlace = null;
    pawnToPlay.move(moveToPlay);
    this.whiteTurn = !this.whiteTurn;
    console.log("Victory : " + this.game.checkVictory());  
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  gameState = 'en cours ...'

}

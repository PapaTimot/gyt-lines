import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Pawn } from '../pawn';
import { Node } from '../node';
import { sleep } from 'sleep-ts'

@Component({
	selector: 'app-board-game',
	templateUrl: './board-game.component.html',
	styleUrls: ['./board-game.component.css']
})

export class BoardGameComponent implements OnInit {

  gridSize : number;
  game: GameService;

  size: number [];
  possibleMoves : Pawn[];
  oldPlace: Pawn;
  whiteTurn : boolean ;

  constructor(gameService: GameService) { 
    this.game = gameService;
    this.gridSize = this.game.gridSize;
    this.size = Array.from(Array(this.gridSize), (x, index) => index);
    this.possibleMoves = [];
    this.whiteTurn = false;
  }

  ngOnInit(): void {
    this.game.initGame();
    this.callIA();
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

  getColor(row: number, col: number): {background: string, border: string} {
    let result: {background: string, border: string} = {background: 'purple', border: 'none'};
    this.game.pawns.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        if (pawn.isWhite){
          result.background = (pawn === this.oldPlace)? 'red' : 'white';
          if(this.whiteTurn)
            result.border = '2px solid black';
        }
        else {
          result.background = (pawn === this.oldPlace)? 'blue' : 'black';
          if(!this.whiteTurn)
            result.border = '2px solid white';
        }
      }
    });
    
    return result;
  }

  async callIA() {
    if ( (this.whiteTurn && this.game.whitePlayer === "random") 
    || (!this.whiteTurn && this.game.blackPlayer === "random")){
      await this.randomPlay();
    }        
    else if ( (this.whiteTurn && this.game.whitePlayer === "minMax") 
    || (!this.whiteTurn && this.game.blackPlayer === "minMax")){
      await this.minMaxPlay(1);
    }
    else if ( (this.whiteTurn && this.game.whitePlayer === "minMaxImproved") 
    || (!this.whiteTurn && this.game.blackPlayer === "minMaxImproved")){
      await this.minMaxPlay(2);
    }
  }

  onClickPawn(row: number, col: number) {
    if(this.game.victory){
      return;
    }
    this.game.pawns.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        if (this.whiteTurn === pawn.isWhite){
          if ( (this.whiteTurn && this.game.whitePlayer === "none") 
            || (!this.whiteTurn && this.game.blackPlayer === "none")){
              if (this.oldPlace && this.oldPlace === pawn){
                this.possibleMoves = [];
                this.oldPlace = null;
              } 
              else {
                this.possibleMoves = pawn.possibleMoves(pawn.pawns);
                this.oldPlace = pawn;
              } 
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
    this.game.nbTurn++;
    this.possibleMoves.forEach( (pawn) => {      
      if(pawn.x === col && pawn.y === row) {
        if (this.whiteTurn === pawn.isWhite){
          this.oldPlace.move(pawn);
          this.possibleMoves = [];
          this.oldPlace = null;
          this.whiteTurn = !this.whiteTurn;
          this.checkEnd();
          this.callIA();
        }
      }
    });
  }

  async randomPlay(){
    this.game.nbTurn++;
    if(this.game.victory){
        return;
    }
    let pawns : Pawn[] = [];
    this.game.pawns.forEach( (p) =>{
      if (p.isWhite === this.whiteTurn) pawns.push(p);
    })

    let pawnToPlay = pawns[this.getRandomInt(pawns.length)];
    this.oldPlace = pawnToPlay;
    this.possibleMoves = pawnToPlay.possibleMoves(pawnToPlay.pawns);
    let moveToPlay = this.possibleMoves[this.getRandomInt(this.possibleMoves.length)];

    await sleep(this.game.animationDelay);

    this.possibleMoves = [];
    this.oldPlace = null;
    pawnToPlay.move(moveToPlay);
    this.whiteTurn = !this.whiteTurn;
    this.checkEnd();
    await this.callIA();
  }

  async minMaxPlay(difficulty){
    this.game.nbTurn++;
    if(this.game.victory){
      return;
    }
    await sleep(200);
    let minmaxTree = new Node(this.game, this.game.pawns,this.whiteTurn,this.whiteTurn,0,null,difficulty)
    const indexOfNext = minmaxTree.calcValue(true);

	  this.oldPlace = minmaxTree.nextStates[indexOfNext].lastPawnMoved
	  this.possibleMoves = this.oldPlace.possibleMoves(this.oldPlace.pawns);
	  const moveToPlay = minmaxTree.nextStates[indexOfNext].state.filter(p => !this.game.pawns.includes(p))[0]

    await sleep(this.game.animationDelay);

    this.possibleMoves = [];
    
    this.oldPlace.move(moveToPlay);

    this.oldPlace = null;
    this.whiteTurn = !this.whiteTurn;
    this.checkEnd();
    await this.callIA();
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  checkEnd() : number {
    this.game.victory = this.game.checkVictory();
    return this.game.victory;
  }

  getWinner(): string {
    let result: string;
    switch (this.game.checkVictory()) {
      case 1:
        result = 'Les blancs ont gagné (en ';
        break;
      case 2:
        result = 'Les noirs ont gagné (en ';
        break;
      case 3:
        result = 'Egalité (en '
      default:
        break;
    }
    return result + this.game.nbTurn + " tours)";
  }

  endGame() : void {
    this.game.victory = 0;
    this.game.nbTurn = 0;
    console.log("ok");
  }
}

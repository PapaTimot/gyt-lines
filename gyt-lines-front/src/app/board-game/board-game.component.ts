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

  iaPlayer : boolean;
  gridSize : number;
  game: GameService;

  size: number [];
  possibleMoves : Pawn[];
  oldPlace: Pawn;
  whiteTurn : boolean ;

  constructor(gameService: GameService) { 
    this.game = gameService;
    this.iaPlayer = this.game.iaPlayer;
    this.gridSize = this.game.gridSize;
    this.size = Array.from(Array(this.gridSize), (x, index) => index);
    this.possibleMoves = [];
    this.whiteTurn = false;
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
            this.minMaxPlay();
          }        
        }
      }
    });
  }

async randomPlay(){
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
    //console.log("Victory : " + this.game.checkVictory());  
}

async minMaxPlay(){
  await sleep(100);
	let minmaxTree = new Node(this.game, this.game.pawns,true,true,0,null)
	const indexOfNext = minmaxTree.calcValue(true);

	this.oldPlace = minmaxTree.nextStates[indexOfNext].lastPawnMoved
	this.possibleMoves = this.oldPlace.possibleMoves();
	const moveToPlay = minmaxTree.nextStates[indexOfNext].state.filter(p => !this.game.pawns.includes(p))[0]

	await sleep(1000);

	this.possibleMoves = [];
	this.oldPlace.move(moveToPlay);
	this.oldPlace = null;
	this.whiteTurn = !this.whiteTurn;
	console.log("Victory : " + this.game.checkVictory());  
}

getRandomInt(max: number) {
	return Math.floor(Math.random() * Math.floor(max));
}

gameState = 'en cours ...'

}

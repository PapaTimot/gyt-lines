import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})

export class BoardGameComponent implements OnInit {

  size = Array.from(Array(8), (x, index) => index + 1);

  constructor(private gameService: GameService) { }

  ngOnInit() {

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

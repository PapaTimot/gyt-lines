import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  game     : GameService;
  userName : string;

  constructor(gameService: GameService) { 
    this.game = gameService;
    this.userName = this.game.userName;
  }

  changeIaPlayer() : void{
    this.game.iaPlayer = !this.game.iaPlayer;
  }

  biggerGridSize() : void{
    if (this.game.gridSize < 10){
      this.game.gridSize++;
    }
  }

  smallerGridSize() : void{
    if (this.game.gridSize > 3){
      this.game.gridSize--;
    }
  }

  changeUserName(){
    this.game.userName = this.userName;
  }

  ngOnInit() {
  }

}

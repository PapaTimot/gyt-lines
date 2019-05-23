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
  gridSize : number;
  // possible values are 'none', 'random' and 'minMax'
  iaPlayer : string;

  constructor(gameService: GameService) { 
    this.game = gameService;
    this.userName = this.game.userName;
    this.gridSize = this.game.gridSize;
    this.iaPlayer = this.game.iaPlayer;
  }

  changeIaPlayer(iaPlayer : string) : void{
    this.iaPlayer = iaPlayer;
  }

  getIaPlayer() : string{
    switch (this.iaPlayer) {
      case "none":
        return "vrai joueur"
      case "random":
        return "IA facile"
      case "minMax":
        return "IA moyenne"
      default:
        return ""
    }
  }

  biggerGridSize() : void{
    if (this.gridSize < 8){
      this.gridSize++;
    }
  }

  smallerGridSize() : void{
    if (this.gridSize > 3){
      this.gridSize--;
    }
  }

  changeUserName(){
    this.game.userName = this.userName;
  }

  makeChanges(){
    this.game.gridSize = this.gridSize;
    this.game.iaPlayer = this.iaPlayer;
  }

  ngOnInit() {
  }

}

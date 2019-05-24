import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

	// possible values are 'none', 'random', 'minMax' and 'minMaxImproved'
	blackPlayer : string;
  whitePlayer : string;
  animationDelay : number

  game     : GameService;
  userName : string;
  gridSize : number;

  constructor(gameService: GameService) { 
    this.game = gameService;
    this.userName = this.game.userName;
    this.gridSize = this.game.gridSize;
    this.blackPlayer = this.game.blackPlayer;
    this.whitePlayer = this.game.whitePlayer;
    this.animationDelay = this.game.animationDelay;
  }

  changeIaPlayer(isWhite : boolean, player : string) : void{
    if (isWhite) this.whitePlayer = player;
    else         this.blackPlayer = player;
  }

  longerAnimationDelay() : void{
    if (this.animationDelay < 5000) 
      this.animationDelay +=200;
  }
  shorterAnimationDelay() : void{
    if (this.animationDelay > 200) 
      this.animationDelay -=200;
  }

  getIaPlayer(isWhite : boolean) : string{
    switch (isWhite ? this.whitePlayer : this.blackPlayer) {
      case "none":
        return "vrai joueur"
      case "random":
        return "IA facile"
      case "minMax":
        return "IA moyenne"
      case "minMaxImproved":
        return "IA difficile"
      default:
        return ""
    }
  }

  biggerGridSize() : void{
    if (this.gridSize < 8)
      this.gridSize++;
  }

  smallerGridSize() : void{
    if (this.gridSize > 3)
      this.gridSize--;
  }

  changeUserName(){
    this.game.userName = this.userName;
  }

  makeChanges(){
    this.game.gridSize = this.gridSize;
    this.game.whitePlayer = this.whitePlayer;
    this.game.blackPlayer = this.blackPlayer;
    this.game.animationDelay = this.animationDelay;
  }

  ngOnInit() {
  }

}

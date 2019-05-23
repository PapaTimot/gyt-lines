import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  game : GameService;

  constructor(gameService: GameService) { 
    this.game = gameService;
  }

  ngOnInit() {
  }

}

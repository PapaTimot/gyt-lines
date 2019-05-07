import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board-game',
  templateUrl: './board-game.component.html',
  styleUrls: ['./board-game.component.css']
})
export class BoardGameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  size = Array.from(Array(8), (x, index) => index + 1);

  gameState = 'en cours ...'

}

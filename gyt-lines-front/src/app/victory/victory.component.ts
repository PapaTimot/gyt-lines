import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-victory',
  templateUrl: './victory.component.html',
  styleUrls: ['./victory.component.css']
})
export class VictoryComponent implements OnInit {

  winNumber: number;

  constructor(winNumber: number) {
    this.winNumber = winNumber;
  }

  ngOnInit() {
  }

  getWinResult(): string {
    let result: string;
    switch (this.winNumber) {
      case 1:
        result =  'Les blancs gagne !';
        break;
      case 2:
        result = 'Les noirs gagne !';
        break;
      case 3:
        result = 'Egalité !'
      default:
        result = 'Error !'
        break;
    }
    return result;
  }

}

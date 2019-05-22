import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { MenuChoice } from './menuChoice';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  choices : MenuChoice[] = [
    {name : "JOUER"       , route : "game"        },
    {name : "OPTIONS"     , route : "options"     },
    {name : "STATISTIQUES", route : "stats"       },
    {name : "INSTRUCTIONS", route : "instructions"},
    {name : "CREDITS"     , route : "credits"     }
  ]

  menu: Menu = {
    name           : 'Menu principal',
    userName       : ' joueur 1'     , 
    choices        : this.choices    ,
    selectedChoice : undefined
  };

  constructor() { }

  ngOnInit() {
  }

  onSelect(choice: MenuChoice): void {
    this.menu.selectedChoice = choice;
  }
}

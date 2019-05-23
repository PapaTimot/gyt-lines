import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  choices : {name : string, route : string}[] = [
    {name : "JOUER"       , route : "game"        },
    {name : "OPTIONS"     , route : "options"     },
    {name : "STATISTIQUES", route : "stats"       },
    {name : "INSTRUCTIONS", route : "instructions"},
    {name : "CREDITS"     , route : "credits"     }
  ]

  name : string = 'Menu principal'

  constructor() {}

  ngOnInit() {
  }
}

import { Component, OnInit } from '@angular/core';
import { Menu } from './menu';
import { MenuChoice } from './menuChoice';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  menu: Menu = {
    name     : 'Menu principal',
    userName : '', 
    choices  : []
  };

  constructor() { }

  ngOnInit() {
    if (this.menu.userName == '')
      this.menu.userName = 'joueur 1'
  }
}

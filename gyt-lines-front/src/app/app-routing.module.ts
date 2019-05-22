import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent }        from './menu/menu.component';
import { BoardGameComponent }      from './board-game/board-game.component';

const routes: Routes = [
  { path: ''    , redirectTo: '/menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent      },
  { path: 'game', component: BoardGameComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
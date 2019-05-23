import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoardGameComponent } from './board-game/board-game.component';
import { MenuComponent } from './menu/menu.component';
import { AppRoutingModule } from './app-routing.module';
import { OptionsComponent } from './options/options.component';
import { StatsComponent } from './stats/stats.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { CreditsComponent } from './credits/credits.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardGameComponent,
    MenuComponent,
    OptionsComponent,
    StatsComponent,
    InstructionsComponent,
    CreditsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

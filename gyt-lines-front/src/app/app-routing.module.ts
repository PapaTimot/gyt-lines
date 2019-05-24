import { NgModule              } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { MenuComponent         } from './menu/menu.component';
import { BoardGameComponent    } from './board-game/board-game.component';
import { OptionsComponent      } from './options/options.component'
import { InstructionsComponent } from './instructions/instructions.component'
import { CreditsComponent      } from './credits/credits.component'

const routes: Routes = [
  { path: ''            , component : MenuComponent         },
  { path: 'menu'        , component : MenuComponent         },
  { path: 'game'        , component : BoardGameComponent    },
  { path: 'options'     , component : OptionsComponent      },
  { path: 'instructions', component : InstructionsComponent },
  { path: 'credits'     , component : CreditsComponent      }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

}
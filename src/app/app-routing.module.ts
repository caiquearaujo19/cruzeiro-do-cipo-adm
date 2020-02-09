import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SystemComponent } from './pages/system/system.component';
import { NextMatchComponent } from './pages/system/next-match/next-match.component';
import { MatchesComponent } from './pages/system/matches/matches.component';
import { AddMatchComponent } from './pages/system/matches/add-match/add-match.component';
import { EditMatchComponent } from './pages/system/matches/edit-match/edit-match.component';
import { PlayersComponent } from './pages/system/players/players.component';
import { AddPlayerComponent } from './pages/system/players/add-player/add-player.component';
import { EditPlayerComponent } from './pages/system/players/edit-player/edit-player.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'system', component: SystemComponent, children: [
      { path: '', redirectTo: 'next-match', pathMatch: 'full' },
      { path: 'next-match', component: NextMatchComponent },
      { path: 'matches', component: MatchesComponent },
      { path: 'players', component: PlayersComponent },
    ]
  },
  { path: 'matches/add', component: AddMatchComponent },
  { path: 'matches/edit/:id', component: EditMatchComponent },
  { path: 'players/add', component: AddPlayerComponent },
  { path: 'players/edit/:id', component: EditPlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

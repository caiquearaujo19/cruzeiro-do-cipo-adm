import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { TabBarComponent } from './components/tab-bar/tab-bar.component';
import { NextMatchComponent } from './pages/system/next-match/next-match.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { MatchesComponent } from './pages/system/matches/matches.component';
import { PlayersComponent } from './pages/system/players/players.component';
import { FloatButtonComponent } from './components/float-button/float-button.component';
import { AddMatchComponent } from './pages/system/matches/add-match/add-match.component';
import { AddPlayerComponent } from './pages/system/players/add-player/add-player.component';
import { EditPlayerComponent } from './pages/system/players/edit-player/edit-player.component';
import { EditMatchComponent } from './pages/system/matches/edit-match/edit-match.component';
import { LoginComponent } from './pages/login/login.component';
import { SystemComponent } from './pages/system/system.component';

@NgModule({
  declarations: [
    AppComponent,
    TabBarComponent,
    NextMatchComponent,
    PageHeaderComponent,
    MatchesComponent,
    PlayersComponent,
    FloatButtonComponent,
    AddMatchComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    EditMatchComponent,
    LoginComponent,
    SystemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/services/players/players.service';

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  players: Array<Player>;

  constructor(private playersService: PlayersService) { }

  ngOnInit(): void {
    this.playersService.getPlayers()
    .subscribe(data => {
      this.players = data;
    })
  }

}

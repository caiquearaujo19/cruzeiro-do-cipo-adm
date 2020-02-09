import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/services/players/players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.scss']
})
export class AddPlayerComponent implements OnInit {

  player: Player = {
    name: '',
    goals: 0,
    assists: 0
  };

  constructor(private playersService: PlayersService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.player.name !== '') {
      this.playersService.addPlayer(this.player);
      this.player.name = '';
    }
  }

  onCancel(): void {
    this.player.name = '';
    this.router.navigateByUrl('/system/players');
  }

}

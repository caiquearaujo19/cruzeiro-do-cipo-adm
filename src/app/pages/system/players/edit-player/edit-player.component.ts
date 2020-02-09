import { Component, OnInit } from '@angular/core';
import { PlayersService } from 'src/app/services/players/players.service';
import { Player } from 'src/app/models/player';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  player: Player;
  playerId: string;

  constructor(private playersService: PlayersService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.playerId = this.activatedRoute.snapshot.params.id;
    this.playersService.getPlayerById(this.playerId)
    .subscribe(data => {
      this.player = data;
    });
  }

  onUpdate(): void {
    if(this.player.name !== '') {
      this.playersService.updatePlayer(this.playerId, this.player);
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('/system/players');
  }

}

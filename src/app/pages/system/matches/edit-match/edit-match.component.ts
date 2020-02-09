import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/services/players/players.service';
import { Match } from 'src/app/models/match';
import { MatchesService } from 'src/app/services/matches/matches.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.scss']
})
export class EditMatchComponent implements OnInit {

  match: Match;
  matchId: string;
  players: Array<Player>;
  updatedPlayers = [];

  constructor(private playersService: PlayersService, private matchesServices: MatchesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.matchId = this.activatedRoute.snapshot.params.id;
    this.matchesServices.getMatchById(this.matchId)
    .subscribe(data => {
      this.match = data;
    });
    this.playersService.getPlayers()
    .subscribe(data => {
      this.players = data;
    });
  }

  goalsArray(n: number): any[] {
    return Array(n);
  }

  onGoalsCipoChange(): void {
    this.match.scorers = [];
    this.match.assists = [];
  }

  changePlayerGoals(index: number): void {
    if((index + 1) === this.match.goalsCipo) {
      this.match.scorers.map((scorer) => {
        this.players.map((player, i) => {
          if(player.id === scorer) {
            this.players[i].goals ++;
            if(!this.updatedPlayers.includes(scorer)) {
              this.updatedPlayers.push(scorer);
            }
          }
        })
      })
    }
  }

  changePlayerAssists(index: number): void {
    if((index + 1) === this.match.goalsCipo) {
      this.match.assists.map((assist) => {
        this.players.map((player, i) => {
          if(player.id === assist) {
            this.players[i].assists ++;
            if(!this.updatedPlayers.includes(assist)) {
              this.updatedPlayers.push(assist);
            }
          }
        })
      })
    }
  }

  onUpdate(): void {
    if(this.match.adversary !== '' && this.match.date !== '' && this.match.scorers.length === this.match.goalsCipo && this.match.assists.length === this.match.goalsCipo) {
      this.updatedPlayers.map((playerId) => {
        this.players.map((player) => {
          if(playerId === player.id) {
            this.playersService.updatePlayer(playerId, player);
          }
        })
      })
      this.matchesServices.updateMatch(this.matchId, this.match);
    }
  }

  onCancel(): void {
    this.router.navigateByUrl('/system/matches');
  }
}

import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';
import { PlayersService } from 'src/app/services/players/players.service';
import { Match } from 'src/app/models/match';
import { MatchesService } from 'src/app/services/matches/matches.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.scss']
})
export class AddMatchComponent implements OnInit {

  match: Match = {
    adversary: '',
    place: 'Casa',
    date: '',
    goalsCipo: 0,
    goalsAdversary: 0,
    scorers: [],
    assists: []
  };
  players: Array<Player>;
  updatedPlayers = [];

  constructor(private playersService: PlayersService, private matchesService: MatchesService, private router: Router) { }

  ngOnInit(): void {
    this.playersService.getPlayers()
    .subscribe(data => {
      this.players = data;
    })
  }

  goalsArray(n: number): any[] {
    return Array(n);
  }

  onGoalsCipoChange(): void {
    this.match.scorers = [];
    this.match.assists = [];
  }

  changePlayerGoals(i): void {
    if((i + 1) === this.match.goalsCipo) {
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

  changePlayerAssists(i): void {
    if((i + 1) === this.match.goalsCipo) {
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

  clearForm(): void {
    this.match.adversary = '';
    this.match.place = 'Casa',
    this.match.date = '',
    this.match.goalsCipo = 0;
    this.match.goalsAdversary = 0;
    this.match.scorers = [];
    this.match.assists = [];
  }

  onSubmit(): void {
    if(this.match.adversary !== '' && this.match.date !== '' && this.match.scorers.length === this.match.goalsCipo && this.match.assists.length === this.match.goalsCipo) {
      this.updatedPlayers.map((playerId) => {
        this.players.map((player) => {
          if(playerId === player.id) {
            this.playersService.updatePlayer(playerId, player);
          }
        })
      })
      this.matchesService.addMatch(this.match);
      this.clearForm();
    }
  }

  onCancel(): void {
    this.clearForm();
    this.router.navigateByUrl('/system/matches');
  }

}

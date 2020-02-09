import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match';
import { MatchesService } from 'src/app/services/matches/matches.service';

@Component({
  selector: 'matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  matches: Array<Match>;

  constructor(private matchesService: MatchesService) { }

  ngOnInit(): void {
    this.matchesService.getMatches()
    .subscribe(data => {
      this.matches = data;
    })
  }
}

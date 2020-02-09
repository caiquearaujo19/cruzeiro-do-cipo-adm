import { Component, OnInit } from '@angular/core';
import { NextMatchService } from 'src/app/services/next-match/next-match.service';
import { NextMatch } from 'src/app/models/nextMatch';

@Component({
  selector: 'next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.scss']
})
export class NextMatchComponent implements OnInit {

  nextMatch: NextMatch;

  constructor(private nextMatchService: NextMatchService) { }

  ngOnInit(): void {
    this.nextMatchService.getNextMatch()
    .subscribe(data => {
      this.nextMatch = data;
    });
  }

  onUpdate():void {
    this.nextMatchService.updateNextGame(this.nextMatch);
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';
import { Match } from 'src/app/models/match';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  private matchDoc: AngularFirestoreDocument<Match>;
  private matchesCollection: AngularFirestoreCollection<Match>;
  matches: Observable<Array<Match>>;

  constructor(private angularFirestore: AngularFirestore, private router: Router) {
    this.matchesCollection = this.angularFirestore.collection<Match>('matches');
    this.matches = this.matchesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Match;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getMatches(): Observable<Array<Match>> {
    return this.matches;
  }

  getMatchById(matchId: string): Observable<Match> {
    this.matchDoc = this.angularFirestore.doc<Match>(`matches/${matchId}`);
    return this.matchDoc.valueChanges();
  }

  addMatch(match: Match): void {
    this.matchesCollection.add(match);
    this.router.navigateByUrl("/system/matches");
  }

  updateMatch(id: string, match: Match): void {
    this.matchDoc = this.angularFirestore.doc<Match>(`matches/${id}`);
    this.matchDoc.update(match);
    this.router.navigateByUrl("/system/matches");
  }
}

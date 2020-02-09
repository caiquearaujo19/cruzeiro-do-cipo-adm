import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'firebase/firestore';
import { NextMatch } from 'src/app/models/nextMatch';

@Injectable({
  providedIn: 'root'
})
export class NextMatchService {

  private nextMatchDoc: AngularFirestoreDocument<NextMatch>;
  nextMatch: Observable<any>;

  constructor(private angularFirestore: AngularFirestore) {
    this.nextMatchDoc = this.angularFirestore.doc<NextMatch>('nextMatch/1');
    this.nextMatch = this.nextMatchDoc.valueChanges();
  }

  getNextMatch(): Observable<any> {
    return this.nextMatch;
  }

  updateNextGame(nextMatch: NextMatch): void {
    this.nextMatchDoc = this.angularFirestore.doc<NextMatch>('nextMatch/1');
    this.nextMatchDoc.update(nextMatch);
    alert("Próximo jogo atualizado com sucesso!");
  }
}
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';
import { Player } from 'src/app/models/player';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playerDoc: AngularFirestoreDocument<Player>;
  private playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Array<Player>>;

  constructor(private angularFirestore: AngularFirestore, private router: Router) {
    this.playersCollection = this.angularFirestore.collection<Player>('players');
    this.players = this.playersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Player;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getPlayers(): Observable<Array<Player>> {
    return this.players;
  }

  getPlayerById(playerId: string): Observable<Player> {
    this.playerDoc = this.angularFirestore.doc<Player>(`players/${playerId}`);
    return this.playerDoc.valueChanges();
  }

  addPlayer(player: Player): void {
    this.playersCollection.add(player);
    this.router.navigateByUrl("/system/players");
  }

  updatePlayer(id: string, player: Player): void {
    this.playerDoc = this.angularFirestore.doc<Player>(`players/${id}`);
    this.playerDoc.update(player);
    this.router.navigateByUrl("/system/players");
  }
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) { }

  login(credentials): void {
    this.angularFireAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      this.router.navigateByUrl("/system");
    }).catch(error => {
      if(error.code == "auth/network-request-failed") {
        alert("Erro na rede, verifique se você está conectado à internet!");
      }
      else if(error.code == "auth/invalid-email") {
        alert("O e-mail informado é inválido, tente novamente!");
      }
      else if(error.code == "auth/wrong-password") {
        alert("A senha está incorreta, tente novamente!");
      }
      else if(error.code == "auth/user-not-found") {
        alert("Usuário não existe!");
      }
      else if(error.code == "auth/internal-error") {
        alert("Erro interno!");
      }
    });
  }

  checkLogin(): boolean {
    if(this.angularFireAuth.auth.currentUser !== null) {
      return true;
    }
    return false;
  }

}
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    const credentials = {
      email: this.email,
      password: this.password
    }

    this.authService.login(credentials);
  }

}

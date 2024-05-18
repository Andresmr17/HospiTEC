import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  Correo: string ="";
  Contrasena: string = "";

  async login_profesor(Correo: string, Contrasena: string) {
    const data = JSON.stringify({Correo, Contrasena});
    console.log(data);
  }
}

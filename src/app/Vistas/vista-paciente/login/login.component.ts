import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ComunicationService} from "../../../Servicios/Paciente/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-paciente',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginPacienteComponent {

  constructor(private servicio:ComunicationService, private router: Router) {}

  Nombre: string ="";
  Cedula: string = "";

  async login_profesor(Nombre: string, Cedula: string) {
    const data = JSON.stringify({Nombre, Cedula});
    console.log(data);

    try {
      const response = await fetch('https://hospiapi.azurewebsites.net/api/Paciente/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });

      if (!response.ok) {
        throw new Error("Algo malo está pasando");
      }

      this.servicio.setCedula(Cedula);
      this.servicio.setNombrePaciente(Nombre);
      this.router.navigate(['/paciente-menu']);

    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }


  }
}

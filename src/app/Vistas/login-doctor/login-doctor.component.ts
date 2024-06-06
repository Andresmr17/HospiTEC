import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {ComunicationService} from "../../Servicios/comunication.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login-doctor.component.html',
  styleUrl: './login-doctor.component.css'
})
export class LoginDoctorComponent {
  constructor(private router: Router , private servicio: ComunicationService) {
  }

  Correo: string ="";


  login(Correo: string) {
    if(this.Correo!=""){ //verifica que no esta vacio el textbox
      this.servicio.Login(this.Correo).subscribe(
        response => {
          console.log('Datos recibidos de posgress', response);

          this.router.navigate(['mainDoctor']);
          this.Correo="";
        },
        error => {
          console.error('Error al enviar datos al servidor:', error);
          // Maneja el error adecuadamente aquí
        }
      );
    }

  }

}

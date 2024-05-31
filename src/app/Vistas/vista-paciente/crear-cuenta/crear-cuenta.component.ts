import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import { Router } from '@angular/router';
import {ComunicationService} from "../../../Servicios/Paciente/auth.service";

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent  {
  Nombre: string ="";
  Apellidos: string ="";

  Cedula: string ="";
  Telefono: string ="";
  Direccion: string ="";
  Fecha: string ="";
  Patologias: string ="";

  constructor(private servicio:ComunicationService, private router: Router) {}

  async crearCuenta(Nombre: string, Apellidos: string, Cedula: string, Telefono: string, Direccion: string, Fecha: string, Patologias: string) {

    const apellidosArray = Apellidos.split(" ");
    const Apellido1 = apellidosArray[0] || "";
    const Apellido2 = apellidosArray[1] || "";


    const data = JSON.stringify({Nombre, Apellido1, Apellido2, Cedula, Telefono, Direccion, Fecha, Patologias});
    console.log(data);



    try {
      const response = await fetch('http://localhost:5276/api/Paciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });

      if (!response.ok) {
        throw new Error("Algo malo está pasando");
      }

      this.router.navigate(['/login']);

    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }

  }
}

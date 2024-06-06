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

  crearCuentaYEnviarPatologias(Nombre: string, Apellidos: string, Cedula: string, Telefono: string, Direccion: string, fechanacimiento: string, Patologias: string): void {
    this.crearCuenta(Nombre, Apellidos, Cedula, Direccion, fechanacimiento, Patologias,Telefono);
  }

  async crearCuenta(Nombre: string, Apellidos: string, Cedula: string, Direccion: string, fechanacimiento: string, Patologias: string, Telefono: string) {

    const apellidosArray = Apellidos.split(" ");
    const Apellido1 = apellidosArray[0] || "";
    const Apellido2 = apellidosArray[1] || "";
    const pacienteData  = JSON.stringify({Nombre, Apellido1, Apellido2, Cedula, Direccion, fechanacimiento});
    try {
      const response = await fetch('http://localhost:5276/api/Paciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: pacienteData
      });

      if (!response.ok) {
        console.error('Error:', response.text());
        throw new Error("Algo malo está pasando");
      }
      this.enviarPatologias(Cedula, Patologias);
      this.enviarTelefono(Cedula, Telefono);
      this.router.navigate(['/login-paciente']);

    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }

  }

  async enviarPatologias(Cedula: string, Patologias: string): Promise<void> {

    const cedula = Cedula;
    const patologias = Patologias.split('.');
    console.log(patologias);

    for (const patologia of patologias) {
      if (patologia.trim() !== '') {
        const [nombrePatologia, descripcion] = patologia.split(':');
        const body = {
          pacientecedula: cedula,
          nombrepatologia: nombrePatologia.trim(),
          descripciontratamiento: descripcion.trim()
        };
        console.log(body);

        try {
          const response = await fetch('http://localhost:5276/api/PalotogiasPresente', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }

  async enviarTelefono(pacientecedula: string, Telefono: string) {
    const telefonoData = JSON.stringify({pacientecedula, Telefono});
    console.log(telefonoData);
    try {
      const response = await fetch('http://localhost:5276/api/PacienteTelefono', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: telefonoData
      });

      if (!response.ok) {
        console.error('Error:', response.text());
        throw new Error("Algo malo está pasando");
      }
      this.router.navigate(['/login-paciente']);

    } catch (error) {
      console.error('Error:', error);
    }
  }
  }


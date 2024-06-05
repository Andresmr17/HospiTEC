// new-patient-form.component.ts

import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";
import { Router } from '@angular/router';
import {ComunicationService} from "../../Servicios/comunication.service";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  standalone: true,
  styleUrls: ['./add-patient.component.css'],
  imports: [FormsModule, NgIf]
})
export class AddPatientComponent {
  Nombre: string ="";
  Apellido1: string ="";
  Apellido2: string ="";
  Cedula: string ="";
  Telefono: string ="";
  Direccion: string ="";
  Fecha: string ="";

  constructor(private servicio:ComunicationService, private router: Router) { }

  async crearCuenta(nombre: string, apellido1: string, apellido2: string,  cedula: string, telefono: string, direccion: string, fechanacimiento: string) {

    const data = JSON.stringify({nombre, apellido1, apellido2, cedula, telefono, direccion, fechanacimiento});
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
        console.error('Error:', response.text());
        throw new Error("Algo malo está pasando");
      }



    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }

  }

}


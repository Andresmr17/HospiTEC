import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ComunicationService} from "../../../../Servicios/Paciente/auth.service";
import {Router} from "@angular/router";

interface InformacionType {
  idreservacion: string;
  pacientecedula: string;
  idcama: string;
  idproced: string;
  fechaingreso: string;
  fechasalida: string;
}
@Component({
  selector: 'app-gestion-reservacion',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './gestion-reservacion.component.html',
  styleUrl: './gestion-reservacion.component.css'
})
export class GestionReservacionComponent {

  constructor(private servicio:ComunicationService, private router: Router) {}


  fechaingreso: string ="";
  Procedimientos: string ="";

  data: InformacionType[] = [];

  async OrdenaInformacion(Informacion: InformacionType[]) {
    this.data = Informacion;
  }

  crearReserva(fechaingreso: string, Procedimientos: string) {
    const data = JSON.stringify({fechaingreso, Procedimientos});
    console.log(data);
  }

  procedimientos: { nombre: string, seleccionado: boolean }[] = [
    { nombre: 'Procedimiento 1', seleccionado: false },
    { nombre: 'Procedimiento 2', seleccionado: false },
    { nombre: 'Procedimiento 3', seleccionado: false },
    { nombre: 'Procedimiento 4', seleccionado: false },
    { nombre: 'Procedimiento 5', seleccionado: false },
  ];

  async consultarReservas(): Promise<void> {
    const cedula = this.servicio.getCedulaPaciente();
    fetch(`http://localhost:5276/api/Reserva/ObtieneReservas/${cedula}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {

        //console.log(this.Informacion);
        this.OrdenaInformacion(data);
      });
  }

  eliminarReserva(idreservacion: string) {
    fetch(`http://localhost:5276/api/Reserva/${idreservacion}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al eliminar la reserva.');
        }
        // Filtra la reserva eliminada del array de datos
        this.data = this.data.filter(item => item.idreservacion !== idreservacion);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

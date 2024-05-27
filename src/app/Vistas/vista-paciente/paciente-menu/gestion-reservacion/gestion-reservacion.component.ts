import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

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

  Nombre: string ="";
  Cedula: string ="";
  Fecha: string ="";
  Procedimientos: string ="";


  crearCuenta(Nombre: string, Cedula: string, Fecha: string, Procedimientos: string) {
    const data = JSON.stringify({Nombre, Cedula, Fecha, Procedimientos});
    console.log(data);
  }

  procedimientos: { nombre: string, seleccionado: boolean }[] = [
    { nombre: 'Apendicectomía', seleccionado: false },
    { nombre: 'Biopsia de mama', seleccionado: false },
    { nombre: 'Cirugía de cataratas', seleccionado: false },
    { nombre: 'Cesárea', seleccionado: false },
    { nombre: 'Histerectomía', seleccionado: false },
    { nombre: 'Cirugía para la lumbalgia', seleccionado: false },
    { nombre: 'Mastectomía', seleccionado: false },
    { nombre: 'Amigdalectomía', seleccionado: false }
  ];

}

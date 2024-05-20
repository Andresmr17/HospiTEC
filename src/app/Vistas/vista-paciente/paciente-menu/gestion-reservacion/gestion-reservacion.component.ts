import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-gestion-reservacion',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf
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

}

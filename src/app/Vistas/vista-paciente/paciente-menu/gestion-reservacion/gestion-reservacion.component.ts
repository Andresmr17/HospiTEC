import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

interface InformacionType {
  id: string;
  nombre: string;
  cedula: string;
  fechaIngreso: string;
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

  Nombre: string ="";
  Cedula: string ="";
  Fecha: string ="";
  Procedimientos: string ="";

  data: InformacionType[] = [];

  async OrdenaInformacion(Informacion: InformacionType[]) {
    console.log(Informacion.length);

    this.data = Informacion;
  }


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

  async consultarSolicitudes(): Promise<void> {


    fetch(`https://665856f45c361705264803d5.mockapi.io/HospiTEC/user`, {
      method: 'Get',
    })
      .then(response => response.json())
      .then(data => {

        //console.log(this.Informacion);
        this.OrdenaInformacion(data);
      });


  }

}

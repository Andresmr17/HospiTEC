import { Component } from '@angular/core';
import {NgFor} from "@angular/common";

export interface Registros {
  fecha: string;
  ingreso: string;
  salida: string;
  horasTrabajadas: number
}

@Component({
  selector: 'app-salones',
  standalone: true,
  imports: [NgFor],
  templateUrl: './salones.component.html',
  styleUrl: './salones.component.css'
})
export class SalonesComponent {
  dataSource: Registros[] = [];//aca se guardan los datos solicitados del servidor
  //titulos para las columnas;
  obtenerReportes(){}

}

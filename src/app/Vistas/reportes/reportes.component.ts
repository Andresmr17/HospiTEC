import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import {ComunicationService} from "../../Servicios/comunication.service";

export interface Evaluacion {
  id: string;
  nombreServicio: string;
  aseo: number;
  trato: number;
  puntualidad: number;
}
@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  evaluaciones: Evaluacion[] = []; //este es mi datasource

  aseoRatings: number[] = [4, 5, 3, 4, 5]; // Ejemplo de calificaciones
  tratoRatings: number[] = [5, 4, 4, 3, 5]; // Ejemplo de calificaciones
  puntualidadRatings: number[] = [3, 4, 4, 5, 3]; // Ejemplo de calificaciones
  constructor(private servicio: ComunicationService) {
  }
  getEvaluaciones(){
    this.servicio.getEvaluaciones().subscribe(
      response => {
        console.log('Datos recibidos de posgress', response);

        this.evaluaciones = response; //aca igualo a mi datasource
        //aca obtengo lo que necesito para los promedios:
        // Limpiar arrays antes de agregar nuevos datos
        this.aseoRatings.splice(0, this.aseoRatings.length);
        this.tratoRatings.splice(0, this.tratoRatings.length);
        this.puntualidadRatings.splice(0, this.puntualidadRatings.length);
        //aca se actualiza all
        for (const evaluacion of this.evaluaciones) {
          // Agregar el puntaje de aseo al array aseoRatings
          this.aseoRatings.push(evaluacion.aseo);

          // Agregar el puntaje de trato al array tratoRatings
          this.tratoRatings.push(evaluacion.trato);

          // Agregar el puntaje de puntualidad al array puntualidadRatings
          this.puntualidadRatings.push(evaluacion.puntualidad);
        }
      },
      error => {
        console.error('Error al enviar datos al servidor:', error);
        // Maneja el error adecuadamente aquí
      }
    );
    console.log("se cambio el array ahora es:",this.puntualidadRatings)
  }
  get aseoAverage(): number {
    return this.calculateAverage(this.aseoRatings);
  }

  get aseoCount(): number {
    return this.aseoRatings.length;
  }

  get tratoAverage(): number {
    return this.calculateAverage(this.tratoRatings);
  }

  get tratoCount(): number {
    return this.tratoRatings.length;
  }

  get puntualidadAverage(): number {
    return this.calculateAverage(this.puntualidadRatings);
  }

  get puntualidadCount(): number {
    return this.puntualidadRatings.length;
  }

  private calculateAverage(ratings: number[]): number {
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
  }


  generatePDF() {
    const doc = new jsPDF();

    doc.text('Reportes de Áreas de Mejora', 10, 10);

    doc.text('Aseo', 10, 20);
    doc.text(`Promedio: ${this.aseoAverage.toFixed(1)} / 5`, 10, 30);
    doc.text(`Cantidad de calificaciones: ${this.aseoCount}`, 10, 40);

    doc.text('Trato', 10, 50);
    doc.text(`Promedio: ${this.tratoAverage.toFixed(1)} / 5`, 10, 60);
    doc.text(`Cantidad de calificaciones: ${this.tratoCount}`, 10, 70);

    doc.text('Puntualidad', 10, 80);
    doc.text(`Promedio: ${this.puntualidadAverage.toFixed(1)} / 5`, 10, 90);
    doc.text(`Cantidad de calificaciones: ${this.puntualidadCount}`, 10, 100);

    doc.save('reportes.pdf');
  }
}

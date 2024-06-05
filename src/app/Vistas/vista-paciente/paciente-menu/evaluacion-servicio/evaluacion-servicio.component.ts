import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-evaluacion-servicio',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './evaluacion-servicio.component.html',
  styleUrl: './evaluacion-servicio.component.css'
})
export class EvaluacionServicioComponent {

  aseoRating = 0;
  tratoRating = 0;
  puntualidadRating = 0;

  aseoAverage = 4.2;
  aseoCount = 15;
  tratoAverage = 3.8;
  tratoCount = 20;
  puntualidadAverage = 4.5;
  puntualidadCount = 10;

  rateAseo(star: number) {
    this.aseoRating = star;
  }

  rateTrato(star: number) {
    this.tratoRating = star;
  }

  ratePuntualidad(star: number) {
    this.puntualidadRating = star;
  }

  submitRatings() {
    // Implementa la lógica para enviar las calificaciones al servidor
    console.log('Calificaciones enviadas:');
    console.log('Aseo:', this.aseoRating);
    console.log('Trato:', this.tratoRating);
    console.log('Puntualidad:', this.puntualidadRating);
  }

}

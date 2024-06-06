import { Component } from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-evaluacion-servicio',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './evaluacion-servicio.component.html',
  styleUrl: './evaluacion-servicio.component.css'
})
export class EvaluacionServicioComponent {

  aseo = 0;
  trato = 0;
  puntualidad = 0;
  nombreServicio: any;

  rateAseo(star: number) {
    this.aseo = star;
  }

  rateTrato(star: number) {
    this.trato = star;
  }

  ratePuntualidad(star: number) {
    this.puntualidad = star;
  }

  async submitRatings(nombreServicio: string, aseo: number, trato: number, puntualidad: number) {
    const data = JSON.stringify({nombreServicio, aseo, trato, puntualidad});
    console.log(data);
    try {
      const response = await fetch('https://hospiapi.azurewebsites.net/api/Evaluaciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });

      if (!response.ok) {
        throw new Error("Algo malo está pasando");
      }

    } catch (error) {
      console.error('Error:', error);

    }
  }

}

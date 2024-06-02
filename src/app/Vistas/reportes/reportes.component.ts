import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {
  aseoRatings: number[] = [4, 5, 3, 4, 5]; // Ejemplo de calificaciones
  tratoRatings: number[] = [5, 4, 4, 3, 5]; // Ejemplo de calificaciones
  puntualidadRatings: number[] = [3, 4, 4, 5, 3]; // Ejemplo de calificaciones

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
}

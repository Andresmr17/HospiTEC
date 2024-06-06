import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ComunicationService} from "../../../../Servicios/Paciente/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-historial-clinico',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './historial-clinico.component.html',
  styleUrl: './historial-clinico.component.css'
})
export class HistorialClinicoComponent implements OnInit {
  data: any[] = [];

  ngOnInit(): void {
    this.consultarHistorial();
  }

  constructor(private servicio:ComunicationService, private router: Router) {}

  async consultarHistorial(): Promise<void> {
    const cedula = this.servicio.getCedulaPaciente();
    fetch(`https://hospiapi.azurewebsites.net/api/Historial/sp/${cedula}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.data = data.sort((a: any, b: any) => {
          return new Date(b.fechaProcedimiento).getTime() - new Date(a.fechaProcedimiento).getTime();
        });
        console.log(this.data);
      })
      .catch(error => console.error('Error:', error));
  }



}

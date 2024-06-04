import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ComunicationService} from "../../../../Servicios/Paciente/auth.service";
import {Router} from "@angular/router";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
    fetch(`http://localhost:5276/api/Historial/ObtieneHistorial/${305370401}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        this.data = data.sort((a: any, b: any) => {
          return new Date(b.fechaprocedimiento).getTime() - new Date(a.fechaprocedimiento).getTime();
        });
        console.log(this.data); // Verifica que los datos están ordenados correctamente
      })
      .catch(error => console.error('Error:', error));
  }



}

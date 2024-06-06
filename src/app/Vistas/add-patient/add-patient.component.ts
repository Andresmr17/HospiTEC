// new-patient-form.component.ts

import { Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from "@angular/common";
import {NgFor} from "@angular/common";
import { Router } from '@angular/router';
import {ComunicationService} from "../../Servicios/comunication.service";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  standalone: true,
  styleUrls: ['./add-patient.component.css'],
  imports: [FormsModule, NgIf, NgFor]
})
export class AddPatientComponent {
  Nombre: string ="";
  Apellido1: string ="";
  Apellido2: string ="";
  Cedula: string ="";
  Telefono: string ="";
  Direccion: string ="";
  Fecha: string ="";
  createdPatient: any = null;
  pathologies: any[] = [];
  treatments: any[] = [];
  selectedPathology: string = '';
  selectedTreatment: string = '';

  constructor(private service:ComunicationService, private router: Router) { }

  ngOnInit() {
    this.loadPathologies();
  }

  loadPathologies() {
    this.service.getPatologias().subscribe(patologias => {
      this.pathologies = patologias;
      console.log(patologias)
    }, error => {
      console.error('Error fetching procedures', error);
    });
  }
  loadTreatments(data: any) {

    this.service.getTreatmentforPath(data).subscribe(treatments => {
      this.treatments = treatments;
      console.log(treatments);
    }, error => {
      console.error('Error fetching treatments', error);
    });
  }
  async crearCuenta(nombre: string, apellido1: string, apellido2: string,  cedula: string, telefono: string, direccion: string, fechanacimiento: string) {

    const data = JSON.stringify({nombre, apellido1, apellido2, cedula, telefono, direccion, fechanacimiento});
    console.log(data);

    try {
      const response = await fetch('https://hospiapi.azurewebsites.net/api/Paciente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });

      if (!response.ok) {
        console.error('Error:', response.text());
        throw new Error("Algo malo está pasando");
      }
      else{
        this.createdPatient = data;
      }

    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }

  }

  onPathologyChange(event: any) {
    const pathologyName = event.target.value;
    this.selectedPathology = pathologyName;
    this.loadTreatments(pathologyName);
  }

  async addPathologyAndTreatment(pacientecedula: string, nombrepatologia: string, descripciontratamiento: string) {
    // Handle adding Pathology and Treatment to the patient
    const data = JSON.stringify({pacientecedula, nombrepatologia, descripciontratamiento});
    console.log(data)
    try {
      const response = await fetch('https://hospiapi.azurewebsites.net/api/PatologiasPresente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      });

      if (!response.ok) {
        console.error('Error:', response.text());
        throw new Error("Algo malo está pasando");
      }
      else{
        this.createdPatient = data;
      }

    } catch (error) {
      console.error('Error:', error);
      // Manejar el error, mostrar un mensaje al usuario, etc.
    }
    this.selectedPathology = '';
    this.selectedTreatment = '';
  }

  finishAdding() {
    this.createdPatient = null;
    this.Nombre = '';
    this.Apellido1 = '';
    this.Apellido2 = '';
    this.Cedula = '';
    this.Telefono = '';
    this.Direccion = '';
    this.Fecha = '';
    this.selectedPathology = '';
    this.selectedTreatment = '';
  }


}


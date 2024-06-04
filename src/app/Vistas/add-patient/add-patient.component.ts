// new-patient-form.component.ts

import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from "@angular/common";
import {ComunicationService} from "../../Servicios/comunication.service";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  standalone: true,
  styleUrls: ['./add-patient.component.css'],
  imports: [FormsModule, NgClass]
})
export class AddPatientComponent {
  patient: any = {}; // Object to store form data

  constructor(private servicio:ComunicationService) { }

  submitForm(form: any) {
    if (form.valid) {
      // Handle form submission logic here, such as saving the patient data
      console.log('Form submitted:', this.patient);
      // Reset the form after submission
      form.resetForm();
      // Optionally, navigate to another route or perform any other action
    } else {
      // Form is invalid, display validation errors or handle accordingly
    }
  }

  guardarCambios() {
    // Aquí puedes acceder a los datos del formulario usando el objeto 'formulario.value'
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const lastName1 = (document.getElementById('lastName1') as HTMLInputElement).value;
    const lastName2 = (document.getElementById('lastName2') as HTMLSelectElement).value;
    const id = (document.getElementById('id') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    //esta es la data que se va a enviar


    const datatoSend1={
      cedula : id,
      //direccion: ,
      //fechanacimiento: ,
      nombre: nombre,
      apellido1: lastName1,
      apellido2: lastName2,

    } // todo igual a los modelos
    //console.log('el tipo de salon es :', datatoSend1.Tipodesalon);
      this.servicio. postPaciente(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress', response);
        },
        error => {
          console.error('Error al enviar datos al servidor:', error);
          // Maneja el error adecuadamente aquí
        }
      );
  }



  protected readonly FormData = FormData;
}


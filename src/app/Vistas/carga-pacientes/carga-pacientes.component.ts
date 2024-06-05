import { Component } from '@angular/core';
import {ComunicationService} from "../../Servicios/comunication.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-carga-pacientes',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './carga-pacientes.component.html',
  styleUrl: './carga-pacientes.component.css'
})
export class CargaPacientesComponent {

  selectedFile: File | null = null;
  selectedFileName: string | null = null;

  constructor(private servicio:ComunicationService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && this.isValidExcelFile(file)) {
      this.selectedFile = file;
      this.selectedFileName = file.name;
    } else {
      console.error('El archivo seleccionado no es un archivo Excel válido.');
      this.clearFile();
    }
  }

  //validacion de que sea un archivo excel
  isValidExcelFile(file: File): boolean {
    return file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ningún archivo.');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    /*
    this.http.post('URL_DEL_SERVIDOR', formData).subscribe(
      (response) => {
        console.log('Archivo subido exitosamente', response);
        this.clearFile();
      },
      (error) => {
        console.error('Error al subir el archivo', error);
      }
    );*//*
    this.servicio. postEquipos(datatoSend1).subscribe(
      response => {
        console.log('Datos enviados a posgress', response);
      },
      error => {
        console.error('Error al enviar datos al servidor:', error);
        // Maneja el error adecuadamente aquí
      }
    );*/

  }
  clearFile() {
    this.selectedFile = null;
    this.selectedFileName = null;
  }
}

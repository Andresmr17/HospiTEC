import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ComunicationService } from "../../Servicios/comunication.service";

export interface Procedimiento {
  idProcedimiento: number;
  nombrePatologia: string;
  procedimientoNombre: string;
  descripcion: string;
  duracionDias: number;
}

export interface Patologia {
  nombrePatologia: string;
  descripcion: string;
}

@Component({
  selector: 'app-procedimientos',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './procedimientos.component.html',
  styleUrl: './procedimientos.component.css'
})
export class ProcedimientosComponent {
  constructor(private servicio: ComunicationService) {
    this.obtenerProcedimientos();
    this.obtenerPatologias();
  }

  dataSource: Procedimiento[] = [];
  patologias: Patologia[] = [];
  idProcedimiento = 0;
  modalVisible = false;
  tipoModal = 2;
  isReadonly = true;

  // Variables para el formulario
  nombrePatologia = '';
  procedimientoNombre = '';
  descripcion = '';
  duracionDias = 0;

  modificarProcedimiento(index: number, tipoModal: number) {
    this.tipoModal = tipoModal;
    this.isReadonly = true;
    const procedimientoSeleccionado = this.dataSource[index];
    this.idProcedimiento = procedimientoSeleccionado.idProcedimiento;
    this.nombrePatologia = procedimientoSeleccionado.nombrePatologia;
    this.procedimientoNombre = procedimientoSeleccionado.procedimientoNombre;
    this.descripcion = procedimientoSeleccionado.descripcion;
    this.duracionDias = procedimientoSeleccionado.duracionDias;
    this.modalVisible = true;
    console.log('modificarProcedimiento:', procedimientoSeleccionado);
  }

  eliminarProcedimiento(index: number) {
    const procedimientoSeleccionado = this.dataSource[index];
    console.log('eliminarProcedimiento:', procedimientoSeleccionado);
    this.servicio.deleteProcedimiento(procedimientoSeleccionado.idProcedimiento).subscribe(
      response => {
        console.log('Procedimiento eliminado:', response);
        this.dataSource.splice(index, 1); // Eliminar el registro del dataSource
        this.obtenerProcedimientos();
      },
      error => {
        console.error('Error al eliminar el procedimiento:', error);
      }
    );
  }

  guardarCambios() {
    const idProcedimientoElement = (document.getElementById('idProcedimiento') as HTMLInputElement).value.trim();
    const idProcedimiento1 = parseInt(idProcedimientoElement, 10);
    const nombrePatologia1 = (document.getElementById('nombrePatologia') as HTMLSelectElement).value;
    const procedimientoNombre1 = (document.getElementById('procedimientoNombre') as HTMLInputElement).value;
    const descripcion1 = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
    const duracionDias1 = parseInt((document.getElementById('duracionDias') as HTMLInputElement).value, 10);

    const datatoSend1 = {
      IDproced: idProcedimiento1,
      Nombrepatologia: nombrePatologia1,
      Procednombre: procedimientoNombre1,
      Descripcion: descripcion1,
      Duraciondias: duracionDias1
    };

    if (this.tipoModal == 1) {
      this.servicio.postProcedimientos(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress en POST:', response);
          this.obtenerProcedimientos();
        },
        error => {
          console.error('POST - Error al enviar datos al servidor:', error);
        }
      );
    } else {
      this.servicio.putProcedimientos(datatoSend1.IDproced, datatoSend1).subscribe(
        () => {
          console.log('Update PUT - procedimiento se actualizó correctamente.');
          this.obtenerProcedimientos();
        },
        error => {
          console.error('PUT - Error al actualizar el procedimiento:', error);
        }
      );
    }
  }

  addRegistro(numero: number) {
    this.tipoModal = numero;
    this.idProcedimiento = 0;
    this.nombrePatologia = '';
    this.procedimientoNombre = '';
    this.descripcion = '';
    this.duracionDias = 0;
    this.isReadonly = false;
    this.modalVisible = true;
  }

  obtenerProcedimientos() {
    this.servicio.getProcedimientos().subscribe(
      response => {
        this.dataSource = response;
      },
      error => {
        console.error('GET - Error al obtener datos del servidor:', error);
      }
    );
  }

  obtenerPatologias() {
    this.servicio.getPatologias().subscribe(
      response => {
        this.patologias = response;
      },
      error => {
        console.error('GET - Error al obtener patologías:', error);
      }
    );
  }
}

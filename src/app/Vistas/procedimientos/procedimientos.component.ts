import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ComunicationService } from "../../Servicios/comunication.service";

export interface Procedimiento {
  idProcedimiento: number;
  nombrePatologia: string;
  procedimientoNombre: string;
  descripcion: string;
  duracionDias: number;
}

@Component({
  selector: 'app-procedimientos',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './procedimientos.component.html',
  styleUrl: './procedimientos.component.css'
})
export class ProcedimientosComponent {
  constructor(private servicio: ComunicationService) {
    this.obtenerProcedimientos();
  }

  dataSource: Procedimiento[] = [];
  idProcedimiento = 0;
  modalVisible = false;
  tipoModal = 2;
  isReadonly = true;

  // Agregando las variables que faltan
  procedimientoNombre = '';
  duracionDias = 0;

  modificarProcedimiento(index: number, tipodeModal: number) {
    this.tipoModal = tipodeModal;
    this.isReadonly = true;
    const procedimientoSeleccionado = this.dataSource[index];
    this.idProcedimiento = procedimientoSeleccionado.idProcedimiento;
    this.procedimientoNombre = procedimientoSeleccionado.procedimientoNombre;
    this.duracionDias = procedimientoSeleccionado.duracionDias;
    this.modalVisible = true;
    console.log('Se ha presionado el botón de modificar para el elemento en el índice:', this.idProcedimiento);
  }

  eliminarProcedimiento(index: number) {
    const procedimientoSeleccionado = this.dataSource[index];
    // Realizar el delete o update según sea necesario
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);
  }

  guardarCambios() {
    const idProcedimientoElement = (document.getElementById('idProcedimiento') as HTMLInputElement).value.trim();
    const idProcedimiento1 = parseInt(idProcedimientoElement, 10);
    const nombrePatologia1 = (document.getElementById('nombrePatologia') as HTMLInputElement).value;
    const procedimientoNombre1 = (document.getElementById('procedimientoNombre') as HTMLInputElement).value;
    const descripcion1 = (document.getElementById('descripcion') as HTMLTextAreaElement).value;
    const duracionDias1 = parseInt((document.getElementById('duracionDias') as HTMLInputElement).value, 10);

    const datatoSend1 = {
      idProcedimiento: idProcedimiento1,
      nombrePatologia: nombrePatologia1,
      procedimientoNombre: procedimientoNombre1,
      descripcion: descripcion1,
      duracionDias: duracionDias1
    };

    if (this.tipoModal == 1) {
      this.servicio.postProcedimientos(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress', response);
        },
        error => {
          console.error('Error al enviar datos al servidor:', error);
        }
      );
    } else {
      this.servicio.putProcedimientos(datatoSend1.idProcedimiento, datatoSend1).subscribe(
        () => {
          console.log('El procedimiento se actualizó correctamente.');
        },
        error => {
          console.error('Error al actualizar el procedimiento:', error);
        }
      );
    }
  }

  addRegistro(numero: number) {
    this.tipoModal = numero;
    this.idProcedimiento = 0;
    this.procedimientoNombre = '';
    this.duracionDias = 0;
    this.isReadonly = false;
  }

  obtenerProcedimientos() {
    this.servicio.getProcedimientos().subscribe(
      response => {
        console.log('Datos recibidos de posgress', response);
        this.dataSource = response;
      },
      error => {
        console.error('Error al obtener datos del servidor:', error);
      }
    );
  }
}

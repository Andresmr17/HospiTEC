import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgFor } from "@angular/common";
import { FormsModule } from "@angular/forms";

export interface Procedimientos {
  nombreProcedimiento: string;
  recuperacionEnSalon: number;  // Cambié la propiedad aquí
}

@Component({
  selector: 'app-procedimientos',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css']
})
export class ProcedimientosComponent {
  @ViewChild('modalAgregar', { static: false }) modalAgregar!: ElementRef;

  dataSource: Procedimientos[] = [
    {
      nombreProcedimiento: "Procedimiento 1",
      recuperacionEnSalon: 10,  // Asegúrate de que esta propiedad esté presente
    },
    {
      nombreProcedimiento: "Procedimiento 2",
      recuperacionEnSalon: 8,
    },
    {
      nombreProcedimiento: "Procedimiento 3",
      recuperacionEnSalon: 15,
    }
  ];

  nombreProcedimiento = "";
  modalVisible = false;
  tipoModal = 2;
  isReadonly = true;

  modificarRegistro(index: number, tipodeModal: number) {
    this.tipoModal = tipodeModal;
    this.isReadonly = true;
    const procedimientoSeleccionado = this.dataSource[index];
    this.nombreProcedimiento = procedimientoSeleccionado.nombreProcedimiento;
    this.modalVisible = true;
    console.log(' modificar el elemento :', this.nombreProcedimiento);
  }

  eliminarRegistro(index: number) {
    const procedimientoSeleccionado = this.dataSource[index];
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);
  }

  guardarCambios() {
    const nombreProcedimiento1 = (document.getElementById('nombreProcedimiento') as HTMLInputElement).value;
    const recuperacionEnSalon1 = (document.getElementById('recuperacionEnSalon') as HTMLInputElement).value;

    const datatoSend1 = {
      nombreProcedimiento: nombreProcedimiento1,
      recuperacionEnSalon: recuperacionEnSalon1,
    };
    console.log('El nombre del procedimiento es:', datatoSend1.nombreProcedimiento);
  }

  addRegistro(numero: number) {
    this.tipoModal = numero;
    this.nombreProcedimiento = "";
    this.isReadonly = false;
  }

  obtenerReportes() {
    // Método para obtener reportes de procedimientos
  }
}

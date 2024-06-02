import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgFor } from "@angular/common";
import { FormsModule } from "@angular/forms";

export interface Procedimientos {
  nombreProcedimiento: string;
  recuperacionEnSalon: number;
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
      recuperacionEnSalon: 10,
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
  recuperacionEnSalon: number | null = null;
  modalVisible = false;
  tipoModal = 2;
  isReadonly = true;
  indexToEdit: number | null = null;

  modificarRegistro(index: number, tipodeModal: number) {
    this.tipoModal = tipodeModal;
    this.isReadonly = true;
    const procedimientoSeleccionado = this.dataSource[index];
    this.nombreProcedimiento = procedimientoSeleccionado.nombreProcedimiento;
    this.recuperacionEnSalon = procedimientoSeleccionado.recuperacionEnSalon;
    this.modalVisible = true;
    this.indexToEdit = index;
    console.log('Se ha presionado el botón de modificar para el elemento en el índice:', this.nombreProcedimiento);
  }

  eliminarRegistro(index: number) {
    this.dataSource.splice(index, 1);
    console.log('Se ha eliminado el elemento en el índice:', index);
  }

  guardarCambios() {
    if (this.nombreProcedimiento && this.recuperacionEnSalon !== null) {
      const procedimiento = {
        nombreProcedimiento: this.nombreProcedimiento,
        recuperacionEnSalon: this.recuperacionEnSalon,
      };

      if (this.tipoModal === 1) {
        // Añadir nuevo procedimiento
        this.dataSource.push(procedimiento);
      } else if (this.tipoModal === 0 && this.indexToEdit !== null) {
        // Modificar procedimiento existente
        this.dataSource[this.indexToEdit] = procedimiento;
      }

      // Resetear formulario y modal
      this.nombreProcedimiento = "";
      this.recuperacionEnSalon = null;
      this.modalVisible = false;
      this.indexToEdit = null;
      console.log('Cambios guardados:', procedimiento);
    }
  }

  addRegistro(numero: number) {
    this.tipoModal = numero;
    this.nombreProcedimiento = "";
    this.recuperacionEnSalon = null;
    this.isReadonly = false;
  }
}

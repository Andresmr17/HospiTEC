import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface Personal {
  nombre: string;
  apellido1: string;
  apellido2: string;
  cedula: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  fechaContratacion: string;
  tipo: 'Administrativo' | 'Medico' | 'Enfermero' | null;
}

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {
  @ViewChild('modalAgregar', { static: false }) modalAgregar!: ElementRef;

  personal: Personal[] = [
    {
      nombre: "Juan",
      apellido1: "Perez",
      apellido2: "Gomez",
      cedula: "123456789",
      telefono: "987654321",
      direccion: "Calle Falsa 123",
      fechaNacimiento: "1990-01-01",
      fechaContratacion: "2020-01-01",
      tipo: 'Administrativo'
    },
    {
      nombre: "Ana",
      apellido1: "Martinez",
      apellido2: "Lopez",
      cedula: "987654321",
      telefono: "123456789",
      direccion: "Avenida Siempre Viva 456",
      fechaNacimiento: "1985-05-05",
      fechaContratacion: "2019-05-05",
      tipo: "Medico"
    }
    // Añade más empleados aquí
  ];

  tipoPersonal: 'Administrativo' | 'Medico' | null = null;

  nombre = "";
  apellido1 = "";
  apellido2 = "";
  cedula = "";
  telefono = "";
  direccion = "";
  fechaNacimiento = "";
  fechaContratacion = "";
  tipo: 'Administrativo' | 'Medico' | 'Enfermero' | null = null;

  modalVisible = false;
  isReadonly = true;
  indexToEdit: number | null = null;

  mostrarTabla(tipo: 'Administrativo' | 'Medico') {
    this.tipoPersonal = tipo;
  }

  modificarRegistro(index: number) {
    this.isReadonly = true;
    this.indexToEdit = index;

    let empleado = this.personal[index];

    this.nombre = empleado.nombre;
    this.apellido1 = empleado.apellido1;
    this.apellido2 = empleado.apellido2;
    this.cedula = empleado.cedula;
    this.telefono = empleado.telefono;
    this.direccion = empleado.direccion;
    this.fechaNacimiento = empleado.fechaNacimiento;
    this.fechaContratacion = empleado.fechaContratacion;
    this.tipo = empleado.tipo;

    this.modalVisible = true;
  }

  eliminarRegistro(index: number) {
    this.personal.splice(index, 1);
    console.log('Se ha eliminado el elemento en el índice:', index);
  }

  guardarCambios() {
    const empleado = {
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      cedula: this.cedula,
      telefono: this.telefono,
      direccion: this.direccion,
      fechaNacimiento: this.fechaNacimiento,
      fechaContratacion: this.fechaContratacion,
      tipo: this.tipo
    } as Personal;

    if (this.indexToEdit !== null) {
      this.personal[this.indexToEdit] = empleado;
    } else {
      this.personal.push(empleado);
    }

    // Resetear formulario y modal
    this.nombre = "";
    this.apellido1 = "";
    this.apellido2 = "";
    this.cedula = "";
    this.telefono = "";
    this.direccion = "";
    this.fechaNacimiento = "";
    this.fechaContratacion = "";
    this.tipo = null;
    this.modalVisible = false;
    this.indexToEdit = null;
    console.log('Cambios guardados:', empleado);
  }

  addRegistro() {
    this.indexToEdit = null;
    this.nombre = "";
    this.apellido1 = "";
    this.apellido2 = "";
    this.cedula = "";
    this.telefono = "";
    this.direccion = "";
    this.fechaNacimiento = "";
    this.fechaContratacion = "";
    this.tipo = null;
    this.isReadonly = false;
  }
}

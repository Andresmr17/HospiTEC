import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface PersonalAdministrativo {
  nombre: string;
  apellido1: string;
  apellido2: string;
  cedula: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  fechaContratacion: string;
}

interface PersonalMedico extends PersonalAdministrativo {
  tipo: 'medico' | 'enfermero' | null;
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

  personalAdministrativo: PersonalAdministrativo[] = [
    {
      nombre: "Juan",
      apellido1: "Perez",
      apellido2: "Gomez",
      cedula: "123456789",
      telefono: "987654321",
      direccion: "Calle Falsa 123",
      fechaNacimiento: "1990-01-01",
      fechaContratacion: "2020-01-01"
    },
    // Añade más empleados administrativos aquí
  ];

  personalMedico: PersonalMedico[] = [
    {
      nombre: "Ana",
      apellido1: "Martinez",
      apellido2: "Lopez",
      cedula: "987654321",
      telefono: "123456789",
      direccion: "Avenida Siempre Viva 456",
      fechaNacimiento: "1985-05-05",
      fechaContratacion: "2019-05-05",
      tipo: "medico"
    },
    // Añade más empleados médicos aquí
  ];

  tipoPersonal: 'administrativo' | 'medico' = 'administrativo';

  nombre = "";
  apellido1 = "";
  apellido2 = "";
  cedula = "";
  telefono = "";
  direccion = "";
  fechaNacimiento = "";
  fechaContratacion = "";
  tipo: 'medico' | 'enfermero' | null = null;

  modalVisible = false;
  isReadonly = true;
  indexToEdit: number | null = null;

  mostrarTabla(tipo: 'administrativo' | 'medico') {
    this.tipoPersonal = tipo;
  }

  modificarRegistro(index: number, tipo: 'administrativo' | 'medico') {
    this.isReadonly = true;
    this.indexToEdit = index;
    this.tipoPersonal = tipo;
    let empleado: PersonalAdministrativo | PersonalMedico;

    if (tipo === 'administrativo') {
      empleado = this.personalAdministrativo[index];
    } else {
      empleado = this.personalMedico[index];
    }

    this.nombre = empleado.nombre;
    this.apellido1 = empleado.apellido1;
    this.apellido2 = empleado.apellido2;
    this.cedula = empleado.cedula;
    this.telefono = empleado.telefono;
    this.direccion = empleado.direccion;
    this.fechaNacimiento = empleado.fechaNacimiento;
    this.fechaContratacion = empleado.fechaContratacion;

    if (tipo === 'medico') {
      this.tipo = (empleado as PersonalMedico).tipo;
    }

    this.modalVisible = true;
  }

  eliminarRegistro(index: number, tipo: 'administrativo' | 'medico') {
    if (tipo === 'administrativo') {
      this.personalAdministrativo.splice(index, 1);
    } else {
      this.personalMedico.splice(index, 1);
    }
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
      fechaContratacion: this.fechaContratacion
    } as PersonalAdministrativo | PersonalMedico;

    if (this.tipoPersonal === 'medico') {
      (empleado as PersonalMedico).tipo = this.tipo;
    }

    if (this.indexToEdit !== null) {
      if (this.tipoPersonal === 'administrativo') {
        this.personalAdministrativo[this.indexToEdit] = empleado as PersonalAdministrativo;
      } else {
        this.personalMedico[this.indexToEdit] = empleado as PersonalMedico;
      }
    } else {
      if (this.tipoPersonal === 'administrativo') {
        this.personalAdministrativo.push(empleado as PersonalAdministrativo);
      } else {
        this.personalMedico.push(empleado as PersonalMedico);
      }
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

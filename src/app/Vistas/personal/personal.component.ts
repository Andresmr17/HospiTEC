import { Component } from '@angular/core';
import { DatePipe, NgForOf } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ComunicationService } from "../../Servicios/comunication.service";

export interface Personal {
  cedula: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: Date | null;
  direccion: string;
  fechaIngreso: Date | null;
  telefono?: string; // Nuevo campo para el teléfono
}

export interface PersonalTelefono {
  item: number;
  personalCedula: string;
  telefono: string;
}

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent {
  constructor(private servicio: ComunicationService) {
    this.obtenerPersonal();
  }

  dataSource: Personal[] = [];
  cedula = '';
  modalVisible = false;
  tipoModal = 2;
  isReadonly = true;

  // Variables para el formulario
  nombre = '';
  apellido1 = '';
  apellido2 = '';
  fechaNacimiento: Date | null = null;
  direccion = '';
  fechaIngreso: Date | null = null;

  modificarPersonal(index: number, tipoModal: number) {
    this.tipoModal = tipoModal;
    this.isReadonly = true;
    const personalSeleccionado = this.dataSource[index];
    this.cedula = personalSeleccionado.cedula;
    this.nombre = personalSeleccionado.nombre;
    this.apellido1 = personalSeleccionado.apellido1;
    this.apellido2 = personalSeleccionado.apellido2;
    this.fechaNacimiento = personalSeleccionado.fechaNacimiento;
    this.direccion = personalSeleccionado.direccion;
    this.fechaIngreso = personalSeleccionado.fechaIngreso;
    this.modalVisible = true;
    console.log('modificarPersonal:', personalSeleccionado);
  }

  eliminarPersonal(index: number) {
    const personalSeleccionado = this.dataSource[index];
    // Realizar el delete o update según sea necesario
    console.log('eliminarPersonal:', personalSeleccionado);
  }

  guardarCambios() {
    const cedula1 = (document.getElementById('cedula') as HTMLInputElement).value.trim();
    const nombre1 = (document.getElementById('nombre') as HTMLInputElement).value;
    const apellido11 = (document.getElementById('apellido1') as HTMLInputElement).value;
    const apellido21 = (document.getElementById('apellido2') as HTMLInputElement).value;
    const fechaNacimiento1 = (document.getElementById('fechaNacimiento') as HTMLInputElement).value;
    const direccion1 = (document.getElementById('direccion') as HTMLInputElement).value;
    const fechaIngreso1 = (document.getElementById('fechaIngreso') as HTMLInputElement).value;

    const datatoSend1= {
      Cedula: cedula1,
      Nombre: nombre1,
      Apellido1: apellido11,
      Apellido2: apellido21,
      Fechanacimiento: fechaNacimiento1 ? new Date(fechaNacimiento1) : null,
      Direccion: direccion1,
      fechaIngreso: fechaIngreso1 ? new Date(fechaIngreso1) : null
    };

    console.log('guardarCambios - datatoSend1:', datatoSend1);

    if (this.tipoModal === 1) { // Si el tipo de modal es 1 entonces es un post
      console.log('guardarCambios - realizando POST');
      this.servicio.postPersonal(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress en POST:', response);
          this.obtenerPersonal(); // Actualiza la lista después de agregar un personal
        },
        error => {
          console.error('POST - Error al enviar datos al servidor:', error);
        }
      );
    } else { // PUT para cuando hago el update
      console.log('guardarCambios - realizando PUT');
      this.servicio.putPersonal(datatoSend1.Cedula, datatoSend1).subscribe(
        () => {
          console.log('Update PUT - personal se actualizó correctamente.');
          this.obtenerPersonal(); // Actualiza la lista después de modificar un personal
        },
        error => {
          console.error('PUT - Error al actualizar el personal:', error);
        }
      );
    }
  }

  addRegistro(numero: number) {
    this.tipoModal = numero;
    this.cedula = '';
    this.nombre = '';
    this.apellido1 = '';
    this.apellido2 = '';
    this.fechaNacimiento = null;
    this.direccion = '';
    this.fechaIngreso = null;
    this.isReadonly = false;
    this.modalVisible = true;
    console.log('addRegistro - tipoModal:', numero);
  }

  obtenerPersonal() {
    this.servicio.getPersonal().subscribe(
      personalResponse => {
        const personalList: Personal[] = personalResponse;

        this.servicio.getAllPersonalTelefonos().subscribe(
          (telefonosResponse: PersonalTelefono[]) => {
            const telefonosList = telefonosResponse;

            this.dataSource = personalList.map(personal => {
              const telefono = telefonosList.find((t: PersonalTelefono) => t.personalCedula === personal.cedula)?.telefono || 'No disponible';
              return { ...personal, telefono };
            });
          },
          error => {
            console.error('Error al obtener los teléfonos del personal:', error);
          }
        );
      },
      error => {
        console.error('GET - Error al obtener datos del servidor:', error);
      }
    );
  }
}

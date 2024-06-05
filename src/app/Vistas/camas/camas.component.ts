import { Component } from '@angular/core';
import { NgForOf } from "@angular/common";
import { ComunicationService } from "../../Servicios/comunication.service";

export interface Camas {
  idCama: number;
  nombreSalon: string;
  estadoUCI: boolean;
  idEquipo:number;
  nombre:string;
  cantidad:number;
}

export interface Salon {
  nombreSalon: string;
  capacidadCamas: number;
  tipoDeSalon: string;
  numeroDePiso: number;
}

@Component({
  selector: 'app-camas',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './camas.component.html',
  styleUrl: './camas.component.css'
})
export class CamasComponent {
  constructor(private servicio: ComunicationService) { }
  dataSource: Camas[] = [];//aca se guardan los datos solicitados del servidor

  idCama = 0;
  modalVisible = false;
  tipoModal = 2; //me indica el tipo de modal, si es añadido o update
  isReadonly = true; //para habilitar el id

  modificarCamas(index: number, tipodeModal: number) {
    this.tipoModal = tipodeModal;
    this.isReadonly = true;
    const salonSeleccionado = this.dataSource[index];
    this.idCama = salonSeleccionado.idCama;
    this.modalVisible = true;
    console.log('Se ha presionado el botón de modificar para el elemento en el índice:', this.idCama);
  }

  eliminarCama(index: number) {
    const camaSeleccionada = this.dataSource[index];
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);
    // Obtener los salones
    this.servicio.getSalones().subscribe(
      (salones: Salon[]) => {
        // Buscar el salón correspondiente
        const salon = salones.find((salon: Salon) => salon.nombreSalon === camaSeleccionada.nombreSalon);
        if (salon) {
          // Actualizar la capacidad de camas
          salon.capacidadCamas -= 1;
          this.servicio.putSalon(salon.nombreSalon, salon).subscribe(
            response => {
              console.log('Capacidad del salón actualizada:', response);
              // Eliminar la cama después de actualizar el salón
              this.deleteCamaYActualizarDataSource(camaSeleccionada.idCama, index);
            },
            error => {
              console.error('Error al actualizar la capacidad del salón:', error);
              // Maneja el error adecuadamente aquí
            }
          );
        } else {
          // Eliminar la cama directamente si no se encuentra el salón
          this.deleteCamaYActualizarDataSource(camaSeleccionada.idCama, index);
          this.obtenerEquipo();
        }
      },
      error => {
        console.error('Error al obtener los salones:', error);
        // Maneja el error adecuadamente aquí
      }
    );
  }

  private deleteCamaYActualizarDataSource(idCama: number, index: number) {
    this.servicio.deleteCama(idCama).subscribe(
      response => {
        console.log('Cama eliminada:', response);
        this.dataSource.splice(index, 1); // Eliminar el registro del dataSource
        this.obtenerEquipo();
      },
      error => {
        console.error('Error al eliminar la cama:', error);
        // Maneja el error adecuadamente aquí
      }
    );
  }

  guardarCambios() {
    const idCamaElement = (document.getElementById('idCama') as HTMLInputElement).value.trim();
    const idCama1 = parseInt(idCamaElement, 10);
    const nombreSalon1 = (document.getElementById('nombreSalon') as HTMLInputElement).value;
    const esUIC = ((document.getElementById('UIC') as HTMLSelectElement).value === 'true');

    const datatoSend1 = {
      Idcama: idCama1,
      Nombresalon: nombreSalon1,
      Estadouci: esUIC
    }

    if (this.tipoModal == 1) {
      this.servicio.postCamas(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress', response);
          this.obtenerEquipo();
        },
        error => {
          console.error('Error al enviar datos al servidor:', error);
          // Maneja el error adecuadamente aquí
        }
      );
    } else {
      this.servicio.putCamas(datatoSend1.Idcama, datatoSend1)
        .subscribe(
          () => {
            console.log('La cama se actualizó correctamente.');
            this.obtenerEquipo();
          },
          error => {
            console.error('Error al actualizar la cama:', error);
          }
        );
    }
  }
  addRegistro(numero: number) {
    this.tipoModal = numero;
    this.idCama = 0;
    this.isReadonly = false;
  }
  obtenerEquipo() {
    this.servicio.getCamas().subscribe(
      response => {
        console.log('Datos recibidos de posgress', response);
        this.dataSource = response;
      },
      error => {
        console.error('Error al enviar datos al servidor:', error);
      }
    );
  }
}

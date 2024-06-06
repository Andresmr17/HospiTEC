import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ComunicationService} from "../../../../Servicios/Paciente/auth.service";
import {Router} from "@angular/router";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";

interface InformacionType {
  idreservacion: string;
  pacientecedula: string;
  idcama: string;
  idproced: string;
  fechaingreso: string;
  fechasalida: string;
}

interface Procedimiento {
  idProcedimiento: number;
  nombrePatologia: string;
  procedimientoNombre: string;
  descripcion: string;
  duracionDias: number;
}

interface CheckboxProcedimiento {
  descripcion: string;
  duracionDias: number;
  idProcedimiento: number;
  seleccionado: boolean;
}
@Component({
  selector: 'app-gestion-reservacion',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './gestion-reservacion.component.html',
  styleUrl: './gestion-reservacion.component.css'
})

export class GestionReservacionComponent implements OnInit  {

  procedimientos: CheckboxProcedimiento[] = [];
  data: InformacionType[] = [];
  selectedProcedimiento: Procedimiento | null = null;
  fechaingreso: string ="";

  ngOnInit(): void {
    this.obtenerProcedimientos();
  }

  /**
   * @brief esto es para que solo se pueda seleccionar una opcion de los procedimientos
   * @param selectedProcedimiento
   */
  onProcedimientoChange(selectedProcedimiento: CheckboxProcedimiento): void {
    this.procedimientos.forEach(procedimiento => {
      procedimiento.seleccionado = (procedimiento === selectedProcedimiento);
    });
  }

  /**
   * @brief Esto es para obtener los procedimientos que se van a mostrar en los checkbox
   */
  async obtenerProcedimientos(): Promise<void> {
    fetch('https://hospiapi.azurewebsites.net/api/Procedimiento', {
      method: 'GET'
    })
      .then(response => response.json())
      .then((data: Procedimiento[]) => {
        console.log(data);
        this.procedimientos = data.map(item => ({
          descripcion: item.descripcion,
          idProcedimiento: item.idProcedimiento,
          duracionDias: item.duracionDias,
          seleccionado: false
        }));
      })
      .catch(error => {
        console.error('Error al obtener los procedimientos:', error);
      });
  }

  async crearReserva(fechaingreso: string, procedimiento: Procedimiento | null) {
    if (procedimiento) {
      const pacientecedula = this.servicio.getCedulaPaciente();
      const dias = procedimiento.duracionDias;
      const idproced = procedimiento.idProcedimiento;
      const fechaIngreso = new Date(fechaingreso);
      const fechaSalida = new Date(fechaIngreso.getTime() + dias * 24 * 60 * 60 * 1000);
      const fechaSalidaFormateada = fechaSalida.toISOString().split('T')[0];

      const idcama = await this.obtenerCamaDisponible(fechaingreso);
      console.log(idcama)

      if (idcama !== null) {
        const data = JSON.stringify({ pacientecedula, idcama, idproced, fechaingreso, fechaSalida: fechaSalidaFormateada });
        try {
          const response = await fetch('https://hospiapi.azurewebsites.net/api/Reserva', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: data
          });

          if (!response.ok) {
            throw new Error("Algo malo está pasando");
          }
          alert('Reservación hecha con éxito.');


        } catch (error) {
          console.error('Error:', error);
          // Manejar el error, mostrar un mensaje al usuario, etc.
        }
      } else {
        console.error('No hay camas disponibles en la fecha seleccionada.');
        alert('No hay camas disponibles en la fecha seleccionada.');
      }
    } else {
      console.error('No se seleccionó ningún procedimiento');
      alert('No se seleccionó ningún procedimiento.');

    }
  }

  async obtenerCamaDisponible(fechaIngreso: string): Promise<number | null> {

    return fetch(`https://hospiapi.azurewebsites.net/api/Cama/disponibles?fecha=${fechaIngreso}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        return data.idcama;
      });
  }

  constructor(private servicio:ComunicationService, private router: Router) {}

  async OrdenaInformacion(Informacion: InformacionType[]) {
    this.data = Informacion;
  }

  async consultarReservas(): Promise<void> {
    const cedula = this.servicio.getCedulaPaciente();
    fetch(`https://hospiapi.azurewebsites.net/api/Reserva/ObtieneReservas/${cedula}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {

        //console.log(this.Informacion);
        this.OrdenaInformacion(data);
      });
  }

  eliminarReserva(idreservacion: string) {
    fetch(`https://hospiapi.azurewebsites.net/api/Reserva/${idreservacion}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Hubo un problema al eliminar la reserva.');
        }
        // Filtra la reserva eliminada del array de datos
        this.data = this.data.filter(item => item.idreservacion !== idreservacion);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  modificarReserva(idReservacion: string,fechasalida: string, pacientecedula: string, idcama: string, idproced: string, fechaingreso: string): void {
    if (fechasalida) {
      const data = JSON.stringify({ pacientecedula, idcama, idproced, fechaingreso,fechasalida });
      console.log(idReservacion);
      console.log(data);
      fetch(`https://hospiapi.azurewebsites.net/api/Reserva/${idReservacion}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data

      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema al actualizar la reserva.');
          }
          alert('Reservación actualizada con éxito.');
        })
        .catch(error => {
          console.error('Error al actualizar la reservación:', error);
          alert('Hubo un error al actualizar la reservación.');
        });
    }
  }



}

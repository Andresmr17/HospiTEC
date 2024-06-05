import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ComunicationService} from "../../Servicios/comunication.service";

export interface Camas {
  idCama: number;
  nombreSalon: string;
  estadoUCI: boolean;
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
  constructor(private servicio:ComunicationService) {
  }
  dataSource: Camas[] = [
    {
      "idCama": 1,
      "nombreSalon": "Salón A",
      "estadoUCI": true
    },
    {
      "idCama": 2,
      "nombreSalon": "Salón B",
      "estadoUCI": false
    },
    {
      "idCama": 3,
      "nombreSalon": "Salón C",
      "estadoUCI": true
    }
  ];//aca se guardan los datos solicitados del servidor
//variables para determinar si es un udptae o un insert.
  idCama = 0
  modalVisible = false;
  tipoModal = 2; //me indica el tipo de modal, si es añadido o update
  isReadonly = true; //para habilitar el id
  /*metodo que me permite modificar registros
  * por temas de que solo se puede usar un "modal" por componente
  * se utilizara este metodo tamto para modificar como para añadir
  * utilizando el mismo modal*/
  modificarCamas(index: number, tipodeModal: number) {
    this.tipoModal =tipodeModal
    this.isReadonly = true;
    //modificar mas adelante
    const salonSeleccionado = this.dataSource[index];
    this.idCama= salonSeleccionado.idCama;
    //id del profesor
    this.modalVisible = true;
    console.log('Se ha presionado el botón de modificar para el elemento en el índice:', this.idCama);
  }

  //metodo para modificar los registros en base al index
  eliminarCama(index: number) {
    const camaSeleccionada = this.dataSource[index];
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);
    this.servicio.deleteCama(camaSeleccionada.idCama).subscribe(
      response => {
        console.log('Cama eliminada:', response);
        this.dataSource.splice(index, 1); // Eliminar el registro del dataSource
      },
      error => {
        console.error('Error al eliminar la cama:', error);
        // Maneja el error adecuadamente aquí
      }
    );
  }
  guardarCambios() { //metodo para el post o update
    // Aquí puedes acceder a los datos del formulario usando el objeto 'formulario.value'
    const idCamaElement = (document.getElementById('idCama') as HTMLInputElement).value.trim();
    console.log('el id salon antes de parsear es :', idCamaElement);
    const idCama1 = parseInt(idCamaElement, 10);
    console.log('el id salon despues de parsear es :', idCama1);
    const nombreSalon1 = (document.getElementById('nombreSalon') as HTMLInputElement).value;
    const esUIC =((document.getElementById('UIC') as HTMLSelectElement).value === 'true');

    //esta es la data que se va a enviar
    const datatoSend1={
      Idcama: idCama1,
      Nombresalon: nombreSalon1,
      Estadouci: esUIC
    }
    //dependiendo si es 1 o 2 es un get o un post

    console.log('el id salon es :', datatoSend1.Idcama);
    if(this.tipoModal ==1){//si el tipo de modal es 1 entonces es un post
      this.servicio.postCamas(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress', response);
        },
        error => {
          console.error('Error al enviar datos al servidor:', error);
          // Maneja el error adecuadamente aquí
        }
      );
    }
    else{ //si es 0 entonces es un update
      this.servicio.putCamas(datatoSend1.Idcama, datatoSend1)
        .subscribe(
          () => {
            console.log('La cama se actualizó correctamente.');
            // Realizar cualquier otra acción necesaria después de la actualización
          },
          error => {
            console.error('Error al actualizar la cama:', error);
            // Manejar el error adecuadamente
          }
        );
    }
  }
  addRegistro(numero:number){
    this.tipoModal=numero //setea el tipo de modal a un modal de
    this.idCama=0;
    this.isReadonly=false
    //añadido de registros
  }
  obtenerEquipo(){ //Medoto get que obtiene todas las camas.
    this.servicio.getCamas().subscribe(
      response => {
        console.log('Datos recibidos de posgress', response);

        this.dataSource = response; //aca igualo a mi datasource
      },
      error => {
        console.error('Error al enviar datos al servidor:', error);
        // Maneja el error adecuadamente aquí
      }
    );
  }
}

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
  eliminarEquipo(index: number) {
    const equipoSeleccionado = this.dataSource[index]; //obtengo el dato especifco
    //aca se hace el delete o el update
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);

  }
  guardarCambios() {
    // Aquí puedes acceder a los datos del formulario usando el objeto 'formulario.value'
    const idCama1 = (document.getElementById('idCama') as HTMLInputElement).value;
    const nombreSalon1 = (document.getElementById('nombreSalon') as HTMLInputElement).value;
    const esUIC = (document.getElementById('UIC') as HTMLSelectElement).value;
    //esta es la data que se va a enviar
    const datatoSend1={
      idCama: idCama1,
      nombreSalon: nombreSalon1,
      estadoUCI: esUIC
    }
    //dependiendo si es 1 o 2 es un get o un post
    console.log('el id salon es :', datatoSend1.idCama);
  }
  addRegistro(numero:number){
    this.tipoModal=numero //setea el tipo de modal a un modal de
    this.idCama=0;
    this.isReadonly=false
    //añadido de registros
  }
  obtenerEquipo(){ //esto es un get
    this.servicio.getCamas().subscribe(
      response => {
        console.log('Datos recibidos de posgress', response);

        this.dataSource = response;
      },
      error => {
        console.error('Error al enviar datos al servidor:', error);
        // Maneja el error adecuadamente aquí
      }
    );
  }

}

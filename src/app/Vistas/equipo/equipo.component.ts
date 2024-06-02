import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ComunicationService} from "../../Servicios/comunication.service";

export interface Equipo {
  idEquipo: number;
  idCama:number; //va a recibir el id cama pero no lo va a mostrar
  //a menos que sea para el update o el insert
  proveedor: string;
  nombre: string;
  cantidad: number;
}

@Component({
  selector: 'app-equipo',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './equipo.component.html',
  styleUrl: './equipo.component.css'
})
export class EquipoComponent {
  constructor(private servicio:ComunicationService) {
  }
  dataSource: Equipo[] = [


  ];//aca se guardan los datos solicitados del servidor

  idEquipo = 0
  modalVisible = false;
  tipoModal = 2; //me indica el tipo de modal, si es añadido o update
  isReadonly = true; //para habilitar el id
  /*metodo que me permite modificar registros
  * por temas de que solo se puede usar un "modal" por componente
  * se utilizara este metodo tamto para modificar como para añadir
  * utilizando el mismo modal*/
  modificarEquipo(index: number, tipodeModal: number) {
    this.tipoModal =tipodeModal
    this.isReadonly = true;
    //modificar mas adelante
    const salonSeleccionado = this.dataSource[index];
    this.idEquipo= salonSeleccionado.idEquipo;
    //id del profesor
    this.modalVisible = true;
    console.log('Se ha presionado el botón de modificar para el elemento en el índice:', this.idEquipo);

  }

  //metodo para modificar los registros en base al index
  eliminarEquipo(index: number) {
    const equipoSeleccionado = this.dataSource[index]; //obtengo el dato especifco
    //aca se hace el delete o el update
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);

  }
  guardarCambios() {
    // Aquí puedes acceder a los datos del formulario usando el objeto 'formulario.value'
    const idEquipo1 = (document.getElementById('idEquipo') as HTMLInputElement).value;
    const provedor1 = (document.getElementById('proovedor') as HTMLInputElement).value;
    const nombre1 = (document.getElementById('nombre') as HTMLSelectElement).value;
    const cantidad1 = (document.getElementById('cantidad') as HTMLInputElement).value;
    //esta es la data que se va a enviar
    const datatoSend1={
      idEquipo: idEquipo1,
      proovedor: provedor1,
      nombre: nombre1,
      cantidad: cantidad1
    }
    //dependiendo si es 1 o 2 es un get o un post
    console.log('el id salon es :', datatoSend1.idEquipo);
  }
  addRegistro(numero:number){
    this.tipoModal=numero //setea el tipo de modal a un modal de
    this.idEquipo=0;
    this.isReadonly=false
    //añadido de registros
  }
  obtenerEquipo(){ //esto es un get
    this.servicio.getEquipos().subscribe(
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

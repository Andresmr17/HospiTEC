import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

export interface Equipo {
  idEquipo: number;
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
  dataSource: Equipo[] = [
    {
      "idEquipo": 1,
      "proveedor": "Proveedor A",
      "nombre": "Equipo 1",
      "cantidad": 10
    },
    {
      "idEquipo": 2,
      "proveedor": "Proveedor B",
      "nombre": "Equipo 2",
      "cantidad": 15
    },
    {
      "idEquipo": 3,
      "proveedor": "Proveedor C",
      "nombre": "Equipo 3",
      "cantidad": 20
    }

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

  }

}

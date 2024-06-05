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
    const equipoSeleccionado = this.dataSource[index];
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);
    this.servicio.deleteEquipo(equipoSeleccionado.idEquipo).subscribe(
      response => {
        console.log('Equipo eliminado:', response);
        this.dataSource.splice(index, 1); // Eliminar el registro del dataSource
      },
      error => {
        console.error('Error al eliminar el equipo:', error);
        // Maneja el error adecuadamente aquí
      }
    );
  }
  guardarCambios() {
    const idEquipoElement = (document.getElementById('idEquipo') as HTMLInputElement).value.trim();
    const idCamaElement = (document.getElementById('idCama') as HTMLInputElement).value.trim();

    const provedorElement = (document.getElementById('proovedor') as HTMLInputElement).value;
    const nombreElement = (document.getElementById('nombre') as HTMLSelectElement).value;
    const cantidadElement = (document.getElementById('cantidad') as HTMLInputElement).value.trim();

// Mostrar los valores antes de la conversión
    console.log('El ID del equipo antes de la conversión es:', idEquipoElement);
    console.log('El proveedor es:', provedorElement);
    console.log('El nombre es:', nombreElement);
    console.log('La cantidad antes de la conversión es:', cantidadElement);

// Convertir los valores a los tipos de datos correctos
    const idEquipo = parseInt(idEquipoElement, 10);
    const idCama = parseInt(idCamaElement, 10)
    const cantidad = parseInt(cantidadElement, 10);
    //CONSTANTE DE COMO SE VA A ENVIAR AL BACKEND/API
    const datatoSend1={
      Idequipo: idEquipo,
      Idcama: idCama,
      Proveedor: provedorElement,
      Nombre: nombreElement,
      Cantidad:cantidad
    }
    //dependiendo si es 1 o 2 es un get o un post
    console.log('el id salon es :', datatoSend1.Idequipo);
    console.log('el id cama es :', datatoSend1.Idcama);
    if(this.tipoModal ==1){//si el tipo de modal es 1 entonces es un post
      this.servicio. postEquipos(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress', response);
          this.obtenerEquipo();
        },
        error => {
          console.error('Error al enviar datos al servidor:', error);
          // Maneja el error adecuadamente aquí
        }
      );
    }
    else{ //si no es un post, es un put
      this.servicio.putEquipos(datatoSend1.Idequipo, datatoSend1)
        .subscribe(
          () => {
            console.log('La cama se actualizó correctamente.');
            this.obtenerEquipo();
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
    this.tipoModal=numero //setea el tipo de modal a un modal de insert
    this.idEquipo=0;
    this.isReadonly=false
    //añadido de registros
  }
  obtenerEquipo(){ //esto es un get del equipo médico
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

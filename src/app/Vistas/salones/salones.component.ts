import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgFor} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";
import {ComunicationService} from "../../Servicios/comunication.service";

export interface Registros {
  nombreSalon: string;
  capacidadCamas: number;
  tipoDeSalon: string;
  numeroDePiso: number
}
@Component({
  selector: 'app-salones',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './salones.component.html',
  styleUrl: './salones.component.css'
})
export class SalonesComponent {
  //en el datasource se va a guardar la informacion solicitada del
  //servidor
  constructor(private servicio:ComunicationService) {
  }
  @ViewChild('modalAgregar', {static: false}) modalAgregar!: ElementRef;

  dataSource: Registros[] = [

  ];//aca se guardan los datos solicitados del servidor
  //titulos para las columnas;
  //metodo para modificar los registros en base al index
  nombreSalon = ""
  modalVisible = false;
  tipoModal = 2; //me indica el tipo de modal, si es añadido o update
  isReadonly = true; //para habilitar el id
  /*metodo que me permite modificar registros
  * por temas de que solo se puede usar un "modal" por componente
  * se utilizara este metodo tamto para modificar como para añadir
  * utilizando el mismo modal*/
  modificarRegistro(index: number, tipodeModal: number) {
    this.tipoModal =tipodeModal
    this.isReadonly = true;
    //modificar mas adelante
    const salonSeleccionado = this.dataSource[index];
    this.nombreSalon= salonSeleccionado.nombreSalon;
    //id del profesor
    this.modalVisible = true;
    console.log('Se ha presionado el botón de modificar para el elemento en el índice:', this.nombreSalon);

  }

  //metodo para modificar los registros en base al index
  eliminarRegistro(index: number) {
    const salonSeleccionado = this.dataSource[index];
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);
    this.servicio.deleteSalon(salonSeleccionado.nombreSalon).subscribe(
      response => {
        console.log('Salón eliminado:', response);
        // Eliminar el registro del dataSource
        this.dataSource.splice(index, 1);
      },
      error => {
        console.error('Error al eliminar el salón:', error);
        // Maneja el error adecuadamente aquí
      }
    );
  }
  guardarCambios() {
    // Aquí puedes acceder a los datos del formulario usando el objeto 'formulario.value'
    const nombreSalon1 = (document.getElementById('nombreSalon') as HTMLInputElement).value;
    const capacidadCamas1 = (document.getElementById('capacidadCamas') as HTMLInputElement).value;
    const tipoMedicina1 = (document.getElementById('tipoMedicina') as HTMLSelectElement).value;
    const numeroPiso1 = (document.getElementById('numeroPiso') as HTMLInputElement).value;
    //esta es la data que se va a enviar
    const capacidadCama = parseInt(capacidadCamas1, 10);
    const numeroPiso = parseInt(numeroPiso1, 10)

    const datatoSend1={
      nombreSalon: nombreSalon1,
      capacidadCamas: capacidadCama,
      Tipodesalon: tipoMedicina1,
      numeroDePiso: numeroPiso
    } // todo igual a los modelos
    console.log('el tipo de salon es :', datatoSend1.Tipodesalon);
    if(this.tipoModal ==1){//si el tipo de modal es 1 entonces es un post
      this.servicio. postSalones(datatoSend1).subscribe(
        response => {
          console.log('Datos enviados a posgress', response);
        },
        error => {
          console.error('Error al enviar datos al servidor:', error);
          // Maneja el error adecuadamente aquí
        }
      );
    }
    else{ //si no es un post, es un put
      this.servicio.putSalon(datatoSend1.nombreSalon, datatoSend1)
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
    this.nombreSalon="";
    this.isReadonly=false
    //añadido de registros
  }
  obtenerReportes(){
    this.servicio.getSalones().subscribe(
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

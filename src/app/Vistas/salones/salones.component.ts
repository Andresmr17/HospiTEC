import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgFor} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";

export interface Registros {
  nombreSalon: string;
  capacidadCamas: number;
  tipoSalon: string;
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
  @ViewChild('modalAgregar', {static: false}) modalAgregar!: ElementRef;

  dataSource: Registros[] = [
    {
      "nombreSalon": "Sala 1",
      "capacidadCamas": 10,
      "tipoSalon": "General",
      "numeroDePiso": 1
    },
    {
      "nombreSalon": "Sala 2",
      "capacidadCamas": 8,
      "tipoSalon": "UCI",
      "numeroDePiso": 2
    },
    {
      "nombreSalon": "Sala 3",
      "capacidadCamas": 15,
      "tipoSalon": "General",
      "numeroDePiso": 1
    }
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
    const salonSeleccionado = this.dataSource[index]; //obtengo el dato especifco
    //aca se hace el delete o el update
    console.log('Se ha presionado el botón de eliminar para el elemento en el índice:', index);

  }
  guardarCambios() {
    // Aquí puedes acceder a los datos del formulario usando el objeto 'formulario.value'
    const nombreSalon1 = (document.getElementById('nombreSalon') as HTMLInputElement).value;
    const capacidadCamas1 = (document.getElementById('capacidadCamas') as HTMLInputElement).value;
    const tipoMedicina1 = (document.getElementById('tipoMedicina') as HTMLSelectElement).value;
    const numeroPiso1 = (document.getElementById('numeroPiso') as HTMLInputElement).value;
    //esta es la data que se va a enviar
    const datatoSend1={
      nombreSalon: nombreSalon1,
      capacidadCamas: capacidadCamas1,
      tipoSalon: tipoMedicina1,
      numeroDePiso: numeroPiso1
    }
    console.log('el id salon es :', datatoSend1.nombreSalon);
  }
  addRegistro(numero:number){
    this.tipoModal=numero //setea el tipo de modal a un modal de
    this.nombreSalon="";
    this.isReadonly=false
    //añadido de registros
  }
  obtenerReportes(){

  }

}

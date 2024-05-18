import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent  {
  Nombre: string ="";
  Apellidos: string ="";
  Cedula: string ="";
  Telefono: string ="";
  Direccion: string ="";
  Fecha: string ="";
  Patologias: string ="";


  crearCuenta(Nombre: string, Apellidos: string, Cedula: string, Telefono: string, Direccion: string, Fecha: string, Patologias: string) {
    const data = JSON.stringify({Nombre, Apellidos, Cedula, Telefono, Direccion, Fecha, Patologias});
    console.log(data);
  }
}

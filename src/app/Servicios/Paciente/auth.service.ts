import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private servidorURL = 'http://localhost:5276/api';

  private Info: string[] = [];
  private Cedula = "";
  private Nombre = "";
  private Correo = "";

  //metodos para setear y almacenar el id.
  public getNombrePaciente(): string {
    return this.Nombre;
  }

  public getCedulaPaciente(): string {
    return this.Cedula;
  }

  public getCorreoPaciente(): string {
    return this.Correo;
  }

  public setInformacionPaciente(Informacion: string): void {
    this.Info = Informacion.split(" ")
    this.setNombrePaciente(this.Info[0] + " " + this.Info[1]);
    this.setCedula(this.Info[2]);
    this.setCorreo(this.Info[3]);

  }

  public setNombrePaciente(nombre: string): void {
    this.Nombre = nombre;
    //console.log("Este es el nombre guardado " + this.Nombre);
  }

  public setCedula(cedula: string): void {
    this.Cedula = cedula;
    //console.log("Este es la cedula guardada " + this.Cedula);
  }

  public setCorreo(correo: string): void {
    this.Correo = correo;
    //console.log("Este es el correo guardado " + this.Correo);
  }



}


import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private servidorURL = 'http://localhost:5276/api';
  private usuarioId = ""; //se almacena el id del operador
  //metodos para setear y almacenar el id.
  public getUsuarioId(): string {
    return this.usuarioId;
  }

  public setUsuarioId(id: string): void {
    this.usuarioId = id;
  }

  constructor(private http: HttpClient) {}
  //obtiene los reportes de este usuario

  //COMPLETADA------
  getReportes(username:string): Observable<any> {//idOperador es como lo tengo en la bd
    //DEBE DE SER EXACTAMENTE IGUAL EN LA API
    return this.http.get<any>(`${this.servidorURL}/ReportesOperadores/getReportes?idOperador=${username}`);
  }
  //obtiene los activos de este usuario.


  //COMPLETADA------------
  getActivos(): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/Activos/activosDisponibles`);
  }
  //metodo que obtiene los activos por aprobar por el operador.
  getaprobarSolicitud(username:string): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/getsolAprob?username=${username}`);
  }
  //COMPLETADA****
  verifyLogin(Correo: string , Contrasena: string): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/Loginop/verificarLogin?correo=${Correo}&contrasena=${Contrasena}`);
  }
  //metodo del servicio que le envia la información del usuario y la contraseña
  //y verifica si es correcta

  //POST****************************************************************

  //solicitud reserva activos estudiantes.
  solicitarReserva(reservaEdata: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Prestamos`, reservaEdata,httpOptions);
  }
  //solicitud reserva para profesores
  solicitarReservaP(reservaPdata: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Prestamos`, reservaPdata,httpOptions);
  }
  registrarse(registrarsedata: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Operadores`, registrarsedata,httpOptions);
  }
  Averias(averiadata: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/averias`, averiadata,httpOptions);
  }
  logout(logoutData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/SesionesOperador`, logoutData,httpOptions);
  }
}

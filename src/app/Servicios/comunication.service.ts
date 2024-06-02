
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private servidorURL = 'http://localhost:5276/api';

  //metodos para setear y almacenar el id.




  constructor(private http: HttpClient) {}
  //obtiene los reportes de este usuario

  //Para la VISTA CAMAS------
  getCamas(): Observable<any> {//idOperador es como lo tengo en la bd
    //DEBE DE SER EXACTAMENTE IGUAL EN LA API
    return this.http.get<any>(`${this.servidorURL}/Cama`);
  }

  //metodo para actualizar la información de las camas
  postCamas(camasData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Cama`, camasData,httpOptions);
  }
  //Metodo para actualizar las camas
  putCamas(idCama: number, camaData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.servidorURL}/Cama/${idCama}`, camaData, httpOptions);
  }


  //FIN VISTA CAMAS------------
  //Para la VISTA EQUIPO MEDICO------
  getEquipos(): Observable<any> {
    //DEBE DE SER EXACTAMENTE IGUAL EN LA API la estructura que pide
    return this.http.get<any>(`${this.servidorURL}/Equipo`);
  }
  //FIN VISTA CAMAS -------------------------
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

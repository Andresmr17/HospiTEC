
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  //post para un nuevo equipo
  postEquipos(equipoData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Equipo`, equipoData,httpOptions);
  }
  //put para los equipos
  putEquipos(idEquipo: number, equipoData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.servidorURL}/Equipo/${idEquipo}`, equipoData, httpOptions);
  }

  //FIN VISTA CAMAS -------------------------
  //INICIO VISTA SALONES -------------------------

  getSalones(): Observable<any> {
    //DEBE DE SER EXACTAMENTE IGUAL EN LA API la estructura que pide
    return this.http.get<any>(`${this.servidorURL}/Salon`);
  }
  postSalones(equipoData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Salon`, equipoData,httpOptions);
  }
  putSalon(nombreSalon: string, equipoData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.servidorURL}/Salon/${nombreSalon}`, equipoData, httpOptions);
  }

  //FIN VISTA SALONES -------------------------

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



  //#####################################################
  //PARA PROCEDIMIENTOS
  getProcedimientos(): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/Procedimiento`);
  }

  postProcedimientos(procedimientoData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Procedimiento`, procedimientoData, httpOptions);
  }

  putProcedimientos(idProcedimiento: number, procedimientoData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.servidorURL}/Procedimiento/${idProcedimiento}`, procedimientoData, httpOptions);
  }

  // FIN PROCEDIMIENTOS
  //##################################################################



  //#####################################################
  //PARA PERSONAL

  getPersonal(): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/Personal`);
  }

  postPersonal(personalData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Personal`, personalData, httpOptions);
  }

  putPersonal(idPersonal: string, personalData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.servidorURL}/Personal/${idPersonal}`, personalData, httpOptions);
  }


  // FIN PERSONAL
  //##################################################################





  //#####################################################
  //PARA ROL PERSONAL

  getAllRoles(): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/Rol`);
  }

  getRol(idRol: number): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/Rol/${idRol}`);
  }
  postRol(rolData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Rol`, rolData, httpOptions);
  }

  putRol(idRol: number, rolData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.servidorURL}/Rol/${idRol}`, rolData, httpOptions);
  }

  deleteRol(idRol: number): Observable<any> {
    return this.http.delete<any>(`${this.servidorURL}/Rol/${idRol}`);
  }



  // FIN ROL PERSONAL
  //##################################################################



  //#####################################################
  //PARA TELEFONO PERSONAL
  // Métodos para gestionar PersonalTelefono
  getAllPersonalTelefonos(): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/PersonalTelefono`);
  }


  getPersonalTelefonoByCedula(personalCedula: string): Observable<any> {
    return this.http.get<any>(`${this.servidorURL}/PersonalTelefono/personal/${personalCedula}`);
  }

  postPersonalTelefono(personalTelefonoData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/PersonalTelefono`, personalTelefonoData, httpOptions);
  }

  putPersonalTelefono(item: number, personalTelefonoData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${this.servidorURL}/PersonalTelefono/${item}`, personalTelefonoData, httpOptions);
  }

  deletePersonalTelefono(item: number): Observable<any> {
    return this.http.delete<any>(`${this.servidorURL}/PersonalTelefono/${item}`);
  }
  // FIN TELEFONO PERSONAL
  //##################################################################


  //PARA VISTA DOCTOR
  //########################################################################

  postPaciente(pacienteData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(`${this.servidorURL}/Paciente`, pacienteData,httpOptions);
  }
  searchPatients(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.servidorURL}/Paciente/${term}`).pipe(
      map(response => Array.isArray(response) ? response : [response])
    );
  }

  submitProcedure(procedureData: any): Observable<any> {
    return this.http.post<any>(`${this.servidorURL}/Historial/sp`, procedureData);
  }

  getProcedures(): Observable<any[]> {
    return this.http.get<any[]>(`${this.servidorURL}/Procedimiento`);
  }

  getTreatments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.servidorURL}/Tratamiento`);
  }


}

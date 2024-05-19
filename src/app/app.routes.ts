import { Routes } from '@angular/router';
import {LoginComponent} from "./Vistas/vista-paciente/login/login.component";
import {CrearCuentaComponent} from "./Vistas/vista-paciente/crear-cuenta/crear-cuenta.component";
import {PacienteMenuComponent} from "./Vistas/vista-paciente/paciente-menu/paciente-menu.component";
import {
  HistorialClinicoComponent
} from "./Vistas/vista-paciente/paciente-menu/historial-clinico/historial-clinico.component";
import {
  GestionReservacionComponent
} from "./Vistas/vista-paciente/paciente-menu/gestion-reservacion/gestion-reservacion.component";
import {
  EvaluacionServicioComponent
} from "./Vistas/vista-paciente/paciente-menu/evaluacion-servicio/evaluacion-servicio.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'crear-cuenta', component: CrearCuentaComponent},
  {path: 'paciente-menu', component: PacienteMenuComponent,
    children:[{path: 'historial-clinico',component: HistorialClinicoComponent},
      {path:'gestion-reservacion',component:GestionReservacionComponent},
      {path:'evaluacion-servicio',component: EvaluacionServicioComponent}]},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

import { Routes } from '@angular/router';
import {LoginComponent} from "./Vistas/vista-paciente/login/login.component";
import {CrearCuentaComponent} from "./Vistas/vista-paciente/crear-cuenta/crear-cuenta.component";
import {PacienteMenuComponent} from "./Vistas/vista-paciente/paciente-menu/paciente-menu.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'crear-cuenta', component: CrearCuentaComponent},
  {path: 'paciente-menu', component: PacienteMenuComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

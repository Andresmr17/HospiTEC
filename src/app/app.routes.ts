import { Routes } from '@angular/router';
import {LoginComponent} from "./Vistas/login/login.component";
import {SidenavComponent} from "./Vistas/sidenav/sidenav.component";
import {SalonesComponent} from "./Vistas/salones/salones.component";
import {EquipoComponent} from "./Vistas/equipo/equipo.component";
import {CamasComponent} from "./Vistas/camas/camas.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'sidenav', component: SidenavComponent,
    children:[
      {path: 'salones',component: SalonesComponent},
      {path: 'equipo',component: EquipoComponent},
      {path: 'camas',component: CamasComponent}
    ]},

];
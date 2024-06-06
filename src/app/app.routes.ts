import { Routes } from '@angular/router';
import {LoginComponent} from "./Vistas/vista-paciente/login/login.component";
import {MainDoctorComponent} from "./Vistas/main-doctor/main-doctor.component";
import {AddPatientComponent} from "./Vistas/add-patient/add-patient.component";
import {HistoryComponent} from "./Vistas/history/history.component";
import { SidenavComponent } from "./Vistas/sidenav/sidenav.component";
import { SalonesComponent } from "./Vistas/salones/salones.component";
import { EquipoComponent } from "./Vistas/equipo/equipo.component";
import { CamasComponent } from "./Vistas/camas/camas.component";
import { ProcedimientosComponent } from "./Vistas/procedimientos/procedimientos.component";
import { PersonalComponent } from "./Vistas/personal/personal.component";
import { ReportesComponent } from "./Vistas/reportes/reportes.component";
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
import {CargaPacientesComponent} from "./Vistas/carga-pacientes/carga-pacientes.component";
import {AddPathologiesComponent} from "./Vistas/add-pathologies/add-pathologies.component";
import {InicioComponent} from "./Vistas/inicio/inicio.component";


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
    {path: 'crear-cuenta', component: CrearCuentaComponent},
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'sidenav', component: SidenavComponent,
    children: [
      { path: 'salones', component: SalonesComponent },
      { path: 'equipo', component: EquipoComponent },
      { path: 'camas', component: CamasComponent },
      { path: 'procedimientos', component: ProcedimientosComponent },
      { path: 'personal', component: PersonalComponent },
      { path: 'reportes', component: ReportesComponent },
      { path: 'carga', component: CargaPacientesComponent }
    ]
  },
  {path: 'mainDoctor', component: MainDoctorComponent,
    children: [
      {path: 'nuevoPaciente', component: AddPatientComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'pathology', component: AddPathologiesComponent}
    ]
  },
  {path: 'login-paciente', component: LoginComponent},
  {path: 'crear-cuenta', component: CrearCuentaComponent},
  {path: 'paciente-menu', component: PacienteMenuComponent,
    children:[{path: 'historial-clinico',component: HistorialClinicoComponent},
      {path:'gestion-reservacion',component:GestionReservacionComponent},
      {path:'evaluacion-servicio',component: EvaluacionServicioComponent}]},
  {path: '', redirectTo: 'login-paciente', pathMatch: 'full'}
];


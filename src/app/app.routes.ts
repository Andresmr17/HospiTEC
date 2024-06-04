import { Routes } from '@angular/router';
import {LoginComponent} from "./Vistas/login/login.component";
import {MainDoctorComponent} from "./Vistas/main-doctor/main-doctor.component";
import {AddPatientComponent} from "./Vistas/add-patient/add-patient.component";
import {HistoryComponent} from "./history/history.component";
import {SidenavComponent} from "./Vistas/sidenav/sidenav.component";
import {SalonesComponent} from "./Vistas/salones/salones.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'mainDoctor', component: MainDoctorComponent},
  {path: 'addPatient', component: AddPatientComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'sidenav', component: SidenavComponent,
    children:[{path: 'salones',component: SalonesComponent},
    ]},
];

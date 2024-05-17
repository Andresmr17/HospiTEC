import { Routes } from '@angular/router';
import {LoginComponent} from "./Vistas/login/login.component";
import {MainDoctorComponent} from "./main-doctor/main-doctor.component";
import {AddPatientComponent} from "./add-patient/add-patient.component";
import {HistoryComponent} from "./history/history.component";

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'mainDoctor', component: MainDoctorComponent},
  {path: 'addPatient', component: AddPatientComponent},
  {path: 'history', component: HistoryComponent}
];

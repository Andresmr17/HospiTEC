import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddPatientComponent} from "../add-patient/add-patient.component";


@Component({
  selector: 'app-main-doctor',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink, AddPatientComponent,CommonModule
  ],
  templateUrl: './main-doctor.component.html',
  styleUrl: './main-doctor.component.css'
})
export class MainDoctorComponent {

  showAddPatientForm: boolean = false;
  constructor() {
  }
  toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.toggle("expand");
    }
  }
  showForm(){

  }
}

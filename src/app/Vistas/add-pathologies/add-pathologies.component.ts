import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgModule } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {NgFor} from "@angular/common";
import {ComunicationService} from "../../Servicios/comunication.service";

@Component({
  selector: 'app-add-pathologies',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-pathologies.component.html',
  styleUrl: '../history/history.component.css'
})
export class AddPathologiesComponent {
  searchTerm: string = '';
  patients: any[] = [];
  searchExecuted: boolean = false;
  procedures: any[] = [];
  treatments: any[] = [];
  submissionStatus: { [key: string]: string } = {};

  constructor(private service: ComunicationService) {
  }

  ngOnInit() {
    this.loadProcedures();
    this.loadTreatments();
  }

  loadProcedures() {
    this.service.getProcedures().subscribe(procedures => {
      this.procedures = procedures;
      console.log(procedures)
    }, error => {
      console.error('Error fetching procedures', error);
    });
  }

  loadTreatments() {

    this.service.getTreatments().subscribe(treatments => {
      this.treatments = treatments;
    }, error => {
      console.error('Error fetching treatments', error);
    });
  }
  onSearch() {
    this.searchExecuted = false;
    this.submissionStatus = {};
    if (this.searchTerm) {
      this.service.searchPatients(this.searchTerm)
        .subscribe(response => {
          this.patients = response;
          this.searchExecuted = true;
        }, error => {
          console.error('Error fetching patients', error);
          this.patients = [];
          this.searchExecuted = true;
        });
    }
  }
  onSubmitProcedure(patient: any) {
    const procedureData = {
      nombreProcedimiento: patient.procedure,
      nombreTratamiento: patient.treatment,
      fechaProcedimiento: patient.date,
      pacienteCedula: patient.cedula
    };
    console.log(procedureData)
    this.service.submitProcedure(procedureData).subscribe(response => {
      console.log('Procedure submitted successfully', response);
      // Optionally, reset the form fields after successful submission
      this.submissionStatus[patient.cedula] = 'success';
      patient.procedure = '';
      patient.treatment = '';
      patient.date = '';
    }, error => {
      console.error('Error submitting procedure', error);
      this.submissionStatus[patient.cedula] = 'error';
    });
  }
}

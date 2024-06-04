// new-patient-form.component.ts

import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  standalone: true,
  styleUrls: ['./add-patient.component.css'],
  imports: [FormsModule, NgClass]
})
export class AddPatientComponent {
  patient: any = {}; // Object to store form data

  constructor() { }

  submitForm(form: any) {
    if (form.valid) {
      // Handle form submission logic here, such as saving the patient data
      console.log('Form submitted:', this.patient);
      // Reset the form after submission
      form.resetForm();
      // Optionally, navigate to another route or perform any other action
    } else {
      // Form is invalid, display validation errors or handle accordingly
    }
  }

  protected readonly FormData = FormData;
}


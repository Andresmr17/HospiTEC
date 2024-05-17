import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-doctor',
  standalone: true,
  imports: [],
  templateUrl: './main-doctor.component.html',
  styleUrl: './main-doctor.component.css'
})
export class MainDoctorComponent {
  constructor(private router: Router) {}
  navigateToOther(where: number) {
    if(where == 1){
      this.router.navigate(['/addPatient']);
    }
    else{this.router.navigate(['/history']);}


  }
}

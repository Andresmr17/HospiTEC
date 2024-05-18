import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-paciente-menu',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './paciente-menu.component.html',
  styleUrl: './paciente-menu.component.css'
})
export class PacienteMenuComponent {

}

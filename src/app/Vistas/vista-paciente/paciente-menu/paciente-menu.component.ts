import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
import {ComunicationService} from "../../../Servicios/Paciente/auth.service";

@Component({
  selector: 'app-paciente-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink
  ],
  templateUrl: './paciente-menu.component.html',
  styleUrl: './paciente-menu.component.css'
})
export class PacienteMenuComponent {

  Nombre = this.servicio.getNombrePaciente();

  isExpanded: boolean = true;

  toggleContainerWidth(event: Event) {
    this.isExpanded = !(event.target as HTMLInputElement).checked;
  }

  constructor(private servicio:ComunicationService, private router: Router) {}
  
}

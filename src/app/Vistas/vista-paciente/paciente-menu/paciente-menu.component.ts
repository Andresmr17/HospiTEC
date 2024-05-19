import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";

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

  isExpanded: boolean = true;

  toggleContainerWidth(event: Event) {
    this.isExpanded = !(event.target as HTMLInputElement).checked;
  }

}

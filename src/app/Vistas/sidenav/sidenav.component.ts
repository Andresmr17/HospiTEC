import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgClass} from "@angular/common";
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  constructor(private router: Router) {
  }

  toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.toggle("expand");
    }
  }
}

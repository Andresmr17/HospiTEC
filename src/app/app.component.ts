import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from "./Vistas/login/login.component";
import {SidenavComponent} from "./Vistas/sidenav/sidenav.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {CamasComponent} from "./Vistas/camas/camas.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent,SidenavComponent, CommonModule, FormsModule,HttpClientModule
  , CamasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HospiTEC';
}

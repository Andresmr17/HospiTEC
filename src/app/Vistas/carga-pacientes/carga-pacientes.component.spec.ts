import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaPacientesComponent } from './carga-pacientes.component';

describe('CargaPacientesComponent', () => {
  let component: CargaPacientesComponent;
  let fixture: ComponentFixture<CargaPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargaPacientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CargaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

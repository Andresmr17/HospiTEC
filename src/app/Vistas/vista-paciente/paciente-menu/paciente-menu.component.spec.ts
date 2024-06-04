import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacienteMenuComponent } from './paciente-menu.component';

describe('PacienteMenuComponent', () => {
  let component: PacienteMenuComponent;
  let fixture: ComponentFixture<PacienteMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacienteMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacienteMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

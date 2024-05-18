import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionServicioComponent } from './evaluacion-servicio.component';

describe('EvaluacionServicioComponent', () => {
  let component: EvaluacionServicioComponent;
  let fixture: ComponentFixture<EvaluacionServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionServicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

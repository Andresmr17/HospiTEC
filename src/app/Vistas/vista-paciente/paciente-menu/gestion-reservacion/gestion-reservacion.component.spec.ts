import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionReservacionComponent } from './gestion-reservacion.component';

describe('GestionReservacionComponent', () => {
  let component: GestionReservacionComponent;
  let fixture: ComponentFixture<GestionReservacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionReservacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionReservacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

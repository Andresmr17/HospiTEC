import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPathologiesComponent } from './add-pathologies.component';

describe('AddPathologiesComponent', () => {
  let component: AddPathologiesComponent;
  let fixture: ComponentFixture<AddPathologiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPathologiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPathologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

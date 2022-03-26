import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionesIngresarComponent } from './observaciones-ingresar.component';

describe('ObservacionesIngresarComponent', () => {
  let component: ObservacionesIngresarComponent;
  let fixture: ComponentFixture<ObservacionesIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservacionesIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

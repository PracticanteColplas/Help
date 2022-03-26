import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionesMostrarComponent } from './observaciones-mostrar.component';

describe('ObservacionesMostrarComponent', () => {
  let component: ObservacionesMostrarComponent;
  let fixture: ComponentFixture<ObservacionesMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservacionesMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

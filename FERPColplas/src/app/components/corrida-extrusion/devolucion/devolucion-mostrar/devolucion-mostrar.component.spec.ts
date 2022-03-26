import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionMostrarComponent } from './devolucion-mostrar.component';

describe('DevolucionMostrarComponent', () => {
  let component: DevolucionMostrarComponent;
  let fixture: ComponentFixture<DevolucionMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionIngresarComponent } from './devolucion-ingresar.component';

describe('DevolucionIngresarComponent', () => {
  let component: DevolucionIngresarComponent;
  let fixture: ComponentFixture<DevolucionIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

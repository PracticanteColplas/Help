import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSalidaIngresarComponent } from './material-salida-ingresar.component';

describe('MaterialSalidaIngresarComponent', () => {
  let component: MaterialSalidaIngresarComponent;
  let fixture: ComponentFixture<MaterialSalidaIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSalidaIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSalidaIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroSalidaProduccionComponent } from './registro-salida-produccion.component';

describe('RegistroSalidaProduccionComponent', () => {
  let component: RegistroSalidaProduccionComponent;
  let fixture: ComponentFixture<RegistroSalidaProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroSalidaProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroSalidaProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

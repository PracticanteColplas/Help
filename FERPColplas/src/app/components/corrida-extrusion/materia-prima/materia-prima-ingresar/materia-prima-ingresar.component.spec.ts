import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaPrimaIngresarComponent } from './materia-prima-ingresar.component';

describe('MateriaPrimaIngresarComponent', () => {
  let component: MateriaPrimaIngresarComponent;
  let fixture: ComponentFixture<MateriaPrimaIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaPrimaIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaPrimaIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

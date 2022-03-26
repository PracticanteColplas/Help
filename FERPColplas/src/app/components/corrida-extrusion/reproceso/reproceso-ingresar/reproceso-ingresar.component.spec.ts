import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocesoIngresarComponent } from './reproceso-ingresar.component';

describe('ReprocesoIngresarComponent', () => {
  let component: ReprocesoIngresarComponent;
  let fixture: ComponentFixture<ReprocesoIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocesoIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprocesoIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocesoMostrarComponent } from './reproceso-mostrar.component';

describe('ReprocesoMostrarComponent', () => {
  let component: ReprocesoMostrarComponent;
  let fixture: ComponentFixture<ReprocesoMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocesoMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprocesoMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

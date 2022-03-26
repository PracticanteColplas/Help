import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaExtrusionInicioComponent } from './corrida-extrusion-inicio.component';

describe('CorridaExtrusionInicioComponent', () => {
  let component: CorridaExtrusionInicioComponent;
  let fixture: ComponentFixture<CorridaExtrusionInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorridaExtrusionInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaExtrusionInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

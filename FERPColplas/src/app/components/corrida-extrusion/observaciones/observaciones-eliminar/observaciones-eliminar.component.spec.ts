import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionesEliminarComponent } from './observaciones-eliminar.component';

describe('ObservacionesEliminarComponent', () => {
  let component: ObservacionesEliminarComponent;
  let fixture: ComponentFixture<ObservacionesEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservacionesEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

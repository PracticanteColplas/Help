import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionesEditarComponent } from './observaciones-editar.component';

describe('ObservacionesEditarComponent', () => {
  let component: ObservacionesEditarComponent;
  let fixture: ComponentFixture<ObservacionesEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservacionesEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

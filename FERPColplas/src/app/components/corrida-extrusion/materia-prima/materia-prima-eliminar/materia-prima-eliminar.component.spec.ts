import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaPrimaEliminarComponent } from './materia-prima-eliminar.component';

describe('MateriaPrimaEliminarComponent', () => {
  let component: MateriaPrimaEliminarComponent;
  let fixture: ComponentFixture<MateriaPrimaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaPrimaEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaPrimaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

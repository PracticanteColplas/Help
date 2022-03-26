import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaPrimaMostrarComponent } from './materia-prima-mostrar.component';

describe('MateriaPrimaMostrarComponent', () => {
  let component: MateriaPrimaMostrarComponent;
  let fixture: ComponentFixture<MateriaPrimaMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaPrimaMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaPrimaMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

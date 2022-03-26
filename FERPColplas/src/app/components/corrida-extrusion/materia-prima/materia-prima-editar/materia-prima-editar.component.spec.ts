import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaPrimaEditarComponent } from './materia-prima-editar.component';

describe('MateriaPrimaEditarComponent', () => {
  let component: MateriaPrimaEditarComponent;
  let fixture: ComponentFixture<MateriaPrimaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaPrimaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaPrimaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaPrimaPrincipalComponent } from './materia-prima-principal.component';

describe('MateriaPrimaPrincipalComponent', () => {
  let component: MateriaPrimaPrincipalComponent;
  let fixture: ComponentFixture<MateriaPrimaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaPrimaPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaPrimaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCorridaPrincipalComponent } from './resumen-corrida-principal.component';

describe('ResumenCorridaPrincipalComponent', () => {
  let component: ResumenCorridaPrincipalComponent;
  let fixture: ComponentFixture<ResumenCorridaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenCorridaPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCorridaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

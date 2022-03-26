import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCorridaMostrarComponent } from './resumen-corrida-mostrar.component';

describe('ResumenCorridaMostrarComponent', () => {
  let component: ResumenCorridaMostrarComponent;
  let fixture: ComponentFixture<ResumenCorridaMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenCorridaMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCorridaMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

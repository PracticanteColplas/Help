import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoParoMostrarComponent } from './tiempo-paro-mostrar.component';

describe('TiempoParoMostrarComponent', () => {
  let component: TiempoParoMostrarComponent;
  let fixture: ComponentFixture<TiempoParoMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiempoParoMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoParoMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

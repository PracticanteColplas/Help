import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoParoIngresarComponent } from './tiempo-paro-ingresar.component';

describe('TiempoParoIngresarComponent', () => {
  let component: TiempoParoIngresarComponent;
  let fixture: ComponentFixture<TiempoParoIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiempoParoIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoParoIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoParoEliminarComponent } from './tiempo-paro-eliminar.component';

describe('TiempoParoEliminarComponent', () => {
  let component: TiempoParoEliminarComponent;
  let fixture: ComponentFixture<TiempoParoEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiempoParoEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoParoEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

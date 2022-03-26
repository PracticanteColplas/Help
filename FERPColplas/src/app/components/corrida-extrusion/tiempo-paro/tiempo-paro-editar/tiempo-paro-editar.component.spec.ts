import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoParoEditarComponent } from './tiempo-paro-editar.component';

describe('TiempoParoEditarComponent', () => {
  let component: TiempoParoEditarComponent;
  let fixture: ComponentFixture<TiempoParoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiempoParoEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoParoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

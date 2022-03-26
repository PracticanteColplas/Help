import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionEditarComponent } from './devolucion-editar.component';

describe('DevolucionEditarComponent', () => {
  let component: DevolucionEditarComponent;
  let fixture: ComponentFixture<DevolucionEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocesoEditarComponent } from './reproceso-editar.component';

describe('ReprocesoEditarComponent', () => {
  let component: ReprocesoEditarComponent;
  let fixture: ComponentFixture<ReprocesoEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocesoEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprocesoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

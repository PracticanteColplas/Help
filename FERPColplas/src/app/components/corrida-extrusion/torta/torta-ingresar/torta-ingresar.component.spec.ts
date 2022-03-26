import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortaIngresarComponent } from './torta-ingresar.component';

describe('TortaIngresarComponent', () => {
  let component: TortaIngresarComponent;
  let fixture: ComponentFixture<TortaIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TortaIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TortaIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

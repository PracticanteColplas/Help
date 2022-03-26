import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionMaterialesMostrarComponent } from './liquidacion-materiales-mostrar.component';

describe('LiquidacionMaterialesMostrarComponent', () => {
  let component: LiquidacionMaterialesMostrarComponent;
  let fixture: ComponentFixture<LiquidacionMaterialesMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidacionMaterialesMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionMaterialesMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

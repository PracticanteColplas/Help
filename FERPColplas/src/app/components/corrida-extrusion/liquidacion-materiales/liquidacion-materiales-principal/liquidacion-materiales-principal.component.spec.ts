import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionMaterialesPrincipalComponent } from './liquidacion-materiales-principal.component';

describe('LiquidacionMaterialesPrincipalComponent', () => {
  let component: LiquidacionMaterialesPrincipalComponent;
  let fixture: ComponentFixture<LiquidacionMaterialesPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidacionMaterialesPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionMaterialesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

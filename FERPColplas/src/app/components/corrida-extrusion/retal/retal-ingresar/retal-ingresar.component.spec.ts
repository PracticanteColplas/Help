import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetalIngresarComponent } from './retal-ingresar.component';

describe('RetalIngresarComponent', () => {
  let component: RetalIngresarComponent;
  let fixture: ComponentFixture<RetalIngresarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetalIngresarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetalIngresarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

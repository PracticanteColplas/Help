import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaExtrusionFinalComponent } from './corrida-extrusion-final.component';

describe('CorridaExtrusionFinalComponent', () => {
  let component: CorridaExtrusionFinalComponent;
  let fixture: ComponentFixture<CorridaExtrusionFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorridaExtrusionFinalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaExtrusionFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

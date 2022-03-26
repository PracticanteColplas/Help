import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaExtrusionPrincipalComponent } from './corrida-extrusion-principal.component';

describe('CorridaExtrusionPrincipalComponent', () => {
  let component: CorridaExtrusionPrincipalComponent;
  let fixture: ComponentFixture<CorridaExtrusionPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorridaExtrusionPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorridaExtrusionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

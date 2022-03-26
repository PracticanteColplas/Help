import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacionesPrincipalComponent } from './observaciones-principal.component';

describe('ObservacionesPrincipalComponent', () => {
  let component: ObservacionesPrincipalComponent;
  let fixture: ComponentFixture<ObservacionesPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservacionesPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservacionesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

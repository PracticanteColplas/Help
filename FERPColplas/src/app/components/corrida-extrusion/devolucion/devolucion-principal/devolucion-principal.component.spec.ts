import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionPrincipalComponent } from './devolucion-principal.component';

describe('DevolucionPrincipalComponent', () => {
  let component: DevolucionPrincipalComponent;
  let fixture: ComponentFixture<DevolucionPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevolucionPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevolucionPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

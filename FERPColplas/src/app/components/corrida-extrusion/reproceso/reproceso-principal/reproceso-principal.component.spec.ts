import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocesoPrincipalComponent } from './reproceso-principal.component';

describe('ReprocesoPrincipalComponent', () => {
  let component: ReprocesoPrincipalComponent;
  let fixture: ComponentFixture<ReprocesoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocesoPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprocesoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprocesoVerComponent } from './reproceso-ver.component';

describe('ReprocesoVerComponent', () => {
  let component: ReprocesoVerComponent;
  let fixture: ComponentFixture<ReprocesoVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReprocesoVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprocesoVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenProduccionVerComponent } from './orden-produccion-ver.component';

describe('OrdenProduccionVerComponent', () => {
  let component: OrdenProduccionVerComponent;
  let fixture: ComponentFixture<OrdenProduccionVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenProduccionVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenProduccionVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

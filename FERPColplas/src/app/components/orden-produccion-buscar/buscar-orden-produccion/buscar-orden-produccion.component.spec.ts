import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarOrdenProduccionComponent } from './buscar-orden-produccion.component';

describe('BuscarOrdenProduccionComponent', () => {
  let component: BuscarOrdenProduccionComponent;
  let fixture: ComponentFixture<BuscarOrdenProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarOrdenProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarOrdenProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

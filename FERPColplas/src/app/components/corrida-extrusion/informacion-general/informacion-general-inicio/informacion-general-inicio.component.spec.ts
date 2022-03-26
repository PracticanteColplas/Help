import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionGeneralInicioComponent } from './informacion-general-inicio.component';

describe('InformacionGeneralInicioComponent', () => {
  let component: InformacionGeneralInicioComponent;
  let fixture: ComponentFixture<InformacionGeneralInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionGeneralInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionGeneralInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

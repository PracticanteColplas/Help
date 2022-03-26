import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSalidaPrincipalComponent } from './material-salida-principal.component';

describe('MaterialSalidaPrincipalComponent', () => {
  let component: MaterialSalidaPrincipalComponent;
  let fixture: ComponentFixture<MaterialSalidaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSalidaPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSalidaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSalidaEditarComponent } from './material-salida-editar.component';

describe('MaterialSalidaEditarComponent', () => {
  let component: MaterialSalidaEditarComponent;
  let fixture: ComponentFixture<MaterialSalidaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSalidaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSalidaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSalidaMostrarComponent } from './material-salida-mostrar.component';

describe('MaterialSalidaMostrarComponent', () => {
  let component: MaterialSalidaMostrarComponent;
  let fixture: ComponentFixture<MaterialSalidaMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSalidaMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSalidaMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSalidaVerComponent } from './material-salida-ver.component';

describe('MaterialSalidaVerComponent', () => {
  let component: MaterialSalidaVerComponent;
  let fixture: ComponentFixture<MaterialSalidaVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialSalidaVerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSalidaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

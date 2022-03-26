import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortaMostrarComponent } from './torta-mostrar.component';

describe('TortaMostrarComponent', () => {
  let component: TortaMostrarComponent;
  let fixture: ComponentFixture<TortaMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TortaMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TortaMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

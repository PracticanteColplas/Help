import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortaEditarComponent } from './torta-editar.component';

describe('TortaEditarComponent', () => {
  let component: TortaEditarComponent;
  let fixture: ComponentFixture<TortaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TortaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TortaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
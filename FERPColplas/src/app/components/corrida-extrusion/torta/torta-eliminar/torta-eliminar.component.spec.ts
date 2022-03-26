import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortaEliminarComponent } from './torta-eliminar.component';

describe('TortaEliminarComponent', () => {
  let component: TortaEliminarComponent;
  let fixture: ComponentFixture<TortaEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TortaEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TortaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

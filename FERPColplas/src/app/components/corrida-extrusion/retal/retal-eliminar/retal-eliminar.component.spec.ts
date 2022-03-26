import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetalEliminarComponent } from './retal-eliminar.component';

describe('RetalEliminarComponent', () => {
  let component: RetalEliminarComponent;
  let fixture: ComponentFixture<RetalEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetalEliminarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetalEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

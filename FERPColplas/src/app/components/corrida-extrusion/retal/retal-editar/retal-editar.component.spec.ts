import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetalEditarComponent } from './retal-editar.component';

describe('RetalEditarComponent', () => {
  let component: RetalEditarComponent;
  let fixture: ComponentFixture<RetalEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetalEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetalEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

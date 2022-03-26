import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetalMostrarComponent } from './retal-mostrar.component';

describe('RetalMostrarComponent', () => {
  let component: RetalMostrarComponent;
  let fixture: ComponentFixture<RetalMostrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetalMostrarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetalMostrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetalPrincipalComponent } from './retal-principal.component';

describe('RetalPrincipalComponent', () => {
  let component: RetalPrincipalComponent;
  let fixture: ComponentFixture<RetalPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetalPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RetalPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

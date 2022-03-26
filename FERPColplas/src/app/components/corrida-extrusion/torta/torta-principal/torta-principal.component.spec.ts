import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TortaPrincipalComponent } from './torta-principal.component';

describe('TortaPrincipalComponent', () => {
  let component: TortaPrincipalComponent;
  let fixture: ComponentFixture<TortaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TortaPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TortaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

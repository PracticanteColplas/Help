import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoParoPrincipalComponent } from './tiempo-paro-principal.component';

describe('TiempoParoPrincipalComponent', () => {
  let component: TiempoParoPrincipalComponent;
  let fixture: ComponentFixture<TiempoParoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiempoParoPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiempoParoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

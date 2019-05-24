import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoRestauranteComponent } from './turno-restaurante.component';

describe('TurnoRestauranteComponent', () => {
  let component: TurnoRestauranteComponent;
  let fixture: ComponentFixture<TurnoRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnoRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnoRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

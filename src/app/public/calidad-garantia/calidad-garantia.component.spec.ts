import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalidadGarantiaComponent } from './calidad-garantia.component';

describe('CalidadGarantiaComponent', () => {
  let component: CalidadGarantiaComponent;
  let fixture: ComponentFixture<CalidadGarantiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalidadGarantiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalidadGarantiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

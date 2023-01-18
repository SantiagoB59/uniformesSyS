import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiemposDeEntregaComponent } from './tiempos-de-entrega.component';

describe('TiemposDeEntregaComponent', () => {
  let component: TiemposDeEntregaComponent;
  let fixture: ComponentFixture<TiemposDeEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiemposDeEntregaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiemposDeEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

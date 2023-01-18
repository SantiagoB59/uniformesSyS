import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosHorariosComponent } from './nuestros-horarios.component';

describe('NuestrosHorariosComponent', () => {
  let component: NuestrosHorariosComponent;
  let fixture: ComponentFixture<NuestrosHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuestrosHorariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuestrosHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

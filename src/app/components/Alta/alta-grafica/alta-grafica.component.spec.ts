import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaGraficaComponent } from './alta-grafica.component';

describe('AltaGraficaComponent', () => {
  let component: AltaGraficaComponent;
  let fixture: ComponentFixture<AltaGraficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaGraficaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaGraficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaProcessadorComponent } from './alta-processador.component';

describe('AltaProcessadorComponent', () => {
  let component: AltaProcessadorComponent;
  let fixture: ComponentFixture<AltaProcessadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaProcessadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaProcessadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

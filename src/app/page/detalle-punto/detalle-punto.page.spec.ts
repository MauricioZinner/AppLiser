import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePuntoPage } from './detalle-punto.page';

describe('DetallePuntoPage', () => {
  let component: DetallePuntoPage;
  let fixture: ComponentFixture<DetallePuntoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetallePuntoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

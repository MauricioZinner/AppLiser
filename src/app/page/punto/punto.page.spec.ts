import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PuntoPage } from './punto.page';

describe('PuntoPage', () => {
  let component: PuntoPage;
  let fixture: ComponentFixture<PuntoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PuntoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

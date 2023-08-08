import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPuntoPage } from './crear-punto.page';

describe('CrearPuntoPage', () => {
  let component: CrearPuntoPage;
  let fixture: ComponentFixture<CrearPuntoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearPuntoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

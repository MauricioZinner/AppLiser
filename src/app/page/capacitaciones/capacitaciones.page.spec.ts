import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacitacionesPage } from './capacitaciones.page';

describe('CapacitacionesPage', () => {
  let component: CapacitacionesPage;
  let fixture: ComponentFixture<CapacitacionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CapacitacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

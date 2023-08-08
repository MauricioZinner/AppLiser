import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearSolicitudServicioPage } from './crear-solicitud-servicio.page';

describe('CrearSolicitudServicioPage', () => {
  let component: CrearSolicitudServicioPage;
  let fixture: ComponentFixture<CrearSolicitudServicioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearSolicitudServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

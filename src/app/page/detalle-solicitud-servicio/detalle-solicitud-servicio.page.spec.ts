import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleSolicitudServicioPage } from './detalle-solicitud-servicio.page';

describe('DetalleSolicitudServicioPage', () => {
  let component: DetalleSolicitudServicioPage;
  let fixture: ComponentFixture<DetalleSolicitudServicioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetalleSolicitudServicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumoSupervisorPage } from './insumo-supervisor.page';

describe('InsumoSupervisorPage', () => {
  let component: InsumoSupervisorPage;
  let fixture: ComponentFixture<InsumoSupervisorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InsumoSupervisorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

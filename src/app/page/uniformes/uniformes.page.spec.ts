import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UniformesPage } from './uniformes.page';

describe('UniformesPage', () => {
  let component: UniformesPage;
  let fixture: ComponentFixture<UniformesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UniformesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

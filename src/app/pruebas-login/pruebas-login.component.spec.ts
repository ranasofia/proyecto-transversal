import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasLoginComponent } from './pruebas-login.component';

describe('PruebasLoginComponent', () => {
  let component: PruebasLoginComponent;
  let fixture: ComponentFixture<PruebasLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebasLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeFeaturesComponent } from './exchange-features.component';

describe('ExchangeFeaturesComponent', () => {
  let component: ExchangeFeaturesComponent;
  let fixture: ComponentFixture<ExchangeFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

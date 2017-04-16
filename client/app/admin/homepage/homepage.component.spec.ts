import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomepageComponent } from './homepage.component';

describe('AdminHomepageComponent', () => {
  let component: AdminHomepageComponent;
  let fixture: ComponentFixture<AdminHomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create app-admin-home', () => {
    expect(component).toBeTruthy();
  });
});

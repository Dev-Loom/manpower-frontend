import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttComponent } from './view-att.component';

describe('ViewAttComponent', () => {
  let component: ViewAttComponent;
  let fixture: ComponentFixture<ViewAttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAttComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

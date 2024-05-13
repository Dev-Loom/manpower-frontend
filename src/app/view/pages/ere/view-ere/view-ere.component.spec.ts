import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEreComponent } from './view-ere.component';

describe('ViewEreComponent', () => {
  let component: ViewEreComponent;
  let fixture: ComponentFixture<ViewEreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCadreComponent } from './view-cadre.component';

describe('ViewCadreComponent', () => {
  let component: ViewCadreComponent;
  let fixture: ComponentFixture<ViewCadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCadreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

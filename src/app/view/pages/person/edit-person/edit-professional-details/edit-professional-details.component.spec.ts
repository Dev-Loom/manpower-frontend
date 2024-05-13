import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfessionalDetailsComponent } from './edit-professional-details.component';

describe('EditProfessionalDetailsComponent', () => {
  let component: EditProfessionalDetailsComponent;
  let fixture: ComponentFixture<EditProfessionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfessionalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfessionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

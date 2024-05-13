import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCasualtiesComponent } from './edit-casualties.component';

describe('EditCasualtiesComponent', () => {
  let component: EditCasualtiesComponent;
  let fixture: ComponentFixture<EditCasualtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCasualtiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCasualtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

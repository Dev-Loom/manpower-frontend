import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';
import { FormType } from 'src/app/constants';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { UIService } from 'src/app/services/ui.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-edit-casualties',
  templateUrl: './edit-casualties.component.html',
  styleUrls: ['./edit-casualties.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditCasualtiesComponent),
      multi: true,
    },
  ],
})
export class EditCasualtiesComponent implements OnInit {
  enableLeaveEdit: boolean = false;
  enableAfppEdit: boolean = false;
  leaveForm: FormGroup;
  afppForm: FormGroup;
  @Input() casualtiesDetails: any;

  constructor(
    private fb: FormBuilder,
    private uiService: UIService,
    private soldierService: SoldierService
  ) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      leaveDetails: this.fb.array([]),
    });
    this.afppForm = this.fb.group({
      afppDetails: this.fb.array([]),
    });
    this.casualtiesDetails.Leaves.forEach((leave: any) => {
      this.leaveFormArray().push(this.initLeaveForm(leave));
    });
    this.leaveFormArray().disable();
    this.casualtiesDetails.Afpps.forEach((afpp: any) => {
      this.afppFormArray().push(this.initAfppForm(afpp));
    });
    this.afppFormArray().disable();
  }

  onToggleEdit(formType: number) {
    if (formType === FormType.LEAVE) {
      this.enableLeaveEdit = !this.enableLeaveEdit;
      if (!this.enableLeaveEdit) {
        this.leaveFormArray().disable();
      } else {
        this.leaveFormArray().enable();
      }
    } else if (formType === FormType.AFPP) {
      this.enableAfppEdit = !this.enableAfppEdit;
      if (!this.enableAfppEdit) {
        this.afppFormArray().disable();
      } else {
        this.afppFormArray().enable();
      }
    }
  }
  leaveFormArray(): FormArray {
    return this.leaveForm.get('leaveDetails') as FormArray;
  }
  afppFormArray(): FormArray {
    return this.afppForm.get('afppDetails') as FormArray;
  }
  initLeaveForm(leaveDetails: any): FormGroup {
    const { fromDate, toDate, type } = leaveDetails;
    return this.fb.group({
      fromDate: new FormControl(fromDate, [Validators.required]),
      toDate: new FormControl(toDate, [Validators.required]),
      type: new FormControl(type, [Validators.required]),
    });
  }
  initAfppForm(afppDetails: any): FormGroup {
    const { amount, closingBal, openingBal, date } = afppDetails;
    return this.fb.group({
      amount: new FormControl(amount, [Validators.required]),
      closingBal: new FormControl(closingBal, [Validators.required]),
      date: new FormControl(date, [Validators.required]),
      openingBal: new FormControl(openingBal, [Validators.required]),
    });
  }
  onEditLeave(index: number) {
    const year = new Date(
      this.leaveFormArray().at(index).value.fromDate
    ).getFullYear();
    const date1: any = new Date(this.leaveFormArray().at(index).value.fromDate);
    const date2: any = new Date(this.leaveFormArray().at(index).value.toDate);
    const diffTime = Math.abs(date2 - date1);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const leaveDetails = {
      ...this.leaveFormArray().at(index).value,
      year,
      days,
      fromDate: moment(this.leaveFormArray().at(index).value.fromDate).format(
        'DD-MMM-YYYY'
      ),
      toDate: moment(this.leaveFormArray().at(index).value.toDate).format(
        'DD-MMM-YYYY'
      ),
      id: this.casualtiesDetails.Leaves[index].id,
    };
    if (this.leaveForm.valid) {
      this.soldierService.editLeaveById(leaveDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Edited Leave', null, 3000);
        this.onToggleEdit(12);
      });
    }
  }

  onEditAfpp(index: number) {
    const afppDetails = {
      ...this.afppFormArray().at(index).value,
      date: moment(this.afppFormArray().at(index).value.date).format(
        'DD-MMM-YYYY'
      ),
      id: this.casualtiesDetails.Afpps[index].id,
      // persId: this.casualtiesDetails.Afpps[index].persId,
    };
    if (this.afppFormArray().at(index).valid) {
      this.soldierService.editAfppById(afppDetails).subscribe((res: any) => {
        this.uiService.showSnackBar('Successfully Edited AFPP', null, 3000);
        this.onToggleEdit(13);
      });
    }
  }
}

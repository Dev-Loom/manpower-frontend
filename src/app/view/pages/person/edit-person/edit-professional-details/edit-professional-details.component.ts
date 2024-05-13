import { Component, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { DicpTypes, FormType, Gradings } from 'src/app/constants';
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
  selector: 'app-edit-professional-details',
  templateUrl: './edit-professional-details.component.html',
  styleUrls: ['./edit-professional-details.component.css'],
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
      useExisting: forwardRef(() => EditProfessionalDetailsComponent),
      multi: true,
    },
  ],
})
export class EditProfessionalDetailsComponent implements OnInit {
  courseForm: FormGroup;
  ereForm: FormGroup;
  cadresForm: FormGroup;
  bpetForm: FormGroup;
  pptForm: FormGroup;
  firingForm: FormGroup;
  discpForm: FormGroup;
  weaponForm: FormGroup;

  enableCourseEdit: boolean = false;
  enableEreEdit: boolean = false;
  enableCadresEdit: boolean = false;
  enableBpetEdit: boolean = false;
  enablePptEdit: boolean = false;
  enableFiringEdit: boolean = false;
  enableDiscpEdit: boolean = false;
  enableWeaponEdit: boolean = false;

  gradingsList: string[] = Gradings;
  courseList: any[] = [];
  cadresList: any[] = [];
  ereList: any[] = [];
  unitList: any[] = [];
  discpTypes: string[] = DicpTypes;

  isAddCourse: boolean = false;
  isAddCadre: boolean = false;
  isAddERE: boolean = false;
  isAddUnit: boolean = false;
  location: string;
  casualtiesDetails: any;

  @ViewChild('matSelect') matSelect: any = null;
  @Input() professionalDetails: any;

  constructor(
    private uiService: UIService,
    private soldierService: SoldierService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseDetails: this.fb.array([]),
    });
    this.ereForm = this.fb.group({
      ereDetails: this.fb.array([]),
    });
    this.cadresForm = this.fb.group({
      cadresDetails: this.fb.array([]),
    });
    this.bpetForm = this.fb.group({
      bpetDetails: this.fb.array([]),
    });
    this.professionalDetails.Bpets.forEach((bpet: any) => {
      this.bpetFormArray().push(this.initBpetForm(bpet));
    });
    this.bpetFormArray().disable();
    this.pptForm = this.fb.group({
      pptDetails: this.fb.array([]),
    });
    this.professionalDetails.Ppts.forEach((ppt: any) => {
      this.pptFormArray().push(this.initPptForm(ppt));
    });
    this.pptFormArray().disable();
    this.firingForm = this.fb.group({
      firingDetails: this.fb.array([]),
    });
    this.professionalDetails.Firings.forEach((firing: any) => {
      this.firingFormArray().push(this.initFiringForm(firing));
    });
    this.firingFormArray().disable();
    this.discpForm = this.fb.group({
      discpDetails: this.fb.array([]),
    });
    this.professionalDetails.Discps.forEach((discp: any) => {
      this.discpFormArray().push(this.initDiscpForm(discp));
    });
    this.discpFormArray().disable();
    this.weaponForm = this.fb.group({
      weaponDetails: this.fb.array([]),
    });
    this.professionalDetails.Weapons.forEach((weapon: any) => {
      this.weaponFormArray().push(this.initWeaponForm(weapon));
    });
    this.weaponFormArray().disable();

    this.getCourseList();
    this.getUnitList();
    this.getCadresList();
  }

  courseFormArray(): FormArray {
    return this.courseForm.get('courseDetails') as FormArray;
  }
  ereFormArray(): FormArray {
    return this.ereForm.get('ereDetails') as FormArray;
  }
  cadresFormArray(): FormArray {
    return this.cadresForm.get('cadresDetails') as FormArray;
  }
  bpetFormArray(): FormArray {
    return this.bpetForm.get('bpetDetails') as FormArray;
  }
  pptFormArray(): FormArray {
    return this.pptForm.get('pptDetails') as FormArray;
  }
  firingFormArray(): FormArray {
    return this.firingForm.get('firingDetails') as FormArray;
  }
  discpFormArray(): FormArray {
    return this.discpForm.get('discpDetails') as FormArray;
  }
  weaponFormArray(): FormArray {
    return this.weaponForm.get('weaponDetails') as FormArray;
  }

  initCourseForm(courseDetails: any): FormGroup {
    const { fromDate, toDate, course, grading } = courseDetails;
    return this.fb.group({
      fromDate: new FormControl(fromDate, [Validators.required]),
      toDate: new FormControl(toDate, [Validators.required]),
      course: new FormControl(course, [Validators.required]),
      grading: new FormControl(grading, [Validators.required]),
    });
  }

  initEreForm(ereDetails: any): FormGroup {
    const { fromDate, toDate, unit } = ereDetails;
    return this.fb.group({
      fromDate: new FormControl(fromDate, [Validators.required]),
      toDate: new FormControl(toDate, [Validators.required]),
      unit: new FormControl(unit, [Validators.required]),
    });
  }

  initCadresForm(cadresDetails: any): FormGroup {
    const { fromDate, toDate, cadre, result } = cadresDetails;
    return this.fb.group({
      fromDate: new FormControl(fromDate, [Validators.required]),
      toDate: new FormControl(toDate, [Validators.required]),
      cadre: new FormControl(cadre, [Validators.required]),
      result: new FormControl(result, [Validators.required]),
    });
  }

  initBpetForm(bpetDetails: any): FormGroup {
    const { date, result } = bpetDetails;
    return this.fb.group({
      date: new FormControl(date, [Validators.required]),
      result: new FormControl(result, [Validators.required]),
    });
  }

  initPptForm(pptDetails: any): FormGroup {
    const { date, result } = pptDetails;
    return this.fb.group({
      date: new FormControl(date, [Validators.required]),
      result: new FormControl(result, [Validators.required]),
    });
  }
  initFiringForm(firingDetails: any): FormGroup {
    const { date, result } = firingDetails;
    return this.fb.group({
      date: new FormControl(date, [Validators.required]),
      result: new FormControl(result, [Validators.required]),
    });
  }
  initDiscpForm(discpDetails: any): FormGroup {
    const { date, punishment, charge, type } = discpDetails;
    return this.fb.group({
      date: new FormControl(date, [Validators.required]),
      punishment: new FormControl(punishment, [Validators.required]),
      charge: new FormControl(charge, [Validators.required]),
      type: new FormControl(type, [Validators.required]),
    });
  }
  initWeaponForm(weaponDetails: any): FormGroup {
    const { weapon, regnNo, issueDate, depositedDate, remark } = weaponDetails;
    return this.fb.group({
      weapon: new FormControl(weapon, [Validators.required]),
      regnNo: new FormControl(regnNo, [Validators.required]),
      issueDate: new FormControl(issueDate, [Validators.required]),
      depositedDate: new FormControl(depositedDate, [Validators.required]),
      remark: new FormControl(remark, [Validators.required]),
    });
  }

  getCourseList() {
    this.soldierService.getCourseList().subscribe((res: any) => {
      this.courseList = res.data;
      this.professionalDetails.Courses.forEach((course: any) => {
        this.courseFormArray().push(this.initCourseForm(course));
      });
      this.courseFormArray().disable();
    });
  }

  getUnitList() {
    this.soldierService.getEREList().subscribe((res: any) => {
      this.unitList = res.data;
      this.professionalDetails.Eres.forEach((ere: any) => {
        this.ereFormArray().push(this.initEreForm(ere));
      });
      this.ereFormArray().disable();
    });
  }

  getCadresList() {
    this.soldierService.getCadresList().subscribe((res: any) => {
      this.cadresList = res.data;
      this.professionalDetails.Cadres.forEach((cadre: any) => {
        this.cadresFormArray().push(this.initCadresForm(cadre));
      });
      this.cadresFormArray().disable();
    });
  }

  onToggleEdit(formType: number) {
    if (formType === FormType.COURSES) {
      this.enableCourseEdit = !this.enableCourseEdit;
      if (!this.enableCourseEdit) {
        this.courseFormArray().disable();
      } else {
        this.courseFormArray().enable();
      }
    } else if (formType === FormType.ERE) {
      this.enableEreEdit = !this.enableEreEdit;
      if (!this.enableEreEdit) {
        this.ereFormArray().disable();
      } else {
        this.ereFormArray().enable();
      }
    } else if (formType === FormType.CADRES) {
      this.enableCadresEdit = !this.enableCadresEdit;
      if (!this.enableCadresEdit) {
        this.cadresFormArray().disable();
      } else {
        this.cadresFormArray().enable();
      }
    } else if (formType === FormType.BPET) {
      this.enableBpetEdit = !this.enableBpetEdit;
      if (!this.enableBpetEdit) {
        this.bpetFormArray().disable();
      } else {
        this.bpetFormArray().enable();
      }
    } else if (formType === FormType.PPT) {
      this.enablePptEdit = !this.enablePptEdit;
      if (!this.enablePptEdit) {
        this.pptFormArray().disable();
      } else {
        this.pptFormArray().enable();
      }
    } else if (formType === FormType.FIRING) {
      this.enableFiringEdit = !this.enableFiringEdit;
      if (!this.enableFiringEdit) {
        this.firingFormArray().disable();
      } else {
        this.firingFormArray().enable();
      }
    } else if (formType === FormType.DISCP) {
      this.enableDiscpEdit = !this.enableDiscpEdit;
      if (!this.enableDiscpEdit) {
        this.discpFormArray().disable();
      } else {
        this.discpFormArray().enable();
      }
    } else if (formType === FormType.WEAPON) {
      this.enableWeaponEdit = !this.enableWeaponEdit;
      if (!this.enableWeaponEdit) {
        this.weaponFormArray().disable();
      } else {
        this.weaponFormArray().enable();
      }
    }
  }

  convertToUppercase(
    formType: number,
    formControlName: string,
    index?: number
  ) {
    if (formType === FormType.DISCP) {
      const value = this.discpFormArray()
        .at(index)
        .value[formControlName].toUpperCase();
      this.discpFormArray()
        .at(index)
        .patchValue({ [formControlName]: value });
    }
  }

  onEditCourse(index: number) {
    const getLocation = this.courseList.find(
      (c) => c.name === this.courseFormArray().at(index).value.course
    ).location;
    const courseDetails = {
      ...this.courseFormArray().at(index).value,
      fromDate: moment(this.courseFormArray().at(index).value.fromDate).format(
        'DD-MMM-YYYY'
      ),
      toDate: moment(this.courseFormArray().at(index).value.toDate).format(
        'DD-MMM-YYYY'
      ),
      year: new Date(
        this.courseFormArray().at(index).value.fromDate
      ).getFullYear(),
      location: getLocation,
      id: this.professionalDetails.Courses[index].id,
    };
    if (this.courseFormArray().at(index).valid) {
      this.soldierService.editCourseById(courseDetails).subscribe((res) => {
        this.uiService.showSnackBar(
          'Successfully Updated Course Details',
          null,
          3000
        );
        this.onToggleEdit(5);
      });
    }
  }
  onEditEre(index: number) {
    const getLocation = this.unitList.find(
      (c) => c.name === this.ereFormArray().at(index).value.unit
    ).location;
    const ereDetails = {
      ...this.ereFormArray().at(index).value,
      location: getLocation,
      fromDate: moment(this.ereFormArray().at(index).value.fromDate).format(
        'DD-MMM-YYYY'
      ),
      toDate: moment(this.ereFormArray().at(index).value.toDate).format(
        'DD-MMM-YYYY'
      ),
      id: this.professionalDetails.Eres[index].id,
    };
    if (this.ereFormArray().at(index).valid) {
      this.soldierService.editEreById(ereDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Edited ERE', null, 3000);
        this.onToggleEdit(6);
      });
    }
  }
  onEditCadre(index: number) {
    const year = new Date(
      this.cadresFormArray().at(index).value.toDate
    ).getFullYear();
    const cadresDetails = {
      ...this.cadresFormArray().at(index).value,
      year,
      fromDate: moment(this.cadresFormArray().at(index).value.fromDate).format(
        'DD-MMM-YYYY'
      ),
      toDate: moment(this.cadresFormArray().at(index).value.toDate).format(
        'DD-MMM-YYYY'
      ),
      id: this.professionalDetails.Cadres[index].id,
    };
    if (this.cadresFormArray().at(index).valid) {
      this.soldierService.editCadreById(cadresDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Edited Cadres', null, 3000);
        this.onToggleEdit(7);
      });
    }
  }
  onEditBpet(index: number) {
    const bpetDetails = {
      ...this.bpetFormArray().at(index).value,
      date: moment(this.bpetFormArray().at(index).value.date).format(
        'DD-MMM-YYYY'
      ),
      id: this.professionalDetails.Bpets[index].id,
    };
    if (this.bpetFormArray().at(index).valid) {
      this.soldierService.editBpetById(bpetDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Edited BPET', null, 3000);
        this.onToggleEdit(8);
      });
    }
  }
  onEditPpt(index: number) {
    const pptDetails = {
      ...this.pptFormArray().at(index).value,
      date: moment(this.pptFormArray().at(index).value.date).format(
        'DD-MMM-YYYY'
      ),
      id: this.professionalDetails.Ppts[index].id,
    };
    if (this.pptFormArray().at(index).valid) {
      this.soldierService.editPptById(pptDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Edited PPT', null, 3000);
        this.onToggleEdit(9);
      });
    }
  }
  onEditFiring(index: number) {
    const firingDetails = {
      ...this.firingFormArray().at(index).value,
      date: moment(this.firingFormArray().at(index).value.date).format(
        'DD-MMM-YYYY'
      ),
      id: this.professionalDetails.Firings[index].id,
    };
    if (this.firingFormArray().at(index).valid) {
      this.soldierService.editFiringById(firingDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Edited Firing', null, 3000);
        this.onToggleEdit(10);
      });
    }
  }
  onEditDiscp(index: number) {
    const discpDetails = {
      ...this.discpFormArray().at(index).value,
      date: moment(this.discpFormArray().at(index).value.date).format(
        'DD-MMM-YYYY'
      ),
      id: this.professionalDetails.Discps[index].id,
    };
    if (this.discpFormArray().at(index).valid) {
      this.soldierService.editDiscpById(discpDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Edited DISCP', null, 3000);
        this.onToggleEdit(11);
      });
    }
  }
  onEditWeapon(index: number) {
    const weaponDetails = {
      ...this.weaponFormArray().at(index).value,
      id: this.professionalDetails.Weapons[index].id,
      issueDate: moment(
        this.weaponFormArray().at(index).value.issueDate
      ).format('DD-MMM-YYYY'),
      depositedDate: moment(
        this.weaponFormArray().at(index).value.depositedDate
      ).format('DD-MMM-YYYY'),
    };
    if (this.weaponFormArray().at(index).valid) {
      this.soldierService.editWeapon(weaponDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Edited Weapon', null, 3000);
        this.onToggleEdit(14);
      });
    }
  }
}

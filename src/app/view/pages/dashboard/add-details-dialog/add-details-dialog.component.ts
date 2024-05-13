import {
  Component,
  forwardRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import {
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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Gradings, Ranks, RankOrder, DicpTypes } from 'src/app/constants';
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
  selector: 'app-add-details-dialog',
  templateUrl: './add-details-dialog.component.html',
  styleUrls: ['./add-details-dialog.component.css'],
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
      useExisting: forwardRef(() => AddDetailsDialogComponent),
      multi: true,
    },
  ],
})
export class AddDetailsDialogComponent implements OnInit {
  promotionForm: FormGroup;
  courseForm: FormGroup;
  cadresForm: FormGroup;
  leaveForm: FormGroup;
  ereForm: FormGroup;
  attForm: FormGroup;
  professionalForm: FormGroup;
  discpForm: FormGroup;
  weaponForm: FormGroup;
  ranks: string[] = Ranks;
  gradings: string[] = Gradings;
  courseList: any[] = [];
  cadresList: any[] = [];
  ereList: any[] = [];
  unitList: any[] = [];

  isAddCourse: boolean = false;
  isAddCadre: boolean = false;
  isAddERE: boolean = false;
  isAddUnit: boolean = false;
  location: string;

  dicpTypes = DicpTypes;
  @ViewChild('matSelect') matSelect: any = null;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private uiService: UIService,
    private soldierService: SoldierService,
    private dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    if (this.data.role === 2) {
      this.initPromotionForm();
    } else if (this.data.role === 3) {
      this.initCourseForm();
    } else if (this.data.role === 4) {
      this.initCadresForm();
    } else if (this.data.role === 5) {
      this.initLeaveForm();
    } else if (this.data.role === 6) {
      this.initEREForm();
    } else if (this.data.role === 7) {
      this.initATTForm();
    } else if (
      this.data.role === 8 ||
      this.data.role === 9 ||
      this.data.role === 10
    ) {
      this.initProfessionalForm();
    } else if (this.data.role === 11) {
      this.initDiscpForm();
    } else if (this.data.role === 12) {
      this.initWeaponForm();
    }
  }

  convertToUppercase(
    formControlName: string,
    formNo: number,
    extraField?: number
  ) {
    if (formNo === 1) {
      const value = this.promotionForm.value[formControlName].toUpperCase();
      this.promotionForm.patchValue({ [formControlName]: value });
    } else if (formNo === 2) {
      if (extraField) {
        //
      } else {
        const value = this.courseForm.value[formControlName].toUpperCase();
        this.courseForm.patchValue({ [formControlName]: value });
      }
    } else if (formNo === 3) {
      if (extraField) {
        //
      } else {
        const value = this.cadresForm.value[formControlName].toUpperCase();
        this.cadresForm.patchValue({ [formControlName]: value });
      }
    } else if (formNo === 4) {
      const value = this.leaveForm.value[formControlName].toUpperCase();
      this.leaveForm.patchValue({ [formControlName]: value });
    } else if (formNo === 5) {
      if (extraField) {
        //
      } else {
        const value = this.ereForm.value[formControlName].toUpperCase();
        this.ereForm.patchValue({ [formControlName]: value });
      }
    } else if (formNo === 6) {
      const value = this.attForm.value[formControlName].toUpperCase();
      this.attForm.patchValue({ [formControlName]: value });
    } else if (formNo === 7) {
      const value = this.professionalForm.value[formControlName].toUpperCase();
      this.professionalForm.patchValue({ [formControlName]: value });
    } else if (formNo === 8) {
      const value = this.discpForm.value[formControlName].toUpperCase();
      this.discpForm.patchValue({ [formControlName]: value });
    } else if (formNo === 9) {
      const value = this.weaponForm.value[formControlName].toUpperCase();
      this.weaponForm.patchValue({ [formControlName]: value });
    }
  }

  initPromotionForm(): void {
    this.promotionForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      toRank: new FormControl(null, [Validators.required]),
    });
  }

  initCourseForm(): void {
    this.courseForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, [Validators.required]),
      course: new FormControl(null, [Validators.required]),
      grading: new FormControl(null, [Validators.required]),
    });

    this.soldierService.getCourseList().subscribe((res: any) => {
      this.courseList = res.data;
    });
  }

  initCadresForm(): void {
    this.cadresForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, [Validators.required]),
      cadre: new FormControl(null, [Validators.required]),
      result: new FormControl(null, [Validators.required]),
    });

    this.soldierService.getCadresList().subscribe((res: any) => {
      this.cadresList = res.data;
    });
  }
  initLeaveForm() {
    this.leaveForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, [Validators.required]),
    });
  }

  initEREForm() {
    this.ereForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, [Validators.required]),
      unit: new FormControl(null, [Validators.required]),
    });

    this.soldierService.getEREList().subscribe((res: any) => {
      this.ereList = res.data;
    });
  }

  initATTForm() {
    this.attForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, []),
      unit: new FormControl(null, [Validators.required]),
      employment: new FormControl(null, [Validators.required]),
      auth: new FormControl(null, [Validators.required]),
    });

    this.soldierService.getEREList().subscribe((res: any) => {
      this.unitList = res.data;
    });
  }

  initProfessionalForm() {
    this.professionalForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      result: new FormControl(null, [Validators.required]),
    });
  }

  initDiscpForm() {
    this.discpForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      charge: new FormControl(null, [Validators.required]),
      punishment: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
    });
  }

  initWeaponForm() {
    this.weaponForm = new FormGroup({
      armyNo: new FormControl(null, [Validators.required]),
      weapon: new FormControl(null, [Validators.required]),
      regnNo: new FormControl(null, [Validators.required]),
      issueDate: new FormControl(null, [Validators.required]),
      depositedDate: new FormControl(null, [Validators.required]),
      remark: new FormControl(null, [Validators.required]),
    });
  }

  onSubmitPromotion() {
    if (this.promotionForm.valid) {
      const order = RankOrder.get(this.promotionForm.value.toRank);
      const promotionDetails = {
        ...this.promotionForm.value,
        toRank: order,
        date: moment(this.promotionForm.value.date).format('DD-MMM-YYYY'),
      };
      this.soldierService.addPromotion(promotionDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Updated Rank', null, 3000);
        this.dialogRef.close();
      });
    }
  }

  onSubmitCourse() {
    if (this.courseForm.valid) {
      if (this.isAddCourse) {
        this.onAddCourseList();
      }
      let location;
      let msg: string;
      this.courseList.forEach((course) => {
        if (course.name === this.courseForm.value.course) {
          location = course.location;
        }
      });

      if (!location && this.isAddCourse) {
        location = this.courseForm.value.location;
      }
      const year = new Date(this.courseForm.value.fromDate).getFullYear();
      const courseDetails = {
        ...this.courseForm.value,
        location,
        year,
        fromDate: moment(this.courseForm.value.fromDate).format('DD-MMM-YYYY'),
        toDate: moment(this.courseForm.value.toDate).format('DD-MMM-YYYY'),
      };
      this.soldierService.addCourse(courseDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Added Course', null, 3000);
        this.dialogRef.close();
      });
    }
  }
  onAddCourseList() {
    const courseListDetails = {
      name: this.courseForm.value.course,
      location: this.courseForm.value.location,
    };
    this.soldierService.addCourseList(courseListDetails).subscribe((res) => {});
  }
  addCourseList() {
    this.matSelect.close();
    this.courseForm.addControl(
      'location',
      new FormControl(null, [Validators.required])
    );
    this.isAddCourse = true;
  }

  onSubmitCadres() {
    if (this.cadresForm.valid) {
      if (this.isAddCadre) {
        this.onAddCadresList();
      }
      let location;
      let msg: string;
      this.cadresList.forEach((cadre) => {
        if (cadre.name === this.cadresForm.value.cadre) {
          location = cadre.location;
        }
      });

      if (!location && this.isAddCadre) {
        location = this.cadresForm.value.location;
      }
      delete this.cadresForm.value.location;
      const year = new Date(this.cadresForm.value.toDate).getFullYear();
      const cadresDetails = {
        ...this.cadresForm.value,
        year,
        fromDate: moment(this.cadresForm.value.fromDate).format('DD-MMM-YYYY'),
        toDate: moment(this.cadresForm.value.toDate).format('DD-MMM-YYYY'),
      };
      this.soldierService.addCadres(cadresDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Added Cadres', null, 3000);
        this.dialogRef.close();
      });
    }
  }

  addCadresList() {
    this.matSelect.close();
    this.cadresForm.addControl(
      'location',
      new FormControl(null, [Validators.required])
    );
    this.isAddCadre = true;
  }

  onAddCadresList() {
    const cadresListDetails = {
      name: this.cadresForm.value.cadre,
      location: this.cadresForm.value.location,
    };
    this.soldierService.addCadresList(cadresListDetails).subscribe((res) => {});
  }

  onSubmitLeave() {
    const year = new Date(this.leaveForm.value.fromDate).getFullYear();
    const date1: any = new Date(this.leaveForm.value.fromDate);
    const date2: any = new Date(this.leaveForm.value.toDate);
    const diffTime = Math.abs(date2 - date1);
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const leaveDetails = {
      ...this.leaveForm.value,
      year,
      days,
      fromDate: moment(this.leaveForm.value.fromDate).format('DD-MMM-YYYY'),
      toDate: moment(this.leaveForm.value.toDate).format('DD-MMM-YYYY'),
    };
    if (this.leaveForm.valid) {
      this.soldierService.addLeave(leaveDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Added Leave', null, 3000);
        this.dialogRef.close();
      });
    }
  }

  onSubmitERE() {
    if (this.ereForm.valid) {
      if (this.isAddERE) {
        this.onAddEREList();
      }
      let location;
      let msg: string;
      this.ereList.forEach((ere) => {
        if (ere.name === this.ereForm.value.unit) {
          location = ere.location;
        }
      });

      if (!location && this.isAddERE) {
        location = this.ereForm.value.location;
      }
      const ereDetails = {
        ...this.ereForm.value,
        location,
        fromDate: moment(this.ereForm.value.fromDate).format('DD-MMM-YYYY'),
        toDate: moment(this.ereForm.value.toDate).format('DD-MMM-YYYY'),
      };
      this.soldierService.addERE(ereDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Added ERE', null, 3000);
        this.dialogRef.close();
      });
    }
  }

  addEREList() {
    this.matSelect.close();
    this.ereForm.addControl(
      'location',
      new FormControl(null, [Validators.required])
    );
    this.isAddERE = true;
  }

  onAddEREList() {
    const ereListDetails = {
      name: this.ereForm.value.unit,
      location: this.ereForm.value.location,
    };
    this.soldierService.addEREList(ereListDetails).subscribe((res) => {});
  }

  onSubmitATT() {
    if (this.attForm.valid) {
      if (this.isAddUnit) {
        this.onAddUnitList();
      }
      let location;
      this.unitList.forEach((unit) => {
        if (unit.name === this.attForm.value.unit) {
          location = unit.location;
        }
      });

      if (!location && this.isAddUnit) {
        location = this.attForm.value.location;
      }

      const attDetails = {
        ...this.attForm.value,
        location,
        fromDate: moment(this.attForm.value.fromDate).format('DD-MMM-YYYY'),
      };
      if (this.attForm.value.toDate) {
        attDetails['toDate'] = moment(this.attForm.value.toDate).format(
          'DD-MMM-YYYY'
        );
      }

      this.soldierService.addATT(attDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Added ATT', null, 3000);
        this.dialogRef.close();
      });
    }
  }

  addUnitList() {
    this.matSelect.close();
    this.attForm.addControl(
      'location',
      new FormControl(null, [Validators.required])
    );
    this.isAddUnit = true;
  }

  onAddUnitList() {
    const unitListDetails = {
      name: this.attForm.value.unit,
      location: this.attForm.value.location,
    };
    this.soldierService.addEREList(unitListDetails).subscribe((res) => {});
  }

  onSubmitBPET() {
    const formNo = this.data.role - 1;
    const professionalFormDetails = {
      ...this.professionalForm.value,
      date: moment(this.professionalForm.value.date).format('DD MM YYYY'),
    };
    if (this.professionalForm.valid) {
      if (formNo === 7) {
        this.soldierService
          .addBPET(professionalFormDetails)
          .subscribe((res) => {
            this.uiService.showSnackBar('Successfully Added BPET', null, 3000);
            this.dialogRef.close();
          });
      } else if (formNo === 8) {
        this.soldierService.addPPT(professionalFormDetails).subscribe((res) => {
          this.uiService.showSnackBar('Successfully Added PPT', null, 3000);
          this.dialogRef.close();
        });
      } else if (formNo === 9) {
        this.soldierService
          .addFiring(professionalFormDetails)
          .subscribe((res) => {
            this.uiService.showSnackBar(
              'Successfully Added FIRING',
              null,
              3000
            );
            this.dialogRef.close();
          });
      }
    }
  }

  onSubmitDISCP() {
    const discpFormDetails = {
      ...this.discpForm.value,
      date: moment(this.discpForm.value.date).format('DD-MMM-YYYY'),
    };
    if (this.discpForm.valid) {
      this.soldierService.addDiscp(discpFormDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Added Discp', null, 3000);
        this.dialogRef.close();
      });
    }
  }
  onSubmitWeaopn() {
    const weaponFormDetails = {
      ...this.weaponForm.value,
      issueDate: moment(this.weaponForm.value.issueDate).format('DD-MMM-YYYY'),
      depositedDate: moment(this.weaponForm.value.depositedDate).format(
        'DD-MMM-YYYY'
      ),
    };
    if (this.weaponForm.valid) {
      console.log(weaponFormDetails);
      this.soldierService.addWeapon(weaponFormDetails).subscribe((res) => {
        this.uiService.showSnackBar('Successfully Added Discp', null, 3000);
        this.dialogRef.close();
      });
    }
  }
}

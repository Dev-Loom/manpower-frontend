import { Component, forwardRef, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Months, PL, RankOrder } from 'src/app/constants';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { UIService } from 'src/app/services/ui.service';

export const YEAR_MODE_FORMATS = {
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
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DialogComponent),
      multi: true,
    },
  ],
})
export class DialogComponent implements OnInit {
  selectedYear: FormControl = new FormControl();
  maxYear: Moment = moment();
  minYear: Moment;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private uiService: UIService,
    private router: Router,
    private dialogRef: MatDialogRef<any>,
    private soldierService: SoldierService
  ) {}

  ngOnInit(): void {
    if (this.data.type === 3) {
      YEAR_MODE_FORMATS.display.dateInput = 'YYYY';
    } else {
      YEAR_MODE_FORMATS.display.dateInput = 'DD-MMM-YYYY';
    }
  }

  onLogout() {
    this.uiService.isAuthenticated.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this.dialogRef.close();
    this.uiService.showSnackBar('Successfully Logged Out', null, 3000);
  }

  onSelection(filterName: string, index: number) {
    if (filterName === 'coy') {
      this.data.filters.forEach((filter: any) => {
        if (filter.filterName === 'pl') {
          filter.options = PL[this.data.filters[index].value];
        }
      });
    }
  }

  /*********************************************************
                  PERSON FILTER SECTION
  *********************************************************/

  onPersonClear() {
    this.data.filters.forEach((filter: any) => {
      filter.value = null;
    });
    const filterPersonObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };
    this.soldierService.getAllPerson(filterPersonObj).subscribe((res) => {
      this.dialogRef.close({ filteredPerson: res, filteredSelected: 0 });
    });
  }

  onApplyPersonFilter() {
    const filterPersonObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };
    this.data.filters.forEach((filter: any) => {
      if (filter.value) {
        if (filter.filterName === 'rank') {
          filterPersonObj[filter.filterName] = RankOrder.get(filter.value);
        } else if (filter.filterName === 'lmc') {
          filterPersonObj[filter.filterName] = {
            temporary: false,
            permanent: false,
          };
          if (filter.value.includes('PERMANENT')) {
            filterPersonObj[filter.filterName]['permanent'] = true;
          }
          if (filter.value.includes('TEMPORARY')) {
            filterPersonObj[filter.filterName]['temporary'] = true;
          }
        } else {
          filterPersonObj[filter.filterName] = filter.value;
        }
      }
      if (filter.filterNumber === 9 || filter.filterNumber === 10) {
        filterPersonObj[filter.filterName1] = filter.lowValue;
        filterPersonObj[filter.filterName2] = filter.highValue;
      }
    });

    this.soldierService.getAllPerson(filterPersonObj).subscribe((res) => {
      this.dialogRef.close({
        filteredPerson: res,
        filteredSelected: Object.keys(filterPersonObj).length - 4,
      });
    });
  }

  onCancel() {
    this.data.filters.forEach((filter: any) => {
      filter.value = null;
    });
  }

  /*********************************************************
                  LEAVE FILTER SECTION
  *********************************************************/

  onLeaveClear() {
    this.data.filters.forEach((filter: any) => {
      filter.value = null;
    });
    const filterLeaveObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };

    this.soldierService.getAllLeaves(filterLeaveObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredLeaves: res,
        filteredSelected: 0,
      });
    });
  }

  onApplyLeaveFilter() {
    const filterLeaveObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };
    this.data.filters.forEach((filter: any) => {
      if (filter.value) {
        filterLeaveObj[filter.filterName] = filter.value;
      }
    });
    if (filterLeaveObj.month) {
      filterLeaveObj.month = Months.find(
        (m) => m.name === filterLeaveObj.month
      ).number;
    }
    if (this.selectedYear.value) {
      filterLeaveObj.year = this.selectedYear.value._i.year;
    }

    this.soldierService.getAllLeaves(filterLeaveObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredLeaves: res,
        filteredSelected: Object.keys(filterLeaveObj).length - 2,
      });
    });
  }

  yearSelectedHandler(chosenDate: Moment, datepicker: MatDatepicker<Moment>) {
    datepicker.close();
    this.selectedYear.setValue(chosenDate, { emitEvent: false });
  }

  /*********************************************************
                  COURSE FILTER SECTION
  *********************************************************/

  onCourseClear() {
    this.data.filters.forEach((filter: any) => {
      filter.value = null;
    });
    const filterCourseObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };

    this.soldierService.getAllCourses(filterCourseObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredCourses: res,
        filteredSelected: 0,
      });
    });
  }
  onApplyCourseFilter() {
    const filterCourseObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };
    this.data.filters.forEach((filter: any) => {
      if (filter.value) {
        filterCourseObj[filter.filterName] = filter.value;
      }
    });
    if (filterCourseObj.fromDate) {
      filterCourseObj.fromDate = moment(filterCourseObj).format('DD-MMM-YYYY');
    }
    if (filterCourseObj.toDate) {
      filterCourseObj.toDate = moment(filterCourseObj).format('DD-MMM-YYYY');
    }

    this.soldierService.getAllCourses(filterCourseObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredCourses: res,
        filteredSelected: Object.keys(filterCourseObj).length - 2,
      });
    });
  }
  /*********************************************************
                  COURSE FILTER SECTION
  *********************************************************/

  onEreClear() {
    this.data.filters.forEach((filter: any) => {
      filter.value = null;
    });
    const filterEreObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };

    this.soldierService.getAllERE(filterEreObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredEres: res,
        filteredSelected: 0,
      });
    });
  }
  onApplyEreFilter() {
    const filterEreObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };
    this.data.filters.forEach((filter: any) => {
      if (filter.value) {
        filterEreObj[filter.filterName] = filter.value;
      }
    });

    this.soldierService.getAllERE(filterEreObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredEres: res,
        filteredSelected: Object.keys(filterEreObj).length - 2,
      });
    });
  }

  /*********************************************************
                  ATT FILTER SECTION
  *********************************************************/

  onAttClear() {
    this.data.filters.forEach((filter: any) => {
      filter.value = null;
    });
    const filterAttObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };

    this.soldierService.getAllATT(filterAttObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredAtt: res,
        filteredSelected: 0,
      });
    });
  }
  onApplyAttFilter() {
    const filterAttObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };
    this.data.filters.forEach((filter: any) => {
      if (filter.value) {
        filterAttObj[filter.filterName] = filter.value;
      }
    });

    this.soldierService.getAllATT(filterAttObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredAtt: res,
        filteredSelected: Object.keys(filterAttObj).length - 2,
      });
    });
  }

  /*********************************************************
                  CADRE FILTER SECTION
  *********************************************************/

  onCadresClear() {
    this.data.filters.forEach((filter: any) => {
      filter.value = null;
    });
    const filterCadreObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };

    this.soldierService.getAllCadre(filterCadreObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredCadres: res,
        filteredSelected: 0,
      });
    });
  }
  onApplyCadresFilter() {
    const filterCadreObj: any = {
      pageNo: 0,
      pageLimit: 100,
    };
    this.data.filters.forEach((filter: any) => {
      if (filter.value) {
        filterCadreObj[filter.filterName] = filter.value;
      }
    });
    if (filterCadreObj.result && filterCadreObj.result === 'true') {
      filterCadreObj.result = true;
    } else if (filterCadreObj.result && filterCadreObj.result === 'false') {
      filterCadreObj.result = false;
    }

    this.soldierService.getAllCadre(filterCadreObj).subscribe((res: any) => {
      this.dialogRef.close({
        filteredCadres: res,
        filteredSelected: Object.keys(filterCadreObj).length - 2,
      });
    });
  }
}

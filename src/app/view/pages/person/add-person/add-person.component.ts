import { Component, forwardRef, Inject, OnInit, Optional } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { serialize } from 'object-to-formdata';
import { UIService } from 'src/app/services/ui.service';
import {
  AddressFormFields,
  FieldType,
  RankOrder,
  PL,
  personFields,
  EducationNumber,
} from 'src/app/constants';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as moment from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Soldier } from 'src/app/models/auth.model';
import { State } from 'country-state-city';

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
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
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
      useExisting: forwardRef(() => AddPersonComponent),
      multi: true,
    },
  ],
})
export class AddPersonComponent implements OnInit {
  personDetailsForm: FormGroup;
  addressForm: FormGroup;
  formFields: Soldier[] = personFields;
  isSoldierImgUploaded: any;
  selectedSoldierImg: any;
  selectedSoldierFile: any;
  fieldType = FieldType;
  rankOrder = RankOrder;
  educationNumber = EducationNumber;
  AddressFormFields = AddressFormFields;

  multipleChildrenDetailsForm: FormGroup;
  selectedTabIndex: number = 0;
  armyNo: string;
  isArmyNoEntered: boolean = true;
  hasWife: boolean = false;
  isAddAppt: boolean = false;
  apptList: string[] = [];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private soldierService: SoldierService,
    private dialogRef: MatDialogRef<any>,
    private uiService: UIService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.personDetailsForm = new FormGroup({
      armyNo: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      rank: new FormControl(null, [Validators.required]),
      appt: new FormControl(null, []),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      dob: new FormControl(null, [Validators.required]),
      doe: new FormControl(null, [Validators.required]),
      icard: new FormControl(null, [Validators.required]),
      aadhar: new FormControl(null, [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      pan: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
      ]),
      coy: new FormControl(null, [Validators.required]),
      pl: new FormControl(null, [Validators.required]),
      height: new FormControl(null, [Validators.required]),
      weight: new FormControl(null, [Validators.required]),
      bank: new FormControl(null, [Validators.required]),
      account: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]{0,25}$'),
      ]),
      father: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      mother: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      wife: new FormControl(null, []),
      bloodGroup: new FormControl(null, [Validators.required]),
      class: new FormControl(null, [Validators.required]),
      posted: new FormControl(null, [Validators.required]),
      education: new FormControl(null, [Validators.required]),
      medCat: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    this.addressForm = new FormGroup({
      state: new FormControl(null, [Validators.required]),
      district: new FormControl(null, [Validators.required]),
      tehsil: new FormControl(null, [Validators.required]),
      vill: new FormControl(null, [Validators.required]),
      policeStation: new FormControl(null, [Validators.required]),
      pin: new FormControl(null, [Validators.required]),
      nrs: new FormControl(null, [Validators.required]),
      distFromBorder: new FormControl(null, [Validators.required]),
    });

    this.multipleChildrenDetailsForm = this.fb.group({
      childrenDetails: this.fb.array([]),
    });
    this.multipleChildrenDetails().push(this.childrenForm());

    this.soldierService.getApptList().subscribe((res: any) => {
      res.data.forEach((item: any) => {
        this.apptList.push(item.name);

        this.formFields.forEach((field: any) => {
          if (field.formControlName === 'appt') {
            field.options = this.apptList;
          }
        });
      });
    });

    this.AddressFormFields.forEach((field: any) => {
      if (field.formControlName === 'state') {
        field.options = this.getStates()
      }
    })
  }

  getStates = () => {
    const states: string[] = [];
    State.getAllStates().forEach((state) => {
      if (state.countryCode === 'IN') {
        states.push(state.name.toUpperCase());
      }
    });

    return states.sort((a, b) => a.localeCompare(b));
  };

  multipleChildrenDetails(): FormArray {
    return this.multipleChildrenDetailsForm.get('childrenDetails') as FormArray;
  }

  childrenForm(): FormGroup {
    return this.fb.group({
      name: new FormControl(null, [Validators.required]),
      school: new FormControl(null, [Validators.required]),
      dob: new FormControl(null, [Validators.required]),
      child: new FormControl(null, [Validators.required]),
    });
  }

  onRemoveChildForm(index: number) {
    this.multipleChildrenDetails().removeAt(index);
  }

  validateArmyNumber() {}

  onSelectImg(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.isSoldierImgUploaded = true;
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.selectedSoldierImg = event.target.result; // current blog img Preview
      };
      this.selectedSoldierFile = event.target.files[0]; // main image file
    }
  }

  onSubmit() {
    if (this.personDetailsForm.valid) {
      this.addApptList();
      const order = this.rankOrder.get(this.personDetailsForm.value.rank);
      const educationNumber = this.educationNumber.get(
        this.personDetailsForm.value.education
      );

      const personDetailsForm = {
        ...this.personDetailsForm.value,
        rank: order,
        education: educationNumber,
        wife: this.personDetailsForm.value.wife || null,
        dob: moment(this.personDetailsForm.value.dob).format('DD-MMM-YYYY'),
        doe: moment(this.personDetailsForm.value.doe).format('DD-MMM-YYYY'),
      };
      if (this.personDetailsForm.value.wife) {
        this.hasWife = true;
      }
      const formData = serialize(personDetailsForm, {
        indices: true,
      });
      if (this.selectedSoldierFile) {
        formData.append('image', this.selectedSoldierFile);
      }

      this.soldierService.addPeron(formData).subscribe(
        (res) => {
          this.selectedTabIndex = 1;
          this.uiService.showSnackBar(
            'Successfully Added Person Details',
            null,
            3000
          );
        },
        (err) => {
          console.log(err);
          // this.dialogRef.close();
          this.uiService.showSnackBar(err.error.message, null, 3000);
        }
      );
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedTabIndex = event.index;
  }

  onSelection(label: string) {
    if (label === 'COY') {
      this.formFields.forEach((field) => {
        if (field.label === 'PL' && this.personDetailsForm.value.coy) {
          field.options = PL[this.personDetailsForm.value.coy];
        }
      });
    }
  }

  convertToUppercase(formControlName: string, formNo: number, index?: number) {
    if (formNo === 1) {
      const value = this.personDetailsForm.value[formControlName].toUpperCase();
      this.personDetailsForm.patchValue({ [formControlName]: value });
    } else if (formNo === 2) {
      const value = this.addressForm.value[formControlName].toUpperCase();
      this.addressForm.patchValue({ [formControlName]: value });
    } else if (formNo === 3) {
      const value = this.multipleChildrenDetails()
        .at(index)
        .value[formControlName].toUpperCase();
      this.multipleChildrenDetails()
        .at(index)
        .patchValue({ [formControlName]: value });
    }
  }

  onAddAddress() {
    if (this.addressForm.valid) {
      const addressDetails = {
        ...this.addressForm.value,
        armyNo: this.personDetailsForm.value.armyNo,
      };
      this.soldierService.addAddress(addressDetails).subscribe(
        (res) => {
          this.uiService.showSnackBar(
            'Successfully Added The Address',
            null,
            3000
          );
          this.selectedTabIndex = 2;
        },
        (err) => {
          console.log(err);
          // this.dialogRef.close();
          this.uiService.showSnackBar(err.error.message, null, 3000);
        }
      );
    }
  }

  onAddChildForm() {
    if (this.multipleChildrenDetails().valid) {
      this.multipleChildrenDetails().push(this.childrenForm());
    } else {
      this.uiService.showSnackBar('Kindly Fill All The Fields', null, 3000);
    }
  }

  onAddChildren() {
    if (this.multipleChildrenDetails().valid) {
      const childDetails = this.multipleChildrenDetails().value;
      childDetails.forEach((child: any) => {
        child.armyNo = this.personDetailsForm.value.armyNo;
        child.dob = moment(child.dob).format('DD MM YYYY');
      });
      this.soldierService.addChildDetails(childDetails).subscribe(
        (res) => {
          this.uiService.showSnackBar(
            'Successfully Added The Child Details',
            null,
            3000
          );
          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
          // this.dialogRef.close();
          this.uiService.showSnackBar(err.error.message, null, 3000);
        }
      );
    }
  }

  addApptList() {
    const apptName = { name: this.personDetailsForm.value.appt };
    this.soldierService.addApptList(apptName).subscribe((res) => {});
  }
}

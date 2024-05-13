import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { serialize } from 'object-to-formdata';
import { AddressFormFields, FormType, RankOrder } from 'src/app/constants';
import { Soldier } from 'src/app/models/auth.model';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { UIService } from 'src/app/services/ui.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { environment } from 'src/environments/environment';
import {
  EducationNumber,
  FieldType,
  PL,
  personFields,
} from 'src/app/constants';

export class MyFormat {
  constructor() {}
  get display() {
    return {
      dateInput: 'DD-MMM-YYYY',
    };
  }
}

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
  ],
})
export class EditPersonComponent implements OnInit {
  userName: string;

  isSoldierImgUploaded: boolean = false;
  selectedSoldierFile: any;
  selectedSoldierImg: any;
  personProfileDetails: any;

  soldierDetails: FormGroup;
  addressForm: FormGroup;
  formFields: Soldier[] = personFields;
  fieldType = FieldType;
  rankOrder = RankOrder;
  educationNumber = EducationNumber;
  AddressFormFields = AddressFormFields;
  enablePersonEdit: boolean = false;
  enableAddressEdit: boolean = false;
  enableChildEdit: boolean = false;

  multipleChildrenDetailsForm: FormGroup;

  location: string;
  casualtiesDetails: any;
  professionalDetails: any;

  @ViewChild('matSelect') matSelect: any = null;

  constructor(
    private uiService: UIService,
    private soldierService: SoldierService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DATE_FORMATS) private config: MyFormat
  ) {}

  ngOnInit(): void {
    this.uiService.userName.subscribe((res) => {
      this.userName = res;
    });
    this.route.paramMap.subscribe((res: any) => {
      if (res.params.id) {
        this.getPersonById(res.params.id);
      }
    });

    this.multipleChildrenDetailsForm = this.fb.group({
      childrenDetails: this.fb.array([]),
    });
  }
  multipleChildrenDetails(): FormArray {
    return this.multipleChildrenDetailsForm.get('childrenDetails') as FormArray;
  }

  childrenForm(childDetails?: any): FormGroup {
    const { name, school, dob, child } = childDetails || {};
    return this.fb.group({
      name: new FormControl(name, [Validators.required]),
      school: new FormControl(school, [Validators.required]),
      dob: new FormControl(dob, [Validators.required]),
      child: new FormControl(child, [Validators.required]),
    });
  }

  getPersonById(id: number) {
    this.soldierService.getPersonById(id).subscribe((res: any) => {
      console.log(res);
      this.personProfileDetails = res.data;
      this.casualtiesDetails = res.data;
      this.professionalDetails = res.data;
      if (this.personProfileDetails.photo) {
        this.personProfileDetails.photo = `${environment.base_url}/${this.personProfileDetails.photo}`;
      }
      const getRank = new Map(Array.from(RankOrder, (a) => a.reverse()) as []);
      const getEducation = new Map(
        Array.from(EducationNumber, (a) => a.reverse()) as []
      );

      this.personProfileDetails.rank = getRank.get(
        this.personProfileDetails.rank
      );

      this.personProfileDetails.education = getEducation.get(
        this.personProfileDetails.education
      );

      this.initPersonalDetailsEditForm();
      this.initAddressEditForm();

      this.personProfileDetails.Children.forEach((child: any) => {
        this.multipleChildrenDetails().push(this.childrenForm(child));
      });

      this.multipleChildrenDetails().controls.forEach((control) => {
        control.get('name').disable();
        control.get('school').disable();
        control.get('dob').disable();
      });
    });
  }
  initAddressEditForm() {
    const {
      state,
      district,
      tehsil,
      vill,
      pin,
      policeStation,
      nrs,
      distFromBorder,
    } = this.personProfileDetails.Address || {};

    this.addressForm = new FormGroup({
      state: new FormControl(state, [Validators.required]),
      district: new FormControl(district, [Validators.required]),
      tehsil: new FormControl(tehsil, [Validators.required]),
      vill: new FormControl(vill, [Validators.required]),
      policeStation: new FormControl(policeStation, [Validators.required]),
      pin: new FormControl(pin, [Validators.required]),
      nrs: new FormControl(nrs, [Validators.required]),
      distFromBorder: new FormControl(distFromBorder, [Validators.required]),
    });

    this.addressForm.disable();
  }
  initPersonalDetailsEditForm() {
    this.soldierDetails = new FormGroup({
      armyNo: new FormControl(this.personProfileDetails.armyNo, [
        Validators.required,
        Validators.minLength(8),
      ]),
      rank: new FormControl(this.personProfileDetails.rank, [
        Validators.required,
      ]),
      appt: new FormControl(this.personProfileDetails.appt, []),
      name: new FormControl(this.personProfileDetails.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      dob: new FormControl(this.personProfileDetails.dob, [
        Validators.required,
      ]),
      doe: new FormControl(this.personProfileDetails.doe, [
        Validators.required,
      ]),
      icard: new FormControl(this.personProfileDetails.icard, [
        Validators.required,
      ]),
      aadhar: new FormControl(this.personProfileDetails.aadhar, [
        Validators.required,
        Validators.minLength(12),
        Validators.maxLength(12),
      ]),
      phone: new FormControl(this.personProfileDetails.phone, [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      pan: new FormControl(this.personProfileDetails.pan, [
        Validators.required,
        Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$'),
      ]),
      coy: new FormControl(this.personProfileDetails.coy, [
        Validators.required,
      ]),
      pl: new FormControl(this.personProfileDetails.pl, [Validators.required]),
      height: new FormControl(this.personProfileDetails.height, [
        Validators.required,
      ]),
      weight: new FormControl(this.personProfileDetails.weight, [
        Validators.required,
      ]),
      bank: new FormControl(this.personProfileDetails.bank, [
        Validators.required,
      ]),
      account: new FormControl(this.personProfileDetails.account, [
        Validators.required,
        Validators.pattern('^[0-9]{0,25}$'),
      ]),
      father: new FormControl(this.personProfileDetails.father, [
        Validators.required,
        Validators.minLength(3),
      ]),
      mother: new FormControl(this.personProfileDetails.mother, [
        Validators.required,
        Validators.minLength(3),
      ]),
      wife: new FormControl(this.personProfileDetails.wife, []),
      bloodGroup: new FormControl(this.personProfileDetails.bloodGroup, [
        Validators.required,
      ]),
      class: new FormControl(this.personProfileDetails.class, [
        Validators.required,
      ]),
      posted: new FormControl(this.personProfileDetails.posted, [
        Validators.required,
      ]),
      education: new FormControl(this.personProfileDetails.education, [
        Validators.required,
      ]),
      medCat: new FormControl(this.personProfileDetails.medCat, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });

    this.formFields.forEach((field) => {
      if (field.label === 'PL' && this.soldierDetails.value.coy) {
        field.options = PL[this.soldierDetails.value.coy];
      }
    });
    this.soldierDetails.disable();
  }

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
    if (this.soldierDetails.valid) {
      const order = this.rankOrder.get(this.soldierDetails.value.rank);
      const educationNumber = this.educationNumber.get(
        this.soldierDetails.value.education
      );

      const soldierDetails = {
        ...this.soldierDetails.value,
        rank: order,
        doe: moment(this.soldierDetails.value.doe).format('DD-MMM-YYYY'),
        dob: moment(this.soldierDetails.value.dob).format('DD-MMM-YYYY'),
        education: educationNumber,
        id: this.personProfileDetails.id,
      };

      const formData = serialize(soldierDetails, {
        indices: true,
      });
      if (this.selectedSoldierFile) {
        formData.append('image', this.selectedSoldierFile);
      }

      this.soldierService.editPersonById(formData).subscribe(
        (res) => {
          this.uiService.showSnackBar(
            'Successfully Updated Person Details',
            null,
            3000
          );
        },
        (err) => {
          console.log(err);
          this.uiService.showSnackBar(err.error.message, null, 3000);
        }
      );
    }
  }

  onSelection(label: string) {
    if (label === 'COY') {
      this.formFields.forEach((field) => {
        if (field.label === 'PL' && this.soldierDetails.value.coy) {
          field.options = PL[this.soldierDetails.value.coy];
        }
      });
    }
  }

  convertToUppercase(
    formType: number,
    formControlName: string,
    index?: number
  ) {
    if (formType === FormType.PERSON) {
      const value = this.soldierDetails.value[formControlName].toUpperCase();
      this.soldierDetails.patchValue({ [formControlName]: value });
    } else if (formType === FormType.ADDRESS) {
      const value = this.addressForm.value[formControlName].toUpperCase();
      this.addressForm.patchValue({ [formControlName]: value });
    } else if (formType === FormType.CHILD) {
      const value = this.multipleChildrenDetails()
        .at(index)
        .value[formControlName].toUpperCase();
      this.multipleChildrenDetails()
        .at(index)
        .patchValue({ [formControlName]: value });
    }
  }

  onEditAddress() {
    const addressDetails = {
      ...this.addressForm.value,
    };
    if (this.personProfileDetails.Address) {
      addressDetails.id = this.personProfileDetails.Address.id;
      this.soldierService.editAddress(addressDetails).subscribe((res) => {
        this.uiService.showSnackBar(
          'Successfully Updated The Address',
          null,
          3000
        );
      });
    } else {
      addressDetails.armyNo = this.soldierDetails.value.armyNo;
      this.soldierService.addAddress(addressDetails).subscribe((res) => {
        this.uiService.showSnackBar(
          'Successfully Added The Address',
          null,
          3000
        );
      });
    }
  }

  onEditChildren(index: number) {
    const childDetails = {
      ...this.multipleChildrenDetails().at(index).value,
      dob: moment(this.multipleChildrenDetails().at(index).value.dob).format(
        'DD-MMM-YYYY'
      ),
    };

    if (
      this.personProfileDetails.Children.length > 0 &&
      this.personProfileDetails.Children[index]
    ) {
      childDetails.id = this.personProfileDetails.Children[index].id;
      this.soldierService.editChild(childDetails).subscribe((res) => {
        this.uiService.showSnackBar(
          'Successfully Updated Child Details',
          null,
          3000
        );
      });
    } else {
      childDetails.armyNo = this.soldierDetails.value.armyNo;
      this.soldierService.addChildDetails([childDetails]).subscribe((res) => {
        this.uiService.showSnackBar(
          'Successfully Added Child Details',
          null,
          3000
        );
      });
    }
  }
  onDelete(dialogType: number, index?: number) {
    let header;
    let id;
    if (dialogType === FormType.PERSON) {
      header = 'Delete Person Profile';
      id = this.personProfileDetails.id;
    } else if (dialogType === FormType.ADDRESS) {
      header = 'Delete Address Details';
      id = this.personProfileDetails.Address.id;
    } else if (dialogType === FormType.CHILD) {
      header = 'Delete Child Details';
      id = this.personProfileDetails.Children[index].id;
    }
    this.dialog.open(DialogComponent, {
      width: '40rem',
      position: { top: '10rem' },
      data: {
        id,
        type: dialogType,
        header,
        message: 'Are you sure want to delete?',
      },
    });
  }

  onToggleEdit(formType: number) {
    if (formType === FormType.PERSON) {
      this.enablePersonEdit = !this.enablePersonEdit;
      if (!this.enablePersonEdit) {
        this.soldierDetails.disable();
      } else {
        this.soldierDetails.enable();
      }
    } else if (formType === FormType.ADDRESS) {
      this.enableAddressEdit = !this.enableAddressEdit;
      if (!this.enableAddressEdit) {
        this.addressForm.disable();
        this.addressForm.markAsUntouched();
      } else {
        this.addressForm.enable();
        this.addressForm.markAsTouched();
      }
    } else if (formType === FormType.CHILD) {
      this.enableChildEdit = !this.enableChildEdit;
      if (!this.enableChildEdit) {
        this.multipleChildrenDetails().controls.forEach((control) => {
          control.get('name').disable();
          control.get('school').disable();
          control.get('dob').disable();
        });
      } else {
        this.multipleChildrenDetails().controls.forEach((control) => {
          control.get('name').enable();
          control.get('school').enable();
          control.get('dob').enable();
        });
      }
    }
  }

  onAddressBlur() {
    if (!this.enableAddressEdit) {
      this.addressForm.markAsUntouched();
    } else {
      this.addressForm.markAsTouched();
    }
  }

  onAddChildForm() {
    this.multipleChildrenDetails().push(this.childrenForm());
  }
  onRemoveChildForm(index: number) {
    this.multipleChildrenDetails().removeAt(index);
  }
  isRadioDisabled(index: number): boolean {
    return this.multipleChildrenDetails().at(index).get('name').disabled;
  }
}

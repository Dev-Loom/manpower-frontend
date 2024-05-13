import { Soldier } from './models/auth.model';

// export const NAV = {
//   HOME: 'HOME',
//   PERSON: 'PERSON',
//   PROMOTION: 'PROMOTION',
//   COURSES: 'COURSES',
//   CADRES: 'CADRES',
//   LEAVE: 'LEAVE',
//   ERE: 'ERE',
//   ATT: 'ATT',
//   PROFESSIONAL: 'PROFESSIONAL',
//   DISCP: 'DISCP',
//   BPET: 'BPET',
//   PPT: 'PPT',
//   FIRING: 'FIRING',
//   MISC: 'MISC',
// };

export const FieldType = {
  INPUT: 1,
  DATE: 2,
  DROPDOWN: 3,
  CHECKBOX: 4,
  SLIDER: 5,
  RADIO: 6,
};
export const Ranks: any[] = [
  'RFN',
  'LNK',
  'NK',
  'LHAV',
  'HAV',
  'NBSUB',
  'SUB',
  'SUB (HONY LT)',
  'SUB (HONY CAPT)',
  'SUB MAJ',
  'SUB MAJ (HONY LT)',
  'SUB MAJ (HONY CAPT)',
];

export const RankOrder = new Map([
  ['RFN', 1],
  ['LNK', 2],
  ['NK', 3],
  ['LHAV', 4],
  ['HAV', 5],
  ['NBSUB', 6],
  ['SUB', 7],
  ['SUB (HONY LT)', 8],
  ['SUB (HONY CAPT)', 9],
  ['SUB MAJ', 10],
  ['SUB MAJ (HONY LT)', 11],
  ['SUB MAJ (HONY CAPT)', 12],
]);

export const AddressFormFields: any[] = [
  {
    label: 'STATE',
    formControlName: 'state',
    type: 'text',
    formType: FieldType.DROPDOWN,
    options: [],
  },
  {
    label: 'DISTRICT',
    formControlName: 'district',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'TEHSIL',
    formControlName: 'tehsil',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'VILLAGE',
    formControlName: 'vill',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'POLICE STATION',
    formControlName: 'policeStation',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'PIN',
    formControlName: 'pin',
    type: 'number',
    formType: FieldType.INPUT,
  },
  {
    label: 'NEAREST RAILWAY STATION',
    formControlName: 'nrs',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'DISTANCE FROM BORDER',
    formControlName: 'distFromBorder',
    type: 'number',
    formType: FieldType.INPUT,
  },
];

export const FormType = {
  LOGOUT: 1,
  PERSON: 2,
  ADDRESS: 3,
  CHILD: 4,
  COURSES: 5,
  ERE: 6,
  CADRES: 7,
  BPET: 8,
  PPT: 9,
  FIRING: 10,
  DISCP: 11,
  LEAVE: 12,
  AFPP: 13,
  WEAPON: 14,
};

export const DailogType = {
  LOGOUT: 1,
  PERSON_FILTER: 2,
  LEAVE_FILTER: 3,
  COURSE_FILTER: 4,
  CADRE_FILTER: 5,
  ERE_FILTER: 6,
  ATT_FILTER: 7,
};

export const COYName = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  SP: 'SP',
  HQ: 'HQ',
  ALL: 'ALL',
};

export const BloodGroups: string[] = [
  'O+',
  'O-',
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
];

export const Class: string[] = [
  'DOGRA',
  'GURKHA',
  'SIKH',
  'MUSLIM',
  'CLK',
  'TDN',
];

export const Posted: string[] = ['YES', 'NO', 'NRU', 'ESM'];

export const PL: any = {
  A: ['1', '2', '3', 'CHQ'],
  B: ['4', '5', '6', 'CHQ'],
  C: ['7', '8', '9', 'CHQ'],
  D: ['10', '11', '12', 'CHQ'],
  SP: ['GTK', 'R&S', 'ASLT', 'A/TK', 'MOR', 'SIG', 'CHQ'],
  HQ: ['ADM', 'MT', 'MED', 'BHQ', 'CHQ'],
};

const COYNameOption = ['A', 'B', 'C', 'D', 'SP', 'HQ'];

export const ServiceYears = (): number[] => {
  const years = [];
  for (let i = 1; i <= 30; i++) {
    years.push(i);
  }
  return years;
};

export const FilterNumber = {
  Rank: 1,
  COY: 2,
  PL: 3,
  Class: 4,
  BloodGroup: 5,
  Posted: 6,
  ArmyNo: 7,
  ERE: 8,
  Service: 9,
  Age: 10,
  Cadre: 11,
  Course: 12,
  SPL: 13,
  LMC: 14,
};
export const Filters: any[] = [
  {
    label: 'Select Rank',
    options: Ranks,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'rank',
    filterNumber: FilterNumber.Rank,
  },
  {
    label: 'Select COY',
    options: COYNameOption,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'coy',
    filterNumber: FilterNumber.COY,
  },
  {
    label: 'Select PL',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'pl',
    filterNumber: FilterNumber.PL,
  },
  {
    label: 'Select BloodGroup',
    options: BloodGroups,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'bloodGroup',
    filterNumber: FilterNumber.BloodGroup,
  },
  {
    label: 'Select Class',
    options: Class,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'classes',
    filterNumber: FilterNumber.Class,
  },
  {
    label: 'Select Posted',
    options: Posted,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'posted',
    filterNumber: FilterNumber.Posted,
  },
  {
    label: 'Select Service',
    fieldType: FieldType.SLIDER,
    highValue: 30,
    lowValue: 1,
    options: {
      floor: 1,
      ceil: 30,
    },
    filterName1: 'serviceBracketFrom',
    filterName2: 'serviceBracketTo',
    filterNumber: FilterNumber.Service,
  },
  {
    label: 'Select Age',
    fieldType: FieldType.SLIDER,
    highValue: 56,
    lowValue: 18,
    options: {
      floor: 18,
      ceil: 56,
    },
    filterName1: 'fromAge',
    filterName2: 'toAge',
    filterNumber: FilterNumber.Age,
  },
  {
    label: 'Select LMC',
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'lmc',
    filterNumber: FilterNumber.LMC,
    options: ['PERMANENT', 'TEMPORARY'],
  },
];

export const Gradings = [
  'D',
  'AXI',
  'AX',
  'A',
  'AY',
  'AZ',
  'Q',
  'BXI',
  'BX',
  'B',
  'BY',
  'BZ',
  'CX',
  'CY',
  'CZ',
  'E',
  'F',
  'AWAITED',
  'QI',
];

export const DicpTypes = [
  'BLACK INK',
  'RED INK',
  'REPRIMAND',
  'SEVERE REPRIMAND',
  'WARNING',
];

export const LeaveType: string[] = ['AL', 'CL', 'SL', 'FURLOUGH'];

export const LeaveFilterNumber = {
  COY: 1,
  PL: 2,
  RANK: 3,
  TYPE: 4,
  ON_LEAVE: 5,
  YEAR: 6,
  MONTH: 7,
  AVAILED_LEAVE: 8,
};

export const AvailedLeave: string[] = [
  'LESS THAN 30 DAYS',
  'LESS THAN 45 DAYS',
  'LESS THAN 60 DAYS',
  'LESS THAN 75 DAYS',
];
export const Months: any[] = [
  { name: 'Jan', number: 1 },
  { name: 'Feb', number: 2 },
  { name: 'Mar', number: 3 },
  { name: 'Apr', number: 4 },
  { name: 'May', number: 5 },
  { name: 'Jun', number: 6 },
  { name: 'Jul', number: 7 },
  { name: 'Aug', number: 8 },
  { name: 'Sep', number: 9 },
  { name: 'Oct', number: 10 },
  { name: 'Nov', number: 11 },
  { name: 'Dec', number: 12 },
];

export const LeaveFilters: any[] = [
  {
    label: 'Select COY',
    options: COYNameOption,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'coy',
    filterNumber: LeaveFilterNumber.COY,
  },
  {
    label: 'Select PL',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'pl',
    filterNumber: LeaveFilterNumber.PL,
  },
  {
    label: 'Select Type',
    options: LeaveType,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'type',
    filterNumber: LeaveFilterNumber.TYPE,
  },
  {
    label: 'Select Availed Leave',
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'availedLeave',
    filterNumber: LeaveFilterNumber.AVAILED_LEAVE,
    options: AvailedLeave,
  },
  {
    label: 'Select Month',
    options: Months,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'month',
    filterNumber: LeaveFilterNumber.MONTH,
  },
  {
    label: 'Select Year',
    options: [],
    fieldType: FieldType.DATE,
    value: null,
    filterName: 'year',
    filterNumber: LeaveFilterNumber.YEAR,
  },
  {
    label: 'JCO/ORs',
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'rank',
    options: ['JCO', 'ORS'],
    filterNumber: LeaveFilterNumber.RANK,
  },
  {
    label: 'PRESENTLY ON LEAVE',
    fieldType: FieldType.CHECKBOX,
    value: null,
    filterName: 'onLeave',
    filterNumber: LeaveFilterNumber.ON_LEAVE,
  },
];

export const CourseFilters: any[] = [
  {
    label: 'Select COY',
    options: COYNameOption,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'coy',
  },
  {
    label: 'Select PL',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'pl',
  },
  {
    label: 'Select Course Name',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'course',
  },
  {
    label: 'Select Gradings',
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'grading',
    options: Gradings,
  },
  {
    label: 'From Date',
    fieldType: FieldType.DATE,
    value: null,
    filterName: 'fromDate',
  },
  {
    label: 'To Date',
    fieldType: FieldType.DATE,
    value: null,
    filterName: 'toDate',
  },
  {
    label: 'JCO/ORs',
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'rank',
    options: ['JCO', 'ORS'],
  },
  {
    label: 'PRESENTLY ON COURSE',
    fieldType: FieldType.CHECKBOX,
    value: null,
    filterName: 'onCourse',
  },
];

export const EREFilters: any[] = [
  {
    label: 'Select COY',
    options: COYNameOption,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'coy',
  },
  {
    label: 'Select PL',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'pl',
  },
  {
    label: 'Select ERE Name',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'name',
  },
  {
    label: 'Select ERE Duration',
    options: [24, 30, 36],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'duration',
  },
  {
    label: 'PRESENTLY ON ERE',
    fieldType: FieldType.CHECKBOX,
    value: null,
    filterName: 'onEre',
  },
];

export const AttFilters: any[] = [
  {
    label: 'Select COY',
    options: COYNameOption,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'coy',
  },
  {
    label: 'Select PL',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'pl',
  },
  {
    label: 'Select ERE Name',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'name',
  },
  {
    label: 'Enter ATT Duration',
    fieldType: FieldType.INPUT,
    type: 'number',
    value: null,
    filterName: 'duration',
  },
  {
    label: 'PRESENTLY ON ERE',
    fieldType: FieldType.CHECKBOX,
    value: null,
    filterName: 'onAtt',
  },
];

export const CadresFilters: any[] = [
  {
    label: 'Select COY',
    options: COYNameOption,
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'coy',
  },
  {
    label: 'Select Cadre Name',
    options: [],
    fieldType: FieldType.DROPDOWN,
    value: null,
    filterName: 'cadre',
  },
  {
    label: 'Result',
    fieldType: FieldType.RADIO,
    option1: 'PASS',
    option2: 'FAIL',
    value: null,
    filterName: 'result',
  },
  {
    label: 'PRESENTLY ON CADRE',
    fieldType: FieldType.CHECKBOX,
    value: null,
    filterName: 'onCadre',
  },
];

export const Education: string[] = [
  'CLASS 8',
  'MATRICULATION',
  '10 + 2',
  'GRADUATE',
  'POST GRADUATE',
];

export const EducationNumber = new Map([
  ['CLASS 8', 8],
  ['MATRICULATION', 10],
  ['10 + 2', 12],
  ['GRADUATE', 13],
  ['POST GRADUATE', 14],
]);

export const COY: string[] = ['A', 'B', 'C', 'D', 'SP', 'HQ'];

export const personFields: Soldier[] = [
  {
    label: 'Army No.',
    formControlName: 'armyNo',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'Rank',
    formControlName: 'rank',
    type: 'number',
    formType: FieldType.DROPDOWN,
    options: Ranks,
  },
  {
    label: 'APPT',
    formControlName: 'appt',
    type: 'text',
    formType: FieldType.DROPDOWN,
    options: [],
  },
  {
    label: 'Name',
    formControlName: 'name',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'DOB',
    formControlName: 'dob',
    type: 'date',
    formType: FieldType.DATE,
  },
  {
    label: 'DOE',
    formControlName: 'doe',
    type: 'date',
    formType: FieldType.DATE,
  },
  {
    label: 'I Card Number',
    formControlName: 'icard',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'Aadhar Number',
    formControlName: 'aadhar',
    type: 'number',
    formType: FieldType.INPUT,
  },
  {
    label: 'Phone Number',
    formControlName: 'phone',
    type: 'number',
    formType: FieldType.INPUT,
  },
  {
    label: 'PAN',
    formControlName: 'pan',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'COY',
    formControlName: 'coy',
    type: 'text',
    formType: FieldType.DROPDOWN,
    options: COY,
  },
  {
    label: 'PL',
    formControlName: 'pl',
    type: 'number',
    formType: FieldType.DROPDOWN,
    options: [],
  },
  {
    label: 'Height (CM)',
    formControlName: 'height',
    type: 'number',
    formType: FieldType.INPUT,
  },
  {
    label: 'Weight (KG)',
    formControlName: 'weight',
    type: 'number',
    formType: FieldType.INPUT,
  },
  {
    label: 'Bank with Branch Name',
    formControlName: 'bank',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'Account Number',
    formControlName: 'account',
    type: 'number',
    formType: FieldType.INPUT,
  },
  {
    label: "Father's Name",
    formControlName: 'father',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: "Mother's Name",
    formControlName: 'mother',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: "Wife's Name",
    formControlName: 'wife',
    type: 'text',
    formType: FieldType.INPUT,
  },
  {
    label: 'Blood Group',
    formControlName: 'bloodGroup',
    type: 'text',
    formType: FieldType.DROPDOWN,
    options: BloodGroups,
  },
  {
    label: 'Class',
    formControlName: 'class',
    type: 'text',
    formType: FieldType.DROPDOWN,
    options: Class,
  },
  {
    label: 'Posted',
    formControlName: 'posted',
    type: 'text',
    formType: FieldType.DROPDOWN,
    options: Posted,
  },
  {
    label: 'Education',
    formControlName: 'education',
    type: 'text',
    formType: FieldType.DROPDOWN,
    options: Education,
  },
  {
    label: 'Med Cat',
    formControlName: 'medCat',
    type: 'text',
    formType: FieldType.INPUT,
  },
];

export const SIDE_NAV_ITEMS = {
  HOME: { name: 'HOME', route: 'dashboard', navPosition: 1 },
  PERSON: { name: 'PERSON', route: 'person', roleId: 1, navPosition: 2 },
  PROMOTION: { name: 'PROMOTION', roleId: 2, navPosition: 3 },
  COURSES: { name: 'COURSES', route: 'course', roleId: 3, navPosition: 4 },
  CADRES: { name: 'CADRES', route: 'cadre', roleId: 4, navPosition: 5 },
  LEAVE: { name: 'LEAVE', route: 'leave', roleId: 5, navPosition: 6 },
  ERE: { name: 'ERE', route: 'ere', roleId: 6, navPosition: 7 },
  ATT: { name: 'ATT', route: 'att', roleId: 7, navPosition: 8 },
  PROFESSIONAL: { name: 'PROFESSIONAL', navPosition: 9 },
  BPET: { name: 'BPET', roleId: 8 },
  PPT: { name: 'PPT', roleId: 9 },
  FIRING: { name: 'FIRING', roleId: 10 },
  DISCP: { name: 'DISCP', roleId: 11, navPosition: 10 },
  MISC: { name: 'MISC', navPosition: 11 },
  WEAPON: { name: 'WEAPON', navPosition: 12, roleId: 12 },
};

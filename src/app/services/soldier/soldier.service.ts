import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SoldierService {
  constructor(private http: HttpClient) {}

  BASE_URL = environment.base_url;

  addPeron(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/person/addPerson`, data);
  }

  getAllPerson(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/person/getAllPerson`, data);
  }

  getPersonById(id: number) {
    return this.http.get(`${this.BASE_URL}/v1/person/getPersonById?id=${id}`);
  }

  searchByArmyNo(armyNo: string) {
    return this.http.get(
      `${this.BASE_URL}/v1/person/checkArmyNoExist?armyNo=${armyNo}`
    );
  }

  editPersonById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/person/editPersonById`, data);
  }

  editAddress(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/address/editAddressById`, data);
  }

  editChild(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/children/editChildById`, data);
  }

  addAddress(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/address/addAddress`, data);
  }

  addChildDetails(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/children/addChild`, data);
  }

  addPromotion(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/promotion/addPromotion`, data);
  }

  getCourseList() {
    return this.http.get(`${this.BASE_URL}/v1/course/listAllCourseInList`);
  }

  addCourse(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/course/addCourse`, data);
  }

  addCourseList(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/course/addCourseInList`, data);
  }

  getCadresList() {
    return this.http.get(`${this.BASE_URL}/v1/cadre/listAllCadreInList`);
  }

  addCadres(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/cadre/addCadre`, data);
  }

  addCadresList(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/cadre/addCadreInList`, data);
  }

  addLeave(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/leave/addLeave`, data);
  }
  addERE(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/ere/addEre`, data);
  }
  getEREList() {
    return this.http.get(`${this.BASE_URL}/v1/ere/listAllEreInList`);
  }
  addEREList(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/ere/addEreInList`, data);
  }

  addATT(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/att/addAtt`, data);
  }
  addBPET(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/bpet/addBpet`, data);
  }
  addPPT(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/ppt/addPpt`, data);
  }
  addFiring(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/firing/addFiring`, data);
  }
  addDiscp(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/discp/addDiscp`, data);
  }

  getAllLeaves(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/leave/getAllLeaves`, data);
  }

  getAllCourses(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/course/getAllCourse`, data);
  }
  getAllERE(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/ere/getAllEre`, data);
  }
  getAllATT(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/att/getAllAtt`, data);
  }
  getAllCadre(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/cadre/getAllCadre`, data);
  }
  getApptList() {
    return this.http.get(`${this.BASE_URL}/v1/appt/listAllApptInList`);
  }
  addApptList(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/appt/addApptInList`, data);
  }
  editCourseById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/course/editCourseById`, data);
  }
  editEreById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/ere/editEreById`, data);
  }
  editCadreById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/cadre/editCadreById`, data);
  }
  editBpetById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/bpet/editBpetById`, data);
  }
  editPptById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/ppt/editPptById`, data);
  }
  editFiringById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/firing/editFiringById`, data);
  }
  editDiscpById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/discp/editDiscpById`, data);
  }
  editLeaveById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/leave/editLeaveById`, data);
  }
  editAfppById(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/afpp/editAfppById`, data);
  }
  getParadeState() {
    return this.http.get(`${this.BASE_URL}/v1/analytic/paradeState`);
  }
  getLeaveSummary() {
    return this.http.get(`${this.BASE_URL}/v1/analytic/leaveSummery`);
  }
  getBirthday() {
    return this.http.get(`${this.BASE_URL}/v1/analytic/upcomingBirthday`);
  }
  addWeapon(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/weapon/addWeapon`, data);
  }
  editWeapon(data: any) {
    return this.http.post(`${this.BASE_URL}/v1/weapon/editWeaponById`, data);
  }
}

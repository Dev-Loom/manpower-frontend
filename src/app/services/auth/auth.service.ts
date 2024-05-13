import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginData } from '../../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  BASE_URL = environment.base_url;

  login(loginData: LoginData) {
    return this.http.post<any>(`${this.BASE_URL}/v1/admin/login`, loginData);
  }

  getAdminDetails() {
    return this.http.get<any>(`${this.BASE_URL}/v1/admin/getAdminDetail`);
  }
}

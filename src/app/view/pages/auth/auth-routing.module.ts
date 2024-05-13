import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const authRoutingModule: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },
];

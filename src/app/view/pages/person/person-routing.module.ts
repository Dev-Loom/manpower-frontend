import { Route } from '@angular/router';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { PersonListComponent } from './person-list/person-list.component';

export const personRoutingModule: Route[] = [
  {
    path: '',
    component: PersonListComponent,
  },
  {
    path: ':id',
    component:EditPersonComponent
  }
];

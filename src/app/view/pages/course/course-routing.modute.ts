import { Route } from '@angular/router';
import { ViewCourseComponent } from './view-course/view-course.component';

export const courseRoutingModule: Route[] = [
  {
    path: '',
    component: ViewCourseComponent,
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

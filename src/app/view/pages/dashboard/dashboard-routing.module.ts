import { Route } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { SidenavwrapperComponent } from './sidenavwrapper/sidenavwrapper.component';

export const dashboardRoutingModule: Route[] = [
  {
    path: '',
    component: SidenavwrapperComponent,
    children: [
      {
        path: 'dashboard',
        component: HomeComponent,
      },
      {
        path: 'person',
        loadChildren: () =>
          import('../person/person.module').then((m) => m.PersonModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'course',
        loadChildren: () =>
          import('../course/course.module').then((m) => m.CourseModule),
      },
      {
        path: 'cadre',
        loadChildren: () =>
          import('../cadre/cadre.module').then((m) => m.CadreModule),
      },
      {
        path: 'leave',
        loadChildren: () =>
          import('../leave/leave.module').then((m) => m.LeaveModule),
      },
      {
        path: 'ere',
        loadChildren: () =>
          import('../ere/ere.module').then((m) => m.EreModule),
      },
      {
        path: 'att',
        loadChildren: () =>
          import('../att/att.module').then((m) => m.AttModule),
      },
      {
        path: '',
        redirectTo: '/dashboard',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];

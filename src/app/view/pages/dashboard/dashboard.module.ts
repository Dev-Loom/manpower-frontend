import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { dashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddDetailsDialogComponent } from './add-details-dialog/add-details-dialog.component';
import { SidenavwrapperComponent } from './sidenavwrapper/sidenavwrapper.component';
import { LayoutModule } from '../../layout/layout.module';
import { LeftMenuComponent } from './left-menu/left-menu.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddDetailsDialogComponent,
    SidenavwrapperComponent,
    LeftMenuComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(dashboardRoutingModule),
    LayoutModule,
  ],
  exports: [RouterModule],
})
export class DashboardModule {}

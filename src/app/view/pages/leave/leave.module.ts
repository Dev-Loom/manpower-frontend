import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { leaveRoutes } from './leave-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewLeaveComponent } from './view-leave/view-leave.component';

@NgModule({
  declarations: [ViewLeaveComponent],
  imports: [CommonModule, RouterModule.forChild(leaveRoutes), SharedModule],
  exports: [RouterModule],
})
export class LeaveModule {}

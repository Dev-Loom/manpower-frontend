import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { attRoutes } from './att-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewAttComponent } from './view-att/view-att.component';

@NgModule({
  declarations: [ViewAttComponent],
  imports: [CommonModule, RouterModule.forChild(attRoutes), SharedModule],
  exports: [RouterModule],
})
export class AttModule {}

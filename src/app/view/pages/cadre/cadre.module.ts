import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cadreRoutes } from './cadre-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewCadreComponent } from './view-cadre/view-cadre.component';

@NgModule({
  declarations: [ViewCadreComponent],
  imports: [CommonModule, RouterModule.forChild(cadreRoutes), SharedModule],
  exports: [RouterModule],
})
export class CadreModule {}

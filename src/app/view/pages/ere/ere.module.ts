import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ereRoutes } from './ere-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewEreComponent } from './view-ere/view-ere.component';

@NgModule({
  declarations: [ViewEreComponent],
  imports: [CommonModule, RouterModule.forChild(ereRoutes), SharedModule],
  exports: [RouterModule],
})
export class EreModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { personRoutingModule } from './person-routing.module';
import { PersonListComponent } from './person-list/person-list.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { EditCasualtiesComponent } from './edit-person/edit-casualties/edit-casualties.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditProfessionalDetailsComponent } from './edit-person/edit-professional-details/edit-professional-details.component';

@NgModule({
  declarations: [
    PersonListComponent,
    EditPersonComponent,
    EditCasualtiesComponent,
    AddPersonComponent,
    EditProfessionalDetailsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(personRoutingModule),
  ],
})
export class PersonModule {}

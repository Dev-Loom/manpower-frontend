import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { courseRoutingModule } from './course-routing.modute';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewCourseComponent } from './view-course/view-course.component';
import { AddCourseComponent } from './add-course/add-course.component';

@NgModule({
  declarations: [ViewCourseComponent, AddCourseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(courseRoutingModule),
    SharedModule,
  ],
  exports: [RouterModule],
})
export class CourseModule {}

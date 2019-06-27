import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlickCarouselComponent } from './other-components/slick-carousel/slick-carousel.component';
import { StudentListComponent } from './other-components/student-list/student-list.component';
import { NewStudentComponent } from './other-components/new-student/new-student.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SlickCarouselComponent },
  { path: 'student-list', component: StudentListComponent },
  { path: 'student/new-student', component: NewStudentComponent },
  { path: 'student/:id', component: NewStudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

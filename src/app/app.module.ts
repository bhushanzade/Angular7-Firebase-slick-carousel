import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SlickCarouselComponent } from './other-components/slick-carousel/slick-carousel.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { NavbarComponent } from './other-components/navbar/navbar.component';
import { StudentListComponent } from './other-components/student-list/student-list.component';
import { NewStudentComponent } from './other-components/new-student/new-student.component';
import { FormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    SlickCarouselComponent,
    NavbarComponent,
    StudentListComponent,
    NewStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase,'techved-task'),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

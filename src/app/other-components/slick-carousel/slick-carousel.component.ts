import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-slick-carousel',
  templateUrl: './slick-carousel.component.html',
  styleUrls: ['./slick-carousel.component.scss']
})
export class SlickCarouselComponent implements OnInit {

  slideConfig = {"slidesToShow": 4, "slidesToScroll": 1, "autoplay": true, autoplaySpeed: 1000};

  student_list: Student[];

  constructor(private studentService : StudentsService) { 
    this.student_list = [];
  }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents() {
    // this.spinnerService.show();
    const x = this.studentService.getStudentList();
    x.snapshotChanges().subscribe(
      Response => {
        this.student_list = [];
        Response.forEach(element => {
          const y = element.payload.toJSON();
          y["$key"] = element.key;
          this.student_list.push(y as Student);
        });
      }
    );
  }


}

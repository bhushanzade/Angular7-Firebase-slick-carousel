import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentsService } from '../students.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  student_list: Student[];
  student : Student;

  constructor(private studentService : StudentsService,private route: ActivatedRoute,) { 
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

  removeStudent(key: string) {
    if (confirm('Are you sure want to delete this student record?')) {
      this.studentService.deleteStudentRecord(key);
    }
	}


}

import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../student';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit {

  student_list: Student;
  fileToUpload: File = null;
  sub: any;
  constructor(private studentService: StudentsService,private route: ActivatedRoute,private router: Router) {
    this.student_list = new Student();
    this.sub = this.route.snapshot.paramMap.get('id');
    if (this.sub) this.studentService.getStudentById(this.sub).valueChanges().pipe(take(1)).subscribe(data => this.student_list = data);
  }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.student_list.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  create(studentForm: NgForm) {
    let image: File;
    image = this.fileToUpload;

    if (this.sub) this.studentService.updateStudentData(this.sub, studentForm.value, image);

    else this.studentService.createStudentData(studentForm.value, image);

    alert('Student Add Successfully !!');
    this.router.navigateByUrl('/student-list');
  }

}

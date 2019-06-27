import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Student } from './student';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  student_list: AngularFireList<Student[]>;
  student: AngularFireObject<Student>;

  constructor(private db: AngularFireDatabase,private storage: AngularFireStorage,) { 
    this.getStudentList();
  }

  getStudentList() {
    this.student_list = this.db.list("student-list");
    return this.student_list;
  }

  createStudentData(student: Student, file: File){
    let key = this.db.list('student-list').push(student).key;
    //Upload File to firebase Storage
    const path = `student-list` + `/` + key + `/` + student.firstname;
    const storageRef = this.storage.ref(path);
    const uploadTask = this.storage.upload(path,file);
    // Done Uploading and changes into student-list database to add ImageURL
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(data => { 
          student.imageUrl = data;
          this.db.object('student-list/'+key).set(student);
        });
      })
    ).subscribe();
  }


  getStudentById(key) {
		this.student = this.db.object('student-list/' + key);
		return this.student;
  }

  updateStudentData(id, student,file: File) { 
    this.db.object('/student-list/' + id).update(student);
    const path = `student-list` + `/` + id + `/` + student.firstname;
    const storageRef = this.storage.ref(path);
    const uploadTask = this.storage.upload(path,file);
    // Done Uploading and changes into student-list database to add ImageURL
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(data => { 
          student.imageUrl = data;
          this.db.object('student-list/'+id).set(student);
        });
      })
    ).subscribe();
  }

  deleteStudentRecord(key: string) {
		this.student_list.remove(key);
	}
  
}

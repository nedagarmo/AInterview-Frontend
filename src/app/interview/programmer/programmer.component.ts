import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Interview } from '../models/interview';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-programmer',
  templateUrl: './programmer.component.html',
  styleUrls: ['./programmer.component.scss']
})
export class ProgrammerComponent implements OnInit {

  form: FormGroup;
  configDatePicker = {
    format: 'YYYY-MM-DD HH:mm:ss'
  }

  constructor(public dialogRef: MatDialogRef<ProgrammerComponent>,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private calendarService: CalendarService,
              @Inject(MAT_DIALOG_DATA) public data: Interview) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    console.log("entro", this.data)
    this.calendarService.getInterview(this.data.id)
    .subscribe(
      (result: any) => {
        this.form.controls['title'].setValue(result.title)
        this.form.controls['start'].setValue(result.start)
        this.form.controls['end'].setValue(result.end)
        this.form.controls['email'].setValue(result.email)
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.calendarService.deleteInterview()
    .subscribe(
      (result: any) => {
        this.toastr.success("Se ha eliminado la entrevista correctamente");
        this.onNoClick();
      }
    );
  }

  save() {
    const val = this.form.value;

    if (val.title && val.start && val.end && val.email) {
      console.log(this.form.value)
      this.calendarService.interviewProgrammer()
      .subscribe(
        (result: any) => {
          this.toastr.success("Se ha programado la entrevista correctamente");
          this.onNoClick();
        }
      );
    }
    else {
      this.toastr.error('Todos los campos son obligatorios');
    }
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Interview } from '../models/interview';

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
      /**
       * Aca va la peticion para Obtener
      */
      // this.authService.login(val.email, val.password)
      //   .subscribe(
      //     () => {
      //       this.toastr.success("Usuario logueado correctamente!");
      //     }
      //   );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
      /**
       * Aca va la peticion para Eliminar
      */
      // this.authService.login(val.email, val.password)
      //   .subscribe(
      //     () => {
      //       this.toastr.success("Usuario logueado correctamente!");
      //     }
      //   );

      //Una vez se realice la peticion en la response agregar esto
      this.onNoClick();
  }

  save() {
    const val = this.form.value;

    if (val.title && val.start && val.end && val.email) {
      console.log(this.form.value)
      /**
       * Aca va la peticion para crear o editart
      */
      // this.authService.login(val.email, val.password)
      //   .subscribe(
      //     () => {
      //       this.toastr.success("Usuario logueado correctamente!");
      //     }
      //   );

      //Una vez se realice la peticion en la response agregar esto
      this.onNoClick();
    }
    else {
      this.toastr.error('Todos los campos son obligatorios');
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  register() {
    const val = this.form.value;
    if (val.email && val.password && val.fullName && val.rol) {
      this.authService.register(val.email, val.fullName, val.password, val.rol)
        .subscribe(
          () => {
            this.toastr.success("Usuario registrado correctamente!");
            this.router.navigateByUrl('/security/login');
          }
        );
    } else {
      this.toastr.error('Todos los campos son obligatorios');
    }
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private authService: AuthenticationService,
              private router: Router) {

    this.form = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  login() {
      const val = this.form.value;

      if (val.email && val.password) {
          this.authService.login(val.email, val.password)
              .subscribe(
                  (result: any) => {
                    this.toastr.success("Usuario logueado correctamente!");
                    this.router.navigateByUrl('/interview/calendar');
                  }
              );
      }
      else
      {
        this.toastr.error('Todos los campos son obligatorios');
      }
  }

  register() {
    this.router.navigateByUrl('/security/register');
  }

  ngOnInit(): void {
  }
}

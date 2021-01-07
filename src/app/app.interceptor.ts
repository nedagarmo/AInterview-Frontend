import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,
  HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs/internal/observable/throwError';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem("token");

    if (token) {
        request = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + token)
        });
    }

    return next.handle(request).pipe(
      catchError((exception: HttpErrorResponse) => {
        if (exception.status === 401) {
          this.router.navigateByUrl('/login');
        }

        if (exception.status === 400) {
          this.toastr.error(exception.error.message);
        }

        return throwError(exception);
      })
    );
  }
}

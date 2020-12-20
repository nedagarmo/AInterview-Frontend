import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

    constructor(
        private router: Router,
    ) { }

    /*
    * Metodo para la proteccion de rutas
    */
    canActivate() {
        const token = localStorage.getItem('token')
        if(token !== null && token !== undefined) {
          return true
        } else {
          console.log("acceso denegado!");
          this.router.navigateByUrl('/security/login');
          return false
        }
    }
}

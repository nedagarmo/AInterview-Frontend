import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class VerifyTokenGuard implements CanActivate {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    /*
    * Metodo para la proteccion de rutas
    */
    canActivate() {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            this.router.navigateByUrl('/interview/calendar');
            return false
        } else {
            return true
        }
    }
}
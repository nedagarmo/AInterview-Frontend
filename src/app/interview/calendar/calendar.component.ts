import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { AuthenticationService } from '../../security/services/authentication.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  constructor(private authService: AuthenticationService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('/login');
  }

}

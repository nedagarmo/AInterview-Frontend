import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction'
import { AuthenticationService } from '../../security/services/authentication.service'
import { Router } from '@angular/router';
import { ProgrammerComponent } from '../programmer/programmer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponentChield?: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this),
    datesSet: this.handleNavClick.bind(this),
    showNonCurrentDates: true,
    plugins: [interactionPlugin],
    editable: true
  };

  constructor(private authService: AuthenticationService,
    private router: Router, public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  async logout() {
    await this.authService.logout()
    this.router.navigateByUrl('/login');
  }

  /**
   * Metodo que obtiene el evento seleccionado
   * @param arg Propiedades del evento
   */
  handleEventClick(arg: any) {
    let id;
    if (arg.event) {
      id = arg.event.id
    }
    this.openDialog(id)
  }

  /**
   * Metodo que obtiene las propiedades del full calendar
   * @param arg Propiedades del full calendar
   */
  handleNavClick(arg: any) {
    this.getEvents();
  }

  /**
   * Metodo que realiza la apertura del dialogo
   * @param id id del evento
   */
  openDialog(id = null) {
    const dialogRef = this.dialog.open(ProgrammerComponent, {
      width: '370px',
      height: '550px',
      data: {
        id: id
      }
    });

    /**
     * Listener del dialogo
     */
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getEvents()
    });
  }

  /**
   * Metodo para obtener los evento
   */
  async getEvents() {
    let calendarApi = this.calendarComponentChield?.getApi();
    console.log(calendarApi?.getDate().getMonth())  // 0: enero, 1 febrero .....
    /**
     * Aca va la peticion para refrescar los eventos una vez creados o eliminados
    */
    // this.authService.login(val.email, val.password)
    //   .subscribe(
    //     () => {
    //       this.toastr.success("Usuario logueado correctamente!");
    //     }
    //   );
    this.calendarOptions['events'] = [{
      title: 'Entrevista Desarrollador de Software',
      start: '2021-01-06 08:00',
      end: '2021-01-06 09:00',
      id: '1'
    },
    {
      title: 'Entrevista Arquitecto de Software',
      start: '2021-01-07 11:00',
      end: '2021-01-07 12:00',
      id: '2'
    },
    {
      title: 'Entrevista Gerente de Proyectos',
      start: '2021-01-09 15:00',
      end: '2021-01-09 16:00',
      id: '3'
    }]
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) {

  }

  getInterviewList() {
      return this.http.get(environment.backend + '/api/calendar')
          .pipe(shareReplay())
  }

  getInterview(id: any) {
    return this.http.post(environment.backend + '/api/interview', { id })
        .pipe(shareReplay())
  }

  interviewProgrammer() {
    return this.http.post(environment.backend + '/api/programmer', {})
        .pipe(shareReplay())
  }

  deleteInterview() {
    return this.http.post(environment.backend + '/api/programmer', {})
        .pipe(shareReplay())
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Event } from '../../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
   apiURLTalents = "https://talent-backend-tp.herokuapp.com/api/v1/" + "events/"

  constructor(private http:HttpClient) { }

  getEvent(): Observable<Event[]>{
    return this.http.get<Event[]>(this.apiURLTalents)
  }
  createEvent(event: Event): Observable<Event>{
    return this.http.post(this.apiURLTalents, event)
  }
  deleteEvent(eventId: string): Observable<Object>{
    return this.http.delete<Object>(this.apiURLTalents + eventId)
  }
}


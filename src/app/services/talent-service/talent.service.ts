import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Talent } from '../../models/talent';

@Injectable({
  providedIn: 'root'
})
export class TalentService {
   apiURLTalents = "http://localhost:3000/api/v1/" + "talents/"
  constructor(private http:HttpClient) { }

  getTalents(): Observable<Talent[]>{
    return this.http.get<Talent[]>(this.apiURLTalents)
  }
  getTalent(talentId): Observable<Talent>{
    return this.http.get<Talent>(this.apiURLTalents + talentId)
  }
  createTalent(talentData: FormData): Observable<Talent>{
    return this.http.post(this.apiURLTalents, talentData)
  }
  deleteTalent(talentId: string): Observable<Object>{
    return this.http.delete<Object>(this.apiURLTalents + talentId)
  }
  updateTalent(talentData: FormData, productid: string): Observable<Talent>{
    return this.http.put<Talent>(`${this.apiURLTalents}/${productid}`, talentData);
  }
}

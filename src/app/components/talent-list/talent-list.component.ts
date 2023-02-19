import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Talent } from './../../models/talent';
import { TalentService } from 'src/app/services/talent-service/talent.service';



@Component({
  selector: 'app-talent-list',
  templateUrl: './talent-list.component.html',
  styleUrls: ['./talent-list.component.scss']
})
export class TalentListComponent implements OnInit {

    talents: Talent[] = [];

  constructor(private talentService: TalentService, private router: Router) { }

  ngOnInit(): void {
      this.talentService.getTalents().subscribe((talent) => {
      this.talents = talent
    })
  }

  updateTalent(talentid: string){
    this.router.navigateByUrl(`talents/form/${talentid}`)
  }

}

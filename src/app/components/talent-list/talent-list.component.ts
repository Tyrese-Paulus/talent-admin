import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Talent } from './../../models/talent';
import { TalentService } from 'src/app/services/talent-service/talent.service';


@Component({
  selector: 'app-talent-list',
  templateUrl: './talent-list.component.html',
  styleUrls: ['./talent-list.component.scss']
})
export class TalentListComponent implements OnInit, OnDestroy {

    talents: Talent[] = [];
    endsubs$: Subject<any> = new Subject();

  constructor(private talentService: TalentService, private router: Router) { }

  ngOnInit(): void {
      this.talentService.getTalents().pipe(takeUntil(this.endsubs$)).subscribe((talent) => {
      this.talents = talent
    })
  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }
  updateTalent(talentid: string){
    this.router.navigateByUrl(`talents/form/${talentid}`)
  }

}

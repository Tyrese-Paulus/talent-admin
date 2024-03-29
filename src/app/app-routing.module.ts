import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TalentListComponent } from './components/talent-list/talent-list.component'
import { TalentFormComponent } from './components/talent-form/talent-form.component'
import { CalendarComponent } from './components/event-calendar/calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    component: TalentListComponent
  },
  {
    path: 'talents',
    component: TalentListComponent
  },
  {
    path: 'talents/form',
    component: TalentFormComponent
  },
  {
    path: 'talents/form/:id',
    component: TalentFormComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

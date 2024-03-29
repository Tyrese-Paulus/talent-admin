import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { timer, Subject  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { Talent } from 'src/app/models/talent';
import { TalentService } from 'src/app/services/talent-service/talent.service';
import { EventService } from '../../../services/event-service/event.service'

import { MessageService, ConfirmationService } from 'primeng/api';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

export class CalendarComponent implements OnInit, OnDestroy{
  models = new FormControl('')
  talentList: Talent[];
  addEvent = false;
  isSubmited = false;
  editMode = false;
  talents: Talent[];
  startDt;
  endDt;
  allday;
  curentEventId;
  form: FormGroup;
  endsubs$: Subject<any> = new Subject();
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    eventSources: [
      'https://talent-backend-tp.herokuapp.com/api/v1/events'
    ],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private eventService: EventService, private formBuilder: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService, private talentService: TalentService) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title:['', Validators.required],
    })

    if(this.editMode){
      this.eventService
    }

    this._getTalents()

  }

  ngOnDestroy(): void {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  addEventMode(){
    this.addEvent = !this.addEvent
    this.editMode = false
  }

  checkEditMode(id: string){
    if(id){
      this.editMode = true;
      this.curentEventId = id;
    }
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    this.addEventMode()
    this.startDt = selectInfo.startStr
    this.endDt = selectInfo.endStr
    this.allday = selectInfo.allDay
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.addEventMode()
    this.checkEditMode(clickInfo.event.id)
  }

  deleteEvent(id: string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this Event?',
      header: 'Delete Talent',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
    this.eventService.deleteEvent(id).pipe(takeUntil(this.endsubs$)).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
            summary: 'Success',
            detail: `Event is deleted!`
          });
          timer(2000)
          .toPromise()
          .then(() => {
            this.addEventMode();
            window.location.reload();
        });
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Event is not deleted!'
          });
        }
        );
    this.editMode = false;
  }})
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  onSubmit(){

    this.isSubmited = true
    if(this.form.invalid){
      return
    }

    if (this.isSubmited) {
      this.eventService.createEvent({
        title: this.eventForm['title'].value,
        start: this.startDt,
        end: this.endDt,
        allDay: this.allday,
        modelsScheduled: this.models['value']
      }).pipe(takeUntil(this.endsubs$)).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
              summary: 'Success',
              detail: `Event ${this.eventForm['title'].value} is created!`
            });
            timer(2000)
            .toPromise()
            .then(() => {
              window.location.reload()
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Event is not created!'
            });
          }
        );
    }

  }

  get eventForm(){
    return this.form.controls
  }

  _getTalents(){
    this.talentService.getTalents().pipe(takeUntil(this.endsubs$)).subscribe(talents =>{
      this.talentList = talents;
    })
  }

}



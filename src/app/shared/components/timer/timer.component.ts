import { Component, Input, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { Observable, timer } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';
import { Tender } from '../../../types/tender.type';
import { TenderStatusName } from '../../../types/tender-status-name.type';
import { TenderStatusesAll } from '../../../types/tender-status.type';
import { TenderTimer } from '../../../types/tender-timer.type';


@Component({
  selector: 'st-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent extends AbstractTenderComponent implements OnInit, OnDestroy {

  @Input() tender: Tender;
  @Input() isLegendShow: boolean = true;

  @Output() tenderStatusEmitter: EventEmitter<TenderStatusName> = new EventEmitter<TenderStatusName>();

  timerDate: TenderTimer;

  timerTenderStatus: TenderStatusName;

  get TENDER_STATUSES_ALL(): TenderStatusesAll {
    return this.tenderService._TENDER_STATUSES_ALL;
  }


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService,
              protected title: Title,
              protected meta: Meta,
              protected router: Router) {
    super(translateService, tenderService, authService, title, meta);
  }


  ngOnInit(): void {
    this.initParams();

    this.subscriptions.add(
      this.startTimer().subscribe(
        () => this.calculationTimer(new Date(this.tender.dateStart), new Date(this.tender.dateEnd))
      ));
  }


  private initParams(): void {
    this.timerDate = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }


  private startTimer(): Observable<number> {
    const TIMER_PERIOD_MS: number = 1000;
    return timer(0, TIMER_PERIOD_MS);
  }


  private calculationTimer(startDate: Date, endDate: Date): void {
    const CURRENT_DATE: Date = new Date();
    const VAL_START_TIMER: number = startDate.getTime() - CURRENT_DATE.getTime();
    const VAL_END_TIMER: number = endDate.getTime() - CURRENT_DATE.getTime();

    if (endDate.getTime() - startDate.getTime() < 0) {
      this.timerTenderStatus = this.TENDER_STATUSES_ALL.CLOSED;

      if (this.subscriptions) {
        this.subscriptions.unsubscribe();
      }
    } else {
      if (VAL_START_TIMER > 0) {
        this.setDaysHoursMinutesSeconds(VAL_START_TIMER);
        this.timerTenderStatus = this.TENDER_STATUSES_ALL.PLANNED;
      } else {
        if (VAL_END_TIMER < 0) {
          this.timerDate.days = 0;
          this.timerDate.hours = 0;
          this.timerDate.minutes = 0;
          this.timerDate.seconds = 0;

          this.timerTenderStatus = this.TENDER_STATUSES_ALL.CLOSED;

          if (this.subscriptions) {
            this.subscriptions.unsubscribe();
          }
        } else {
          this.setDaysHoursMinutesSeconds(VAL_END_TIMER);
          this.timerTenderStatus = this.TENDER_STATUSES_ALL.ACTIVE;
        }
      }
    }

    this.tenderStatusEmitter.emit(this.timerTenderStatus);
  }


  private setDaysHoursMinutesSeconds(valTimer: number): void {
    this.timerDate.days = Math.floor(valTimer / 1000 / 60 / 60 / 24);

    const VAL_TIMER_WITHOUT_DAYS: number = valTimer - this.timerDate.days * 1000 * 60 * 60 * 24;
    this.timerDate.hours = Math.floor(VAL_TIMER_WITHOUT_DAYS / 1000 / 60 / 60);

    const VAL_TIMER_WITHOUT_HOURS: number = VAL_TIMER_WITHOUT_DAYS - this.timerDate.hours * 60 * 60 * 1000;
    this.timerDate.minutes = Math.floor(VAL_TIMER_WITHOUT_HOURS / 1000 / 60);

    const VAL_TIMER_WITHOUT_MINUTES: number = VAL_TIMER_WITHOUT_HOURS - this.timerDate.minutes * 60 * 1000;
    this.timerDate.seconds = Math.floor(VAL_TIMER_WITHOUT_MINUTES / 1000);
  }

}


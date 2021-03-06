import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Tender } from '../../../types/tender.type';
import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { TenderStatusName } from '../../../types/tender-status-name.type';


@Component({
  selector: 'st-selected-tender',
  templateUrl: './selected-tender.component.html',
  styleUrls: ['./selected-tender.component.scss']
})
export class SelectedTenderComponent extends AbstractTenderComponent implements OnInit {

  loading: boolean;

  tenderStatus: TenderStatusName;

  readonly SPINNER_DIAMETER: number = 120;
  readonly SPINNER_STROKE_WIDTH: number = 4;

  get isCurrentUserCreatedThisTender(): boolean {
    const userEmail: string | null = localStorage.getItem(this.FIREBASE.LOCAL_STORAGE_USER_EMAIL_NAME);

    if (this.selectedTender && this.selectedTender.user) {
      if (userEmail) {
        return userEmail === this.selectedTender.user.email;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  get currencyCode(): string {
    return this.selectedTender.currency ? this.selectedTender.currency.code : this.currencies[0].code;
  }

  get isStatusClosed(): boolean {
    return this.tenderStatus === this.tenderService._TENDER_STATUSES_ALL.CLOSED;
  }

  get isStatusPlanned(): boolean {
    return this.tenderStatus === this.tenderService._TENDER_STATUSES_ALL.PLANNED;
  }


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService,
              protected title: Title,
              protected meta: Meta,
              private route: ActivatedRoute) {
    super(translateService, tenderService, authService, title, meta);
  }


  ngOnInit(): void {
    this.getSelectedTender();
    this.setPageTitle('PAGE_TITLE.SELECTED_TENDER');
    this.setPageDescription('PAGE_DESCRIPTION.SELECTED_TENDER');
  }


  showBestBet(): string {
    let result: string = this.translate('VIEW_TENDER.NO_BEST_BET');

    if (this.selectedTender.bestBet) {
      if (this.isCurrentUserCreatedThisTender || this.selectedTender.isShowBestBet) {
        result = this.selectedTender.bestBet.value + ' ' + this.selectedTender.currency.code;
      } else {
        result = this.translate('VIEW_TENDER.HIDDEN_BY_CREATOR');
      }
    }

    return result;
  }


  setTenderStatus(event: TenderStatusName): void {
    this.tenderStatus = event;
  }


  private getSelectedTender(): void {
    this.loading = true;

    this.route.params.pipe(
      switchMap((data: Params) => this.tenderService.getTenderById(data.id))
    ).subscribe((tender: Tender | null) => {
        if (tender) {
          this.selectedTender = tender;
          this.loading = false;
        } else {
          this.tenderService.openSnackBar(this.translate('VIEW_TENDER.FAILED_TO_LOAD'), this.SNACKBAR.ERROR);
        }
      },
      () => {
        this.tenderService.openSnackBar(this.translate('VIEW_TENDER.FAILED_TO_LOAD'), this.SNACKBAR.ERROR);
      });
  }

}

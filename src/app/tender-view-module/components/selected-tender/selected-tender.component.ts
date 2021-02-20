import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Tender } from '../../../types/tender.type';
import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'st-selected-tender',
  templateUrl: './selected-tender.component.html',
  styleUrls: ['./selected-tender.component.scss']
})
export class SelectedTenderComponent extends AbstractTenderComponent implements OnInit {

  loading: boolean;

  readonly SPINNER_DIAMETER: number = 120;
  readonly SPINNER_STROKE_WIDTH: number = 4;

  get isCurrentUserCreatedThisTender(): boolean {
    const userEmail: string | null = localStorage.getItem(this.FIREBASE.LOCAL_STORAGE_USER_EMAIL);

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


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService,
              private route: ActivatedRoute) {
    super(translateService, tenderService, authService);
  }


  ngOnInit(): void {
    this.getSelectedTender();
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { Tender } from '../../../types/tender.type';
import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';


@Component({
  selector: 'st-selected-tender',
  templateUrl: './selected-tender.component.html',
  styleUrls: ['./selected-tender.component.scss']
})
export class SelectedTenderComponent extends AbstractTenderComponent implements OnInit {

  loading: boolean;
  readonly SPINNER_DIAMETER: number = 120;
  readonly SPINNER_STROKE_WIDTH: number = 4;


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              private route: ActivatedRoute) {
    super(translateService, tenderService);
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

import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

import { TranslateService } from '@ngx-translate/core';

const ITEMS_PER_PAGE = 'MAT_PAGINATOR.ITEMS_PER_PAGE';
const NEXT_PAGE = 'MAT_PAGINATOR.NEXT_PAGE';
const PREV_PAGE = 'MAT_PAGINATOR.PREV_PAGE';
const FIRST_PAGE = 'MAT_PAGINATOR.FIRST_PAGE';
const LAST_PAGE = 'MAT_PAGINATOR.LAST_PAGE';


@Injectable()
export class MatPaginatorNgxTranslateService extends MatPaginatorIntl {

  constructor(private translateService: TranslateService) {
    super();

    this.translateService.onLangChange.subscribe(() => {
      this.getAndInitTranslations();
    });

    this.getAndInitTranslations();
  }


  /** Replace "1-5/10" instead of "1–5 of 10" in paginator */
  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex: number = page * pageSize;
    const endIndex: number = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }


  private getAndInitTranslations(): void {
    this.translateService.get([
      ITEMS_PER_PAGE,
      NEXT_PAGE,
      PREV_PAGE,
      FIRST_PAGE,
      LAST_PAGE,
    ])
      .subscribe((translation: any) => {
        this.itemsPerPageLabel = translation[ITEMS_PER_PAGE];
        this.nextPageLabel = translation[NEXT_PAGE];
        this.previousPageLabel = translation[PREV_PAGE];
        this.firstPageLabel = translation[FIRST_PAGE];
        this.lastPageLabel = translation[LAST_PAGE];

        this.changes.next();
      });
  }

}

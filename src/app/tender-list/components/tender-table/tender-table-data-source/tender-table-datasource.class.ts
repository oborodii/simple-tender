import { EventEmitter } from '@angular/core';
import { Observable, merge, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator/paginator';
import { Sort } from '@angular/material/sort/sort';

import { Tender } from '../../../../types/tender.type';
import { TenderService } from '../../../../tender.service';


/**
 * Data source for the Material Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination and filtering).
 */
export class TenderTableDataSource extends DataSource<Tender> {

  data: Tender[];
  paginator: MatPaginator;
  sort: MatSort;
  subscription: Subscription = new Subscription();
  SNACKBAR_ERROR_TYPE: string = 'snack-bar-error';

  get currentLocale(): string {
    return this.tenderService.currentLocale;
  }


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService) {
    super();

    this.translateService.use(this.currentLocale);

    this.subscription.add(
      this.tenderService.getTenders().subscribe(
        (tenders: Tender[]) => {
          this.tenderService.tenders = tenders;
          this.data = this.tenderService.tenders;
        },
        () => {
          const message: string = this.translateService.instant('LIST.ERROR.GET_TENDERS_SERVER_ERROR');
          this.tenderService.openSnackBar(message, this.SNACKBAR_ERROR_TYPE);
        })
    );
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Tender[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations: [Observable<Tender[]>, EventEmitter<PageEvent>, EventEmitter<Sort>] = [
      this.tenderService.getTenders(),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }


  /**
   * Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Tender[]): Tender[] {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }


  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Tender[]): Tender[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((t1, t2) => {
        const isAsc = this.sort.direction === 'asc';

        switch (this.sort.active) {
          case 'dateStart':
            return compare(String(t1.dateStart), String(t2.dateStart), isAsc);
          case 'dateEnd':
            return compare(String(t1.dateEnd), String(t2.dateEnd), isAsc);
          case 'title':
            return compare(t1.title, t2.title, isAsc);
          case 'description':
            return compare(t1.description, t2.description, isAsc);
          case 'expectedValue':
            return compare(Number(t1.expectedValue), Number(t2.expectedValue), isAsc);
          case 'stepValue':
            return compare(Number(t1.stepValue), Number(t2.stepValue), isAsc);
          case 'id':
            if (t1.id && t2.id) {
              return compare(t1.id, t2.id, isAsc);
            } else {
              return 0;
            }
          default:
            return 0;
        }
      }
    );
  }
}


/** Simple sort comparator for client-side sorting */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

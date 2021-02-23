import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { TenderBet } from '../../../types/tender-bet.type';


@Component({
  selector: 'st-bet-table',
  templateUrl: './bet-table.component.html',
  styleUrls: ['./bet-table.component.scss']
})
export class BetTableComponent extends AbstractTenderComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() bets: TenderBet[];
  @Input() bestBet: TenderBet;
  @Input() currencyCode: string;

  /** The zero-based page index of the displayed list of items. Defaulted to 0 */
  readonly PAGE_INDEX: number = 0;

  /** Number of items to display on a page. Defaulted to 10 */
  readonly PAGE_SIZE: number = 20;

  /** The set of provided page size options to display to the user */
  readonly PAGE_SIZE_OPTION: number[] = [10, 20, 50, 100];

  /** Real number of rows in the table */
  get dataLength(): number {
    return this.bets ? this.bets.length : 0;
  }

  /** Data source for a bet table */
  dataSource: MatTableDataSource<TenderBet>;

  defaultSortParams: Sort = {
    active: 'value',
    direction: 'desc'
  };

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered */
  displayedColumns: string[] = [
    'index',
    'dateTime',
    'value',
    'companyName',
    'companyEmail',
    'comment'
  ];


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService,
              protected router: Router) {
    super(translateService, tenderService, authService);
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.bets);
    this.dataSource.sort = this.sort;

    this.updateAndSortBetsByTimer();
  }


  sortData(sort: Sort = this.defaultSortParams): void {
    if (!sort.active || sort.direction === '') {
      return;
    }

    if (sort.active !== this.defaultSortParams.active || sort.direction !== this.defaultSortParams.direction) {
      this.defaultSortParams = sort;
    }

    const data = this.bets.slice();

    this.dataSource.data = data.sort((bet1: TenderBet, bet2: TenderBet) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'dateTime':
          return compare(String(bet1.dateTime), String(bet2.dateTime), isAsc);
        case 'value':
          return compare(Number(bet1.value), Number(bet2.value), isAsc);
        case 'companyName':
          return compare(String(bet1.user.displayName), String(bet2.user.displayName), isAsc);
        case 'companyEmail':
          return compare(String(bet1.user.email), String(bet2.user.email), isAsc);
        case 'comment':
          return compare(String(bet1.comment), String(bet2.comment), isAsc);
        default:
          return 0;
      }
    });
  }


  isBetTheBest(row: TenderBet): boolean {
    return row.value === this.bestBet.value;
  }


  private updateAndSortBetsByTimer(): void {
    const START_MS: number = 0;
    const PERIOD_MS: number = 500;

    this.subscriptions.add(
      timer(START_MS, PERIOD_MS).subscribe(
        () => this.sortData(this.defaultSortParams)
      )
    );
  }

}


function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

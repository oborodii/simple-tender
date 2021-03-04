import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Tender } from '../../../types/tender.type';
import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { compare } from '../../../shared/functions/compare.function';


@Component({
  selector: 'st-tenders-table',
  templateUrl: './tender-table.component.html',
  styleUrls: ['./tender-table.component.scss']
})
export class TenderTableComponent extends AbstractTenderComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /** The zero-based page index of the displayed list of items. Defaulted to 0 */
  readonly PAGE_INDEX: number = 0;

  /** Number of items to display on a page. Defaulted to 10 */
  readonly PAGE_SIZE: number = 5;

  /** The set of provided page size options to display to the user */
  readonly PAGE_SIZE_OPTION: number[] = [5, 20, 50, 100];

  readonly SPINNER_DIAMETER: number = 19;
  readonly SPINNER_STROKE_WIDTH: number = 1;

  /** Real number of rows in the table */
  get dataLength(): number {
    return this.tenders ? this.tenders.length : 0;
  }

  get tenders(): Tender[] {
    return this.tenderService.tenders;
  }

  set tenders(value: Tender[]) {
    this.tenderService.tenders = value;
  }

  /** Data source for table */
  dataSource: MatTableDataSource<Tender>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered */
  displayedColumns: string[] = [
    'index',
    'dates',
    'title',
    'timer',
    'bestBet',
    'stepValue',
    'user',
    'quantity',
    'id'
  ];


  defaultSortParams: Sort = {
    active: 'dates',
    direction: 'desc'
  };

  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              protected authService: AuthService,
              protected title: Title,
              protected meta: Meta,
              protected router: Router) {
    super(translateService, tenderService, authService, title, meta);
  }


  ngOnInit(): void {
    this.tenders = [];
    this.setPageTitle('PAGE_TITLE.LIST');
    this.setPageDescription('PAGE_DESCRIPTION.LIST');
  }


  ngAfterViewInit(): void {
    this.getTenders();
  }


  applyFilter(event: Event): void {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  selectTender(selectedTender: Tender): void {
    if (selectedTender) {
      this.router.navigate([this.ROUTER_URL.VIEW, selectedTender.id]);
    }
  }


  sortData(sort: Sort = this.defaultSortParams): void {
    if (!sort.active || sort.direction === '') {
      return;
    }

    if (sort.active !== this.defaultSortParams.active || sort.direction !== this.defaultSortParams.direction) {
      this.defaultSortParams = sort;
    }

    this.dataSource.data = this.tenders.sort((tender1: Tender, tender2: Tender) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'dates':
          return compare(String(tender1.dateStart), String(tender2.dateStart), isAsc);
        case 'title':
          return compare(String(tender1.title), String(tender2.title), isAsc);
        case 'bestBet':
          let bestBet1: number = 0;
          let bestBet2: number = 0;
          if (tender1.bestBet) {
            bestBet1 = Number(tender1.bestBet);
          }
          if (tender2.bestBet) {
            bestBet2 = Number(tender2.bestBet);
          }
          return compare(bestBet1, bestBet2, isAsc);
        case 'stepValue':
          return compare(Number(tender1.stepValue), Number(tender2.stepValue), isAsc);
        case 'user':
          let user1: string = '';
          let user2: string = '';
          if (tender1.user && tender1.user.displayName) {
            user1 = tender1.user.displayName;
          }
          if (tender2.user && tender2.user.displayName) {
            user2 = tender2.user.displayName;
          }
          return compare(user1, user2, isAsc);
        case 'quantity':
          return compare(String(tender1.quantity), String(tender2.quantity), isAsc);
        case 'id':
          return compare(String(tender1.id), String(tender2.id), isAsc);
        default:
          return 0;
      }
    });
  }


  /** Load an array of all tenders from the server */
  private getTenders(): void {
    this.subscriptions.add(
      this.tenderService.getTenders().subscribe(
        (tenders: Tender[]) => {
          this.dataSource = new MatTableDataSource(tenders);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.tenders = tenders;
        },
        () => {
          const message: string = this.translate('LIST.ERROR.GET_TENDERS_SERVER_ERROR');
          this.tenderService.openSnackBar(message, this.SNACKBAR.ERROR);
          this.dataSource = new MatTableDataSource();
        })
    );
  }

}


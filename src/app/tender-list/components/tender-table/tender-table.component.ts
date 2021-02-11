import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Tender } from '../../../types/tender.type';
import { AbstractTenderComponent } from '../../../shared/components/abstract-tender/abstract-tender.component';
import { TenderService } from '../../../tender.service';


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
  readonly PAGE_SIZE_OPTION: number[] = [5, 10, 20, 25];

  readonly SPINNER_DIAMETER: number = 19;
  readonly SPINNER_STROKE_WIDTH: number = 1;

  get currentThemePalette(): ThemePalette {
    return this.tenderService._currentThemePalette;
  }

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
    'dateStart',
    'dateEnd',
    'title',
    'description',
    'bestBet',
    'stepValue',
    'quantity',
    'id'
  ];


  constructor(protected translateService: TranslateService,
              protected tenderService: TenderService,
              private router: Router) {
    super(translateService, tenderService);
  }


  ngOnInit(): void {
    this.tenders = [];
  }


  ngAfterViewInit(): void {
    this.getTenders();
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

}
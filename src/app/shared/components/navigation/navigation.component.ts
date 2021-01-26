import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ThemePalette } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../../environments/environment';
import { TenderService } from '../../../tender.service';


@Component({
  selector: 'st-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  get currentThemePalette(): ThemePalette {
    return this.tenderService._currentThemePalette;
  }


  constructor(private tenderService: TenderService,
              private translateService: TranslateService,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }


}

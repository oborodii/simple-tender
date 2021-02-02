import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ThemePalette } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../../environments/environment';
import { TenderService } from '../../../tender.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'st-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  get isUserAuth(): boolean {
    return this.authService.isUserAuth;
  }


  get currentThemePalette(): ThemePalette {
    return this.tenderService._currentThemePalette;
  }


  constructor(private tenderService: TenderService,
              private translateService: TranslateService,
              private authService: AuthService,
              private breakpointObserver: BreakpointObserver
  ) {
  }


  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }


  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }

}

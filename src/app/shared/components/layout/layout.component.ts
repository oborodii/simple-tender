import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ThemePalette } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../../environments/environment';
import { TenderService } from '../../../services/tender.service';
import { AuthService } from '../../../services/auth.service';
import { AbstractTenderComponent } from '../abstract-tender/abstract-tender.component';


@Component({
  selector: 'st-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends AbstractTenderComponent implements OnInit {

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


  constructor(protected tenderService: TenderService,
              protected translateService: TranslateService,
              private authService: AuthService,
              private breakpointObserver: BreakpointObserver,
              private router: Router
  ) {
    super(translateService, tenderService);
  }


  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }


  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();

    this.router.navigate([this.ROUTER_URL.LOGIN]);
  }

}

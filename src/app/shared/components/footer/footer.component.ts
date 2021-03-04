import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'st-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  yearNow: string = String(new Date().getFullYear());

  get APP_CREATION_YEAR(): string {
    return this.authService.APP_CREATION_YEAR;
  }

  get currentThemePalette(): ThemePalette {
    return this.authService._currentThemePalette;
  }

  constructor(private authService: AuthService) {
  }

  isShowCurrentYear(): boolean {
    return Number(this.APP_CREATION_YEAR) - Number(this.yearNow) > 0;
  }

}

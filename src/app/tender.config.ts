import { ThemePalette } from '@angular/material/core';


export class TenderConfig {
  protected readonly _currentThemePalette: ThemePalette = 'primary';

  protected readonly _MIN_MONEY_EXPECTED_VALUE: number = 1;
  protected readonly _MAX_MONEY_EXPECTED_VALUE: number = 1000000000;

}

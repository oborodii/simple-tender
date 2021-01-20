import { Component, OnInit } from '@angular/core';

import { MatSnackBarRef } from '@angular/material/snack-bar/snack-bar-ref';
import { TextOnlySnackBar } from '@angular/material/snack-bar/simple-snack-bar';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

import { TenderService } from '../../../tender.service';


@Component({
  selector: 'st-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  duration: string = '7000';

  constructor(private tenderService: TenderService) {
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string,
               action: string,
               duration: string = this.duration,
               horizontalPosition: MatSnackBarHorizontalPosition = this.horizontalPosition,
               verticalPosition: MatSnackBarVerticalPosition = this.verticalPosition
  ): MatSnackBarRef<TextOnlySnackBar> {
    return this.tenderService.openSnackBar(message, action, duration, horizontalPosition, verticalPosition);
  }
}

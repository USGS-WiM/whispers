import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'app-event-submission-confirm',
  templateUrl: './event-submission-confirm.component.html',
  styleUrls: ['./event-submission-confirm.component.scss']
})
export class EventSubmissionConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: any,
    private eventSubmitConfirm: MatBottomSheetRef<EventSubmissionConfirmComponent>) { }

  ngOnInit() {
  }


  submitEvent() {
    this.eventSubmitConfirm.dismiss();
  }

}

import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {

  errorMessage = '';
  submitLoading = false;

  rawData;

  constructor(
    public bulkUploadDialogRef: MatDialogRef<BulkUploadComponent>,
    public snackBar: MatSnackBar,
    private papa: Papa,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.rawData = e.target.result;
        console.log(this.rawData);
      };

      // TODO: figure out best encoding
      reader.readAsArrayBuffer(inputNode.files[0]);
      // reader.readAsText(inputNode.files[0]);
    }

    const options = {
      complete: (results, file) => {
        console.log('CSV Data Parsed: ', results, file);
      },
      error: (error, file) => {
        console.log('There was an error parsing your CSV file: ', error, file);
      },
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    };

    const x = this.papa.parse(this.rawData, options);
    console.log('X: ', x);

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }


}




import {SelectionModel} from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Search } from '@interfaces/search';
import { SearchService } from '@services/search.service';

import { SearchDialogComponent } from '@search-dialog/search-dialog.component';

import { Router, ActivatedRoute } from '@angular/router';

import { APP_UTILITIES } from '@app/app.utilities';
import { SearchDialogService } from '@app/search-dialog/search-dialog.service';


@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.scss']
})
export class SavedSearchesComponent implements OnInit {

  savedSearchesDataSource: MatTableDataSource<Search>;

  searchDialogRef: MatDialogRef<SearchDialogComponent>;

  errorMessage;
  searches;

  searchDisplayedColumns = [
    'id',
    'data'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _searchService: SearchService,
    private _dialog: MatDialog,
    private searchDialogService: SearchDialogService
  ) {

  }

  ngOnInit() {
    
    this._searchService.getSearches()
      .subscribe(
        (searches) => {
          this.searches = searches;
          this.savedSearchesDataSource = new MatTableDataSource(this.searches);
          this.savedSearchesDataSource.paginator = this.paginator;
          this.savedSearchesDataSource.sort = this.sort;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.savedSearchesDataSource = new MatTableDataSource(this.searches);

  }

}

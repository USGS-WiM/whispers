import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Search } from '@interfaces/search';
import { SearchService } from '@services/search.service';

import { SearchDialogComponent } from '@search-dialog/search-dialog.component';
import { MatSnackBar } from '@angular/material';

import { Router, ActivatedRoute } from '@angular/router';

import { APP_UTILITIES } from '@app/app.utilities';
import { SearchDialogService } from '@app/search-dialog/search-dialog.service';
import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { AdministrativeLevelTwoService } from '@app/services/administrative-level-two.service';
import { EventTypeService } from '@app/services/event-type.service';
import { DiagnosisTypeService } from '@app/services/diagnosis-type.service';
import { DiagnosisService } from '@app/services/diagnosis.service';
import { SpeciesService } from '@app/services/species.service';
import { SearchQuery } from '@app/interfaces/search-query';
import { DisplayQuery } from '@interfaces/display-query';

import { ConfirmComponent } from '@confirm/confirm.component';
import { DisplayValuePipe } from '../pipes/display-value.pipe';


@Component({
  selector: 'app-saved-searches',
  templateUrl: './saved-searches.component.html',
  styleUrls: ['./saved-searches.component.scss']
})
export class SavedSearchesComponent implements OnInit {

  savedSearchesDataSource: MatTableDataSource<Search>;

  searchDialogRef: MatDialogRef<SearchDialogComponent>;
  confirmDialogRef: MatDialogRef<ConfirmComponent>;


  errorMessage;
  searches;
  parsedSearches = [];

  eventTypes = [];
  diagnosisTypes = [];
  diagnoses = [];
  allSpecies = [];
  administrative_level_one = [];
  administrative_level_two = [];

  selection;

  speciesLoading = false;


  searchDisplayedColumns = [
    'select',
    'name',
    'search'
  ];

  @ViewChild(MatPaginator) searchPaginator: MatPaginator;
  @ViewChild(MatSort) searchSort: MatSort;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _searchService: SearchService,
    private dialog: MatDialog,
    private displayValuePipe: DisplayValuePipe,
    private searchDialogService: SearchDialogService,
    private adminLevelOneService: AdministrativeLevelOneService,
    private adminLevelTwoService: AdministrativeLevelTwoService,
    private eventTypeService: EventTypeService,
    private diagnosisTypeService: DiagnosisTypeService,
    private diagnosisService: DiagnosisService,
    private speciesService: SpeciesService,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit() {

    this.speciesLoading = true;

    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<any>(allowMultiSelect, initialSelection);

    this._searchService.getUserDashboardSearches()
      .subscribe(
        (searches) => {
          this.searches = searches;

          for (const search of this.searches) {
            const parsedSearch = APP_UTILITIES.parseSearch(search);
            this.parsedSearches.push(parsedSearch);
          }

          // build a list of relevant adminL1s
          let adminLevelOnes = [];
          for (const parsedSearch of this.parsedSearches) {
            if (parsedSearch.administrative_level_one) {
              for (const adminLevelOne of parsedSearch.administrative_level_one) {
                adminLevelOnes.push(adminLevelOne);
              }
            }
          }

          // query adminL2s from the relevant adminL1 list
          adminLevelOnes = adminLevelOnes.map(function (e) {
            return JSON.stringify(e);
          });
          const adminLevelOneString = adminLevelOnes.join(',');
          this.adminLevelTwoService.queryAdminLevelTwos(adminLevelOneString)
            .subscribe(
              (adminLevelTwos) => {
                this.administrative_level_two = adminLevelTwos;
              },
              error => {
                this.errorMessage = <any>error;
              }
            );

          this.savedSearchesDataSource = new MatTableDataSource(this.parsedSearches);
          this.savedSearchesDataSource.paginator = this.searchPaginator;
          this.savedSearchesDataSource.sort = this.searchSort;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    // get event types from the eventType service
    this.eventTypeService.getEventTypes()
      .subscribe(
        eventTypes => {
          this.eventTypes = eventTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnosis types from the diagnosisType service
    this.diagnosisTypeService.getDiagnosisTypes()
      .subscribe(
        (diagnosisTypes) => {
          this.diagnosisTypes = diagnosisTypes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get diagnoses from the diagnoses service
    this.diagnosisService.getDiagnoses()
      .subscribe(
        (diagnoses) => {
          this.diagnoses = diagnoses;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get adminLevelOnes from the adminLevelOne service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (adminLevelOnes) => {
          this.administrative_level_one = adminLevelOnes;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
    // get species from the species service
    this.speciesService.getSpecies()
      .subscribe(
        (species) => {
          this.allSpecies = species;
          this.speciesLoading = false;
        },
        error => {
          this.errorMessage = <any>error;
          this.speciesLoading = false;
        }
      );


  }

  openSearchDeleteConfirm() {
    this.confirmDialogRef = this.dialog.open(ConfirmComponent,
      {
        disableClose: true,
        data: {
          title: 'Delete Search',
          message: 'Are you sure you want to delete the saved search "' + this.selection.selected[0].name + '" from your profile?',
          confirmButtonText: 'Yes, Delete'
        }
      }
    );

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSearch();
      }
    });
  }

  deleteSearch() {

    if (this.selection.selected.length > 1) {
      alert('you have too many searches selected for removal. select only one.');
    } else if (this.selection.selected.length === 1) {
      this._searchService.delete(this.selection.selected[0])
        .subscribe(
          () => {
            this._searchService.getSearches()
              .subscribe(
                (searches) => {
                  this.selection.clear();

                  this.searches = searches;

                  this.parsedSearches = [];

                  for (const search of this.searches) {
                    const parsedSearch = APP_UTILITIES.parseSearch(search);
                    this.parsedSearches.push(parsedSearch);
                  }

                  this.savedSearchesDataSource = new MatTableDataSource(this.parsedSearches);
                  this.savedSearchesDataSource.paginator = this.searchPaginator;
                  this.savedSearchesDataSource.sort = this.searchSort;

                  this.openSnackBar('Contact Removed', 'OK', 5000);
                },
                error => {
                  this.errorMessage = <any>error;
                }
              );
          },
          error => {
            this.errorMessage = <any>error;
          }
        );
    }
  }

  implementSearch(search) {


    // TODO: currentDiplayQuery needs to be parsed from the search object
    const displayQuery: DisplayQuery = {
      event_type: [],
      diagnosis: [],
      diagnosis_type: [],
      species: [],
      administrative_level_one: [],
      administrative_level_two: [],
      affected_count: search.affected_count,
      affected_count_operator: search.affected_count_operator,
      start_date: search.start_date,
      end_date: search.end_date,
      diagnosis_type_includes_all: search.diagnosis_type_includes_all,
      diagnosis_includes_all: search.diagnosis_includes_all,
      species_includes_all: search.species_includes_all,
      administrative_level_one_includes_all: search.administrative_level_one_includes_all,
      administrative_level_two_includes_all: search.administrative_level_two_includes_all,
      and_params: [],
      complete: search.complete
    };

    if (search.event_type) {
      for (const event_type of search.event_type) {
        displayQuery.event_type.push(this.displayValuePipe.transform(event_type, 'name', this.eventTypes));
      }
    }

    if (search.diagnosis) {
      for (const diagnosis of search.diagnosis) {
        displayQuery.diagnosis.push(this.displayValuePipe.transform(diagnosis, 'name', this.diagnoses));
      }
    }
    if (search.diagnosis_type) {
      for (const diagnosis_type of search.diagnosis_type) {
        displayQuery.diagnosis_type.push(this.displayValuePipe.transform(diagnosis_type, 'name', this.diagnosisTypes));
      }
    }

    if (search.species) {
      for (const species of search.species) {
        displayQuery.species.push(this.displayValuePipe.transform(species, 'name', this.allSpecies));
      }
    }

    if (search.administrative_level_one) {
      for (const adminLevelOne of search.administrative_level_one) {
        displayQuery.administrative_level_one.push(this.displayValuePipe.transform(adminLevelOne, 'name', this.administrative_level_one));
      }
    }

    if (search.administrative_level_two) {
      for (const adminLevelTwo of search.administrative_level_two) {
        displayQuery.administrative_level_two.push(this.displayValuePipe.transform(adminLevelTwo, 'name', this.administrative_level_two));
      }
    }

    sessionStorage.setItem('currentDisplayQuery', JSON.stringify(displayQuery));
    // use displayQuery for display of current query in markup, send to searchDialogService
    this.searchDialogService.setDisplayQuery(displayQuery);

    sessionStorage.setItem('currentSearch', JSON.stringify(search));
    this.searchDialogService.setSearchQuery(search);
    this.router.navigate([`../home/`], { relativeTo: this.route });
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  // From angular material table sample on material api reference site
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.savedSearchesDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.savedSearchesDataSource.data.forEach(row => this.selection.select(row));
  }

}

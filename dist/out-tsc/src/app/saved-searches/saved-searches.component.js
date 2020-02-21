"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var material_2 = require("@angular/material");
var search_service_1 = require("@services/search.service");
var material_3 = require("@angular/material");
var router_1 = require("@angular/router");
var app_utilities_1 = require("@app/app.utilities");
var search_dialog_service_1 = require("@app/search-dialog/search-dialog.service");
var data_updated_service_1 = require("@app/services/data-updated.service");
var administrative_level_one_service_1 = require("@app/services/administrative-level-one.service");
var administrative_level_two_service_1 = require("@app/services/administrative-level-two.service");
var event_type_service_1 = require("@app/services/event-type.service");
var diagnosis_type_service_1 = require("@app/services/diagnosis-type.service");
var diagnosis_service_1 = require("@app/services/diagnosis.service");
var species_service_1 = require("@app/services/species.service");
var confirm_component_1 = require("@confirm/confirm.component");
var display_value_pipe_1 = require("../pipes/display-value.pipe");
var SavedSearchesComponent = /** @class */ (function () {
    function SavedSearchesComponent(router, route, _searchService, dialog, displayValuePipe, searchDialogService, dataUpdatedService, adminLevelOneService, adminLevelTwoService, eventTypeService, diagnosisTypeService, diagnosisService, speciesService, snackBar) {
        var _this = this;
        this.router = router;
        this.route = route;
        this._searchService = _searchService;
        this.dialog = dialog;
        this.displayValuePipe = displayValuePipe;
        this.searchDialogService = searchDialogService;
        this.dataUpdatedService = dataUpdatedService;
        this.adminLevelOneService = adminLevelOneService;
        this.adminLevelTwoService = adminLevelTwoService;
        this.eventTypeService = eventTypeService;
        this.diagnosisTypeService = diagnosisTypeService;
        this.diagnosisService = diagnosisService;
        this.speciesService = speciesService;
        this.snackBar = snackBar;
        this.parsedSearches = [];
        this.eventTypes = [];
        this.diagnosisTypes = [];
        this.diagnoses = [];
        this.allSpecies = [];
        this.administrative_level_one = [];
        this.administrative_level_two = [];
        this.deleteModeOn = false;
        this.speciesLoading = false;
        this.searchesLoading = false;
        this.searchDisplayedColumns = [
            'select',
            'name',
            'search'
        ];
        dataUpdatedService.trigger.subscribe(function (action) {
            if (action === 'refresh') {
                _this.loadSavedSearches();
            }
        });
    }
    SavedSearchesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.speciesLoading = true;
        this.searchesLoading = true;
        var initialSelection = [];
        var allowMultiSelect = true;
        this.selection = new collections_1.SelectionModel(allowMultiSelect, initialSelection);
        this.loadSavedSearches();
        // get event types from the eventType service
        this.eventTypeService.getEventTypes()
            .subscribe(function (eventTypes) {
            _this.eventTypes = eventTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnosis types from the diagnosisType service
        this.diagnosisTypeService.getDiagnosisTypes()
            .subscribe(function (diagnosisTypes) {
            _this.diagnosisTypes = diagnosisTypes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get diagnoses from the diagnoses service
        this.diagnosisService.getDiagnoses()
            .subscribe(function (diagnoses) {
            _this.diagnoses = diagnoses;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get adminLevelOnes from the adminLevelOne service
        this.adminLevelOneService.getAdminLevelOnes()
            .subscribe(function (adminLevelOnes) {
            _this.administrative_level_one = adminLevelOnes;
        }, function (error) {
            _this.errorMessage = error;
        });
        // get species from the species service
        this.speciesService.getSpecies()
            .subscribe(function (species) {
            _this.allSpecies = species;
            _this.speciesLoading = false;
        }, function (error) {
            _this.errorMessage = error;
            _this.speciesLoading = false;
        });
        /*  */
    };
    SavedSearchesComponent.prototype.loadSavedSearches = function () {
        var _this = this;
        this.parsedSearches = [];
        this._searchService.getUserDashboardSearches()
            .subscribe(function (searches) {
            _this.searches = searches;
            _this.searches.reverse();
            for (var _i = 0, _a = _this.searches; _i < _a.length; _i++) {
                var search = _a[_i];
                var parsedSearch = app_utilities_1.APP_UTILITIES.parseSearch(search);
                _this.parsedSearches.push(parsedSearch);
            }
            // build a list of relevant adminL1s
            var adminLevelOnes = [];
            for (var _b = 0, _c = _this.parsedSearches; _b < _c.length; _b++) {
                var parsedSearch = _c[_b];
                if (parsedSearch.administrative_level_one) {
                    for (var _d = 0, _e = parsedSearch.administrative_level_one; _d < _e.length; _d++) {
                        var adminLevelOne = _e[_d];
                        adminLevelOnes.push(adminLevelOne);
                    }
                }
            }
            // query adminL2s from the relevant adminL1 list
            adminLevelOnes = adminLevelOnes.map(function (e) {
                return JSON.stringify(e);
            });
            var adminLevelOneString = adminLevelOnes.join(',');
            _this.adminLevelTwoService.queryAdminLevelTwos(adminLevelOneString)
                .subscribe(function (adminLevelTwos) {
                _this.administrative_level_two = adminLevelTwos;
            }, function (error) {
                _this.errorMessage = error;
            });
            _this.savedSearchesDataSource = new material_1.MatTableDataSource(_this.parsedSearches);
            _this.savedSearchesDataSource.paginator = _this.searchPaginator;
            _this.savedSearchesDataSource.sort = _this.searchSort;
            _this.searchesLoading = false;
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    SavedSearchesComponent.prototype.openSearchDeleteConfirm = function (search) {
        var _this = this;
        // Displaying the search id if the name is blank
        var searchIdentifier = '';
        if (search.name === '') {
            searchIdentifier = 'ID: ' + search.id;
        }
        else {
            searchIdentifier = search.name;
        }
        this.confirmDialogRef = this.dialog.open(confirm_component_1.ConfirmComponent, {
            disableClose: true,
            data: {
                title: 'Delete Search',
                message: 'Are you sure you want to delete the saved search "' + searchIdentifier + '" from your profile?',
                confirmButtonText: 'Yes, Delete',
                showCancelButton: true
            }
        });
        this.confirmDialogRef.afterClosed().subscribe(function (result) {
            if (result === true) {
                _this.deleteSearch(search.id);
            }
        });
    };
    SavedSearchesComponent.prototype.deleteMode = function () {
        this.deleteModeOn = !this.deleteModeOn;
        var element = document.getElementById('searchList');
        element.classList.toggle('deleteModeIndicator');
    };
    SavedSearchesComponent.prototype.deleteSearch = function (id) {
        var _this = this;
        this._searchService.delete(id)
            .subscribe(function () {
            _this.openSnackBar('Search successfully deleted', 'OK', 5000);
            _this.loadSavedSearches();
        }, function (error) {
            _this.errorMessage = error;
            _this.openSnackBar('Error. Search not deleted. Error message: ' + error, 'OK', 8000);
        });
    };
    /* deleteSearch() {
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
    } */
    SavedSearchesComponent.prototype.implementSearch = function (search) {
        if (this.deleteModeOn === false) {
            // TODO: currentDiplayQuery needs to be parsed from the search object
            var displayQuery = {
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
                for (var _i = 0, _a = search.event_type; _i < _a.length; _i++) {
                    var event_type = _a[_i];
                    displayQuery.event_type.push(this.displayValuePipe.transform(event_type, 'name', this.eventTypes));
                }
            }
            if (search.diagnosis) {
                for (var _b = 0, _c = search.diagnosis; _b < _c.length; _b++) {
                    var diagnosis = _c[_b];
                    displayQuery.diagnosis.push(this.displayValuePipe.transform(diagnosis, 'name', this.diagnoses));
                }
            }
            if (search.diagnosis_type) {
                for (var _d = 0, _e = search.diagnosis_type; _d < _e.length; _d++) {
                    var diagnosis_type = _e[_d];
                    displayQuery.diagnosis_type.push(this.displayValuePipe.transform(diagnosis_type, 'name', this.diagnosisTypes));
                }
            }
            if (search.species) {
                for (var _f = 0, _g = search.species; _f < _g.length; _f++) {
                    var species = _g[_f];
                    displayQuery.species.push(this.displayValuePipe.transform(species, 'name', this.allSpecies));
                }
            }
            if (search.administrative_level_one) {
                for (var _h = 0, _j = search.administrative_level_one; _h < _j.length; _h++) {
                    var adminLevelOne = _j[_h];
                    displayQuery.administrative_level_one.push(this.displayValuePipe.transform(adminLevelOne, 'name', this.administrative_level_one));
                }
            }
            if (search.administrative_level_two) {
                for (var _k = 0, _l = search.administrative_level_two; _k < _l.length; _k++) {
                    var adminLevelTwo = _l[_k];
                    displayQuery.administrative_level_two.push(this.displayValuePipe.transform(adminLevelTwo, 'name', this.administrative_level_two));
                }
            }
            sessionStorage.setItem('currentDisplayQuery', JSON.stringify(displayQuery));
            // use displayQuery for display of current query in markup, send to searchDialogService
            this.searchDialogService.setDisplayQuery(displayQuery);
            sessionStorage.setItem('currentSearch', JSON.stringify(search));
            this.searchDialogService.setSearchQuery(search);
            this.router.navigate(["../home/"], { relativeTo: this.route });
        }
        else {
            this.openSearchDeleteConfirm(search);
            // this.deleteSearch();
        }
    };
    SavedSearchesComponent.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration,
        });
    };
    // From angular material table sample on material api reference site
    /** Whether the number of selected elements matches the total number of rows. */
    SavedSearchesComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.savedSearchesDataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    SavedSearchesComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.savedSearchesDataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    __decorate([
        core_1.ViewChild(material_1.MatPaginator),
        __metadata("design:type", material_1.MatPaginator)
    ], SavedSearchesComponent.prototype, "searchPaginator", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatSort),
        __metadata("design:type", material_1.MatSort)
    ], SavedSearchesComponent.prototype, "searchSort", void 0);
    SavedSearchesComponent = __decorate([
        core_1.Component({
            selector: 'app-saved-searches',
            templateUrl: './saved-searches.component.html',
            styleUrls: ['./saved-searches.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_1.ActivatedRoute,
            search_service_1.SearchService,
            material_2.MatDialog,
            display_value_pipe_1.DisplayValuePipe,
            search_dialog_service_1.SearchDialogService,
            data_updated_service_1.DataUpdatedService,
            administrative_level_one_service_1.AdministrativeLevelOneService,
            administrative_level_two_service_1.AdministrativeLevelTwoService,
            event_type_service_1.EventTypeService,
            diagnosis_type_service_1.DiagnosisTypeService,
            diagnosis_service_1.DiagnosisService,
            species_service_1.SpeciesService,
            material_3.MatSnackBar])
    ], SavedSearchesComponent);
    return SavedSearchesComponent;
}());
exports.SavedSearchesComponent = SavedSearchesComponent;
//# sourceMappingURL=saved-searches.component.js.map
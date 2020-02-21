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
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var app_settings_1 = require("@app/app.settings");
var results_count_service_1 = require("@services/results-count.service");
var EventService = /** @class */ (function () {
    function EventService(_http, http, resultsCountService) {
        this._http = _http;
        this.http = http;
        this.resultsCountService = resultsCountService;
        // [x: string]: any;
        // _http for deprecated Http
        this.isloggedIn = app_settings_1.APP_SETTINGS.IS_LOGGEDIN;
    }
    EventService.prototype.getEventDetailsCSV = function (eventID) {
        window.location.href = app_settings_1.APP_SETTINGS.EVENT_DETAILS_URL + eventID + '/flat/?format=csv';
    };
    EventService.prototype.getEventSummaryCSV = function (eventQuery) {
        var queryString = '?';
        if (eventQuery.affected_count !== null && eventQuery.affected_count !== '') {
            queryString = queryString + '&affected_count=' + eventQuery.affected_count.toString();
        }
        if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
            queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
        }
        if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
            queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
        }
        //attempt to handle start date and end date that are referred to differently throughout the app
        if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
            queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
        }
        if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
            queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
        }
        if (eventQuery.event_type && eventQuery.event_type.length > 0) {
            queryString = queryString + '&event_type=' + eventQuery.event_type;
        }
        if (eventQuery.diagnosis && eventQuery.diagnosis.length > 0) {
            queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
        }
        if (eventQuery.diagnosis_type && eventQuery.diagnosis_type.length > 0) {
            queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
        }
        if (eventQuery.species && eventQuery.species.length > 0) {
            queryString = queryString + '&species=' + eventQuery.species;
        }
        if (eventQuery.administrative_level_one && eventQuery.administrative_level_one.length > 0) {
            queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
        }
        if (eventQuery.administrative_level_two && eventQuery.administrative_level_two.length > 0) {
            queryString = queryString + '&administrative_level_two=' + eventQuery.administrative_level_two;
        }
        if (eventQuery.and_params) {
            if (eventQuery.and_params.length > 0) {
                queryString = queryString + '&and_params=' + eventQuery.and_params;
            }
        }
        if (eventQuery.complete === false) {
            queryString = queryString + '&complete=False';
        }
        if (eventQuery.complete === true) {
            queryString = queryString + '&complete=True';
        }
        queryString = queryString + '&format=csv';
        window.location.href = app_settings_1.APP_SETTINGS.EVENTS_SUMMARIES_URL + queryString;
    };
    EventService.prototype.queryEventsCount = function (eventQuery) {
        // console.log(JSON.stringify(eventQuery));
        var queryString = '?no_page';
        if (eventQuery.affected_count !== null && eventQuery.affected_count !== '') {
            queryString = queryString + '&affected_count' + eventQuery.affected_count_operator + '=' + eventQuery.affected_count.toString();
        }
        if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
            queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
        }
        if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
            queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
        }
        if (eventQuery.event_type && eventQuery.event_type.length > 0) {
            queryString = queryString + '&event_type=' + eventQuery.event_type;
        }
        if (eventQuery.diagnosis && eventQuery.diagnosis.length > 0) {
            queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
        }
        if (eventQuery.diagnosis_type && eventQuery.diagnosis_type.length > 0) {
            queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
        }
        if (eventQuery.species && eventQuery.species.length > 0) {
            queryString = queryString + '&species=' + eventQuery.species;
        }
        if (eventQuery.administrative_level_one && eventQuery.administrative_level_one.length > 0) {
            queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
        }
        if (eventQuery.administrative_level_two && eventQuery.administrative_level_two.length > 0) {
            queryString = queryString + '&administrative_level_two=' + eventQuery.administrative_level_two;
        }
        if (eventQuery.and_params) {
            if (eventQuery.and_params.length > 0) {
                queryString = queryString + '&and_params=' + eventQuery.and_params;
            }
        }
        if (eventQuery.complete === false) {
            queryString = queryString + '&complete=False';
        }
        if (eventQuery.complete === true) {
            queryString = queryString + '&complete=True';
        }
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.JSON_HEADERS
        });
        return this._http.get(app_settings_1.APP_SETTINGS.EVENTS_SUMMARIES_URL + 'get_count/' + queryString, options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    EventService.prototype.queryEvents = function (eventQuery) {
        // console.log(JSON.stringify(eventQuery));
        var queryString = '?no_page';
        if (eventQuery.affected_count !== null && eventQuery.affected_count !== '') {
            queryString = queryString + '&affected_count' + eventQuery.affected_count_operator + '=' + eventQuery.affected_count.toString();
        }
        if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
            queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
        }
        if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
            queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
        }
        if (eventQuery.event_type && eventQuery.event_type.length > 0) {
            queryString = queryString + '&event_type=' + eventQuery.event_type;
        }
        if (eventQuery.diagnosis && eventQuery.diagnosis.length > 0) {
            queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
        }
        if (eventQuery.diagnosis_type && eventQuery.diagnosis_type.length > 0) {
            queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
        }
        if (eventQuery.species && eventQuery.species.length > 0) {
            queryString = queryString + '&species=' + eventQuery.species;
        }
        if (eventQuery.administrative_level_one && eventQuery.administrative_level_one.length > 0) {
            queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
        }
        if (eventQuery.administrative_level_two && eventQuery.administrative_level_two.length > 0) {
            queryString = queryString + '&administrative_level_two=' + eventQuery.administrative_level_two;
        }
        if (eventQuery.and_params) {
            if (eventQuery.and_params.length > 0) {
                queryString = queryString + '&and_params=' + eventQuery.and_params;
            }
        }
        if (eventQuery.complete === false) {
            queryString = queryString + '&complete=False';
        }
        if (eventQuery.complete === true) {
            queryString = queryString + '&complete=True';
        }
        var options;
        if (this.isloggedIn) {
            options = new http_1.RequestOptions({
                headers: app_settings_1.APP_SETTINGS.AUTH_JSON_HEADERS
            });
        }
        else {
            options = new http_1.RequestOptions({
                headers: app_settings_1.APP_SETTINGS.JSON_HEADERS
            });
        }
        return this._http.get(app_settings_1.APP_SETTINGS.EVENTS_SUMMARIES_URL + queryString, options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    // Function for retrieving event details given event id
    EventService.prototype.getEventDetails = function (eventID) {
        // TODO: update for use of HttpClient standard, and implement http interceptor
        /////////////////////////////////////////////////
        // do conditional for auth headers
        // let headers;
        // if (sessionStorage.username !== undefined) {
        //   headers = APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS;
        // } else {
        //   headers = APP_SETTINGS.JSON_HEADERS;
        // }
        // return this.http.get(APP_SETTINGS.EVENT_DETAILS_URL + eventID, {
        //   headers: headers,
        //   params: new HttpParams().set('no_page', null)
        // })
        //   .map((res: any) => {
        //     // const response = res.json();
        //     // return res.results;
        //     return <EventDetail>res.json();
        //   })
        //   .catch(this.handleError);
        ////////////////////////////////////////
        var options;
        if (sessionStorage.username !== undefined) {
            options = new http_1.RequestOptions({
                headers: app_settings_1.APP_SETTINGS.MIN_AUTH_JSON_HEADERS
            });
        }
        else {
            options = new http_1.RequestOptions({
                headers: app_settings_1.APP_SETTINGS.JSON_HEADERS
            });
        }
        return this._http.get(app_settings_1.APP_SETTINGS.EVENT_DETAILS_URL + eventID + '?no_page', options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleEventDetailsError));
    };
    // Function for retrieving event summary given event id
    EventService.prototype.getEventSummary = function (eventID) {
        var options;
        if (sessionStorage.username !== undefined) {
            options = new http_1.RequestOptions({
                headers: app_settings_1.APP_SETTINGS.MIN_AUTH_JSON_HEADERS
            });
        }
        else {
            options = new http_1.RequestOptions({
                headers: app_settings_1.APP_SETTINGS.JSON_HEADERS
            });
        }
        return this._http.get(app_settings_1.APP_SETTINGS.EVENTS_SUMMARIES_URL + eventID + '?no_page', options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleEventDetailsError));
    };
    EventService.prototype.getUserDashboardEventSummaries = function () {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.MIN_AUTH_JSON_HEADERS
        });
        return this._http.get(app_settings_1.APP_SETTINGS.EVENTS_SUMMARIES_URL + 'user_events?no_page', options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    EventService.prototype.getUserEvents = function (orderParams, pageNumber, pageSize) {
        var _this = this;
        if (orderParams === void 0) { orderParams = ''; }
        if (pageNumber === void 0) { pageNumber = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        return this.http.get(app_settings_1.APP_SETTINGS.EVENTS_SUMMARIES_URL + 'user_events', {
            headers: app_settings_1.APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS,
            params: new http_2.HttpParams().set('ordering', orderParams).set('page', pageNumber.toString()).set('page_size', pageSize.toString())
        }).pipe(operators_1.map(function (res) {
            // const response = res.json();
            _this.resultsCountService.updateUserEventsResultsCount(res.count);
            return res.results;
        }));
        // .pipe(
        //   map(response => {
        //     response['payload'] = response;
        //     // this.resultsCountService.updateUserEventsResultsCount(response['payload'].count);
        //     return response['payload'].results;
        //     // set a value for length here with observable
        //   })
        // );
    };
    // below is the pagination version of the query events function. may eventually convert home page query to use this pagination approach
    EventService.prototype.queryEventsPage = function (eventQuery, orderParams, pageNumber, pageSize) {
        var _this = this;
        var queryString = '?';
        if (eventQuery.affected_count !== null && eventQuery.affected_count !== '') {
            queryString = queryString + '&affected_count' + eventQuery.affected_count_operator + '=' + eventQuery.affected_count.toString();
        }
        if (eventQuery.start_date !== null && eventQuery.start_date !== '' && eventQuery.start_date !== undefined) {
            queryString = queryString + '&start_date=' + eventQuery.start_date.toString();
        }
        if (eventQuery.end_date !== null && eventQuery.end_date !== '' && eventQuery.end_date !== undefined) {
            queryString = queryString + '&end_date=' + eventQuery.end_date.toString();
        }
        if (eventQuery.event_type && eventQuery.event_type.length > 0) {
            queryString = queryString + '&event_type=' + eventQuery.event_type;
        }
        if (eventQuery.diagnosis && eventQuery.diagnosis.length > 0) {
            queryString = queryString + '&diagnosis=' + eventQuery.diagnosis;
        }
        if (eventQuery.diagnosis_type && eventQuery.diagnosis_type.length > 0) {
            queryString = queryString + '&diagnosis_type=' + eventQuery.diagnosis_type;
        }
        if (eventQuery.species && eventQuery.species.length > 0) {
            queryString = queryString + '&species=' + eventQuery.species;
        }
        if (eventQuery.administrative_level_one && eventQuery.administrative_level_one.length > 0) {
            queryString = queryString + '&administrative_level_one=' + eventQuery.administrative_level_one;
        }
        if (eventQuery.administrative_level_two && eventQuery.administrative_level_two.length > 0) {
            queryString = queryString + '&administrative_level_two=' + eventQuery.administrative_level_two;
        }
        if (eventQuery.and_params) {
            if (eventQuery.and_params.length > 0) {
                queryString = queryString + '&and_params=' + eventQuery.and_params;
            }
        }
        if (eventQuery.complete === false) {
            queryString = queryString + '&complete=False';
        }
        if (eventQuery.complete === true) {
            queryString = queryString + '&complete=True';
        }
        // tslint:disable-next-line:max-line-length
        return this.http.get(app_settings_1.APP_SETTINGS.EVENTS_SUMMARIES_URL + queryString, { headers: app_settings_1.APP_SETTINGS.HTTP_CLIENT_MIN_AUTH_JSON_HEADERS, params: new http_2.HttpParams().set('ordering', orderParams).set('page', pageNumber.toString()).set('page_size', pageSize.toString()) }).pipe(operators_1.map(function (res) {
            // const response = res.json();
            _this.resultsCountService.updateEventQueryResultsCount(res.count);
            return res.results;
        }));
    };
    EventService.prototype.requestCollaboration = function (formValue) {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.MIN_AUTH_TEXT_HEADERS
        });
        return this._http.post(app_settings_1.APP_SETTINGS.EVENTS_URL + formValue.event + '/request_collaboration/', formValue.comment, options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
        // const httpOptions = {
        //   headers: new HttpHeaders({
        //     'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
        //     'Content-Type': 'text/plain',
        //     'Accept': 'application/json'
        //   }),
        //   body: formValue.comment
        // };
        // // below is newer HttpClient method
        // return this.http.post(APP_SETTINGS.EVENTS_URL + formValue.event + '/request_collaboration/', httpOptions).pipe(
        //   map((res: any) => {
        //     // const response = res.json();
        //     return res.results;
        //   }));
    };
    EventService.prototype.alertCollaborators = function (formValue) {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.MIN_AUTH_JSON_HEADERS
        });
        return this._http.post(app_settings_1.APP_SETTINGS.EVENTS_URL + formValue.event + '/alert_collaborator/', formValue, options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    EventService.prototype.create = function (formValue) {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.AUTH_JSON_HEADERS
        });
        return this._http.post(app_settings_1.APP_SETTINGS.EVENTS_URL, formValue, options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    EventService.prototype.update = function (formValue) {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.MIN_AUTH_JSON_HEADERS
        });
        return this._http.put(app_settings_1.APP_SETTINGS.EVENTS_URL + formValue.id + '/', formValue, options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    EventService.prototype.patchUpdate = function (formValue) {
        var options = new http_1.RequestOptions({
            headers: app_settings_1.APP_SETTINGS.MIN_AUTH_JSON_HEADERS
        });
        return this._http.patch(app_settings_1.APP_SETTINGS.EVENTS_URL + formValue.id + '/', formValue, options).pipe(operators_1.map(function (response) { return response.json(); }), operators_1.catchError(this.handleError));
    };
    EventService.prototype.handleError = function (error) {
        console.error(error);
        return rxjs_1.throwError(JSON.stringify(error.json()) || 'Server error');
    };
    EventService.prototype.handleEventDetailsError = function (error) {
        console.error(error);
        return rxjs_1.throwError(error);
    };
    EventService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            http_2.HttpClient,
            results_count_service_1.ResultsCountService])
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map
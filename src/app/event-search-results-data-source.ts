import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { ViewChild } from '@angular/core';

import { Observable ,  BehaviorSubject ,  of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { EventSummary } from '@interfaces/event-summary';
import { EventService } from '@services/event.service';

import { SearchQuery } from '@interfaces/search-query';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

export class EventSearchResultsDataSource implements DataSource<EventSummary> {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    // paginator: MatPaginator;
    // sort: MatSort;

    private resultsSubject = new BehaviorSubject<EventSummary[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private eventService: EventService) { }

    connect(collectionViewer: CollectionViewer): Observable<EventSummary[]> {
        return this.resultsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.resultsSubject.complete();
        this.loadingSubject.complete();
    }

    loadResults(eventQuery: SearchQuery) {

        this.loadingSubject.next(true);

        this.eventService.queryEvents(eventQuery)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(
                eventSummaries => {
                    this.resultsSubject.next(eventSummaries);
                },
                error => {
                    // this.errorMessage = <any>error;
                }
            );


    }

}
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable ,  BehaviorSubject ,  of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { EventSummary } from '@interfaces/event-summary';
import { PageData } from '@interfaces/page-data';
import { EventService } from '@services/event.service';
import { MAT_PAGINATOR_INTL_PROVIDER_FACTORY } from '@angular/material';

export class EventsDataSource implements DataSource<EventSummary> {

    private eventsSubject = new BehaviorSubject<EventSummary[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public eventList: EventSummary[] = [];

    constructor(private eventService: EventService) { }

    queryEvents(searchQuery, orderParams: string, pageNumber, pageSize) {

        this.loadingSubject.next(true);

        this.eventService.queryEventsPage(searchQuery, orderParams, pageNumber, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(
                (results) => {
                    this.eventsSubject.next(results);
                    this.eventList = results;
                }
            );
    }

    // loadEvents(orderParams: string, pageNumber = 1, pageSize = 10) {

    //     this.loadingSubject.next(true);

    //     this.eventService.getUserEvents(orderParams, pageNumber, pageSize).pipe(
    //         catchError(() => of([])),
    //         finalize(() => this.loadingSubject.next(false))
    //     )
    //         .subscribe(
    //             (pageData) => {
    //                 this.eventsSubject.next(pageData);
    //             }
    //         );

    // }

    connect(collectionViewer: CollectionViewer): Observable<EventSummary[]> {
        console.log('Connecting Events data source');
        return this.eventsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.eventsSubject.complete();
        this.loadingSubject.complete();
    }

}


// export class UserEventsDataSource implements DataSource<PageData> {

//     private eventsSubject = new BehaviorSubject<PageData>({ count: null, next: null, previous: null, results: [] });

//     private loadingSubject = new BehaviorSubject<boolean>(false);

//     public loading$ = this.loadingSubject.asObservable();

//     constructor(private eventService: EventService) { }

//     loadEvents(orderParams: string, pageNumber = 1, pageSize = 10) {

//         this.loadingSubject.next(true);

//         this.eventService.getUserEvents(orderParams, pageNumber, pageSize).pipe(
//             catchError(() => of([])),
//             finalize(() => this.loadingSubject.next(false))
//         )
//             .subscribe(
//                 (pageData) => {
//                     this.eventsSubject.next(pageData);
//                 }
//             );

//     }

//     connect(collectionViewer: CollectionViewer): Observable<PageData> {
//         console.log('Connecting data source');
//         return this.eventsSubject.asObservable();
//     }

//     disconnect(collectionViewer: CollectionViewer): void {
//         this.eventsSubject.complete();
//         this.loadingSubject.complete();
//     }

// }

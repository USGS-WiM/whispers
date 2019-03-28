import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { EventSummary } from '@interfaces/event-summary';
import { PageData } from '@interfaces/page-data';
import { EventGroupService } from '@services/event-group.service';
import { MAT_PAGINATOR_INTL_PROVIDER_FACTORY } from '@angular/material';

export class EventGroupsDataSource implements DataSource<EventSummary> {

    private eventsSubject = new BehaviorSubject<EventSummary[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private eventService: EventGroupService) { }

    loadEventGroups(orderParams: string, pageNumber = 1, pageSize = 10) {

        this.loadingSubject.next(true);

        this.eventService.getEventGroups(orderParams, pageNumber, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(
                (pageData) => {
                    this.eventsSubject.next(pageData);
                }
            );

    }

    connect(collectionViewer: CollectionViewer): Observable<EventSummary[]> {
        console.log('Connecting data source');
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

import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { EventGroup } from '@interfaces/event-group';
import { EventGroupService } from '@services/event-group.service';
import { MAT_PAGINATOR_INTL_PROVIDER_FACTORY } from '@angular/material';

export class EventGroupsDataSource implements DataSource<EventGroup> {

    private eventGroupsSubject = new BehaviorSubject<EventGroup[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public eventGroupList: EventGroup[] = [];

    constructor(private eventService: EventGroupService) { }

    loadEventGroups(orderParams: string, pageNumber = 1, pageSize = 20) {

        this.loadingSubject.next(true);

        this.eventService.getEventGroups(orderParams, pageNumber, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(
                (results) => {
                    this.eventGroupsSubject.next(results);
                    this.eventGroupList = results;
                }
            );

    }

    connect(collectionViewer: CollectionViewer): Observable<EventGroup[]> {
        console.log('Connecting data source');
        return this.eventGroupsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.eventGroupsSubject.complete();
        this.loadingSubject.complete();
    }

}

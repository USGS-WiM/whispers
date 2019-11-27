import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable ,  BehaviorSubject ,  of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Circle } from '@interfaces/circle';
import { CircleService } from '@services/circle.service';

export class CirclesDataSource implements DataSource<Circle> {

    private circlesSubject = new BehaviorSubject<Circle[]>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    public circlesList: Circle[] = [];

    constructor(private circleService: CircleService) { }

    loadCircles(orderParams: string, pageNumber = 1, pageSize = 20) {

        this.loadingSubject.next(true);

        this.circleService.getCircles(orderParams, pageNumber, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(
                (results) => {
                    this.circlesSubject.next(results);
                    this.circlesList = results;
                }
            );

    }

    connect(collectionViewer: CollectionViewer): Observable<Circle[]> {
        console.log('Connecting data source');
        return this.circlesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.circlesSubject.complete();
        this.loadingSubject.complete();
    }

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var EventsDataSource = /** @class */ (function () {
    function EventsDataSource(eventService) {
        this.eventService = eventService;
        this.eventsSubject = new rxjs_1.BehaviorSubject([]);
        this.loadingSubject = new rxjs_1.BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
        this.eventList = [];
    }
    EventsDataSource.prototype.queryEvents = function (searchQuery, orderParams, pageNumber, pageSize) {
        var _this = this;
        this.loadingSubject.next(true);
        this.eventService.queryEventsPage(searchQuery, orderParams, pageNumber, pageSize).pipe(operators_1.catchError(function () { return rxjs_1.of([]); }), operators_1.finalize(function () { return _this.loadingSubject.next(false); }))
            .subscribe(function (results) {
            _this.eventsSubject.next(results);
            _this.eventList = results;
        });
    };
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
    EventsDataSource.prototype.connect = function (collectionViewer) {
        console.log('Connecting data source');
        return this.eventsSubject.asObservable();
    };
    EventsDataSource.prototype.disconnect = function (collectionViewer) {
        this.eventsSubject.complete();
        this.loadingSubject.complete();
    };
    return EventsDataSource;
}());
exports.EventsDataSource = EventsDataSource;
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
//# sourceMappingURL=events.datasource.js.map
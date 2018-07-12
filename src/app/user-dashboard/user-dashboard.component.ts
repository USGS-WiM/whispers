import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { ContactService } from '@app/services/contact.service';

import { Contact } from '@interfaces/contact';
import { EventSummary } from '@interfaces/event-summary';

import { EventService } from '@services/event.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  dataSource: MatTableDataSource<EventSummary>;
  contactsDataSource: MatTableDataSource<Contact>;

  errorMessage;
  events;
  contacts;

  selection;

  displayedColumns = [
    'id',
    'event_type_string',
    'affected_count',
    'start_date',
    'end_date',
    'administrativelevelones',
    'administrativeleveltwos',
    'species',
    'eventdiagnoses'
  ];

  contactDisplayedColumns = [
    'select',
    'first_name',
    'last_name',
    'phone_number',
    'email_address',
    'organization'
  ];

  @ViewChild('eventPaginator') paginator: MatPaginator;
  @ViewChild('eventSort') sort: MatSort;

  @ViewChild(MatPaginator) contactPaginator: MatPaginator;
  @ViewChild(MatSort) contactSort: MatSort;

  constructor(
    private _eventService: EventService,
    private _contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    
    //const events: EventSummary[] = this._eventService.getTestData();
    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<Contact>(allowMultiSelect, initialSelection);

    this._contactService.getContacts()
      .subscribe(
        (usercontacts) => {
          this.contacts = usercontacts;
          this.contactsDataSource = new MatTableDataSource(this.contacts);
          this.contactsDataSource.paginator = this.contactPaginator;
          this.contactsDataSource.sort = this.contactSort;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.contactsDataSource = new MatTableDataSource(this.contacts);

    this._eventService.getUserDashboardEventSummaries()
      .subscribe(
        (eventsummaries) => {
          this.events = eventsummaries;
          this.dataSource = new MatTableDataSource(this.events);
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    this.dataSource = new MatTableDataSource(this.events);
  }

  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.contactsDataSource.paginator ? this.contactsDataSource.paginator = this.contactPaginator : null;
          break;
        case 1:
          !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
          !this.dataSource.sort ? this.dataSource.sort = this.sort : null;
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  selectEvent(event) {
    this.router.navigate([`../event/${event.id}`], { relativeTo: this.route });
  }

  // From angular material table sample on material api reference site
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.contactsDataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.contactsDataSource.data.forEach(row => this.selection.select(row));
  }

  formatPhone(phone) {
    let formatted_phone = '';

    if (phone.length == 10) {
      let temp_phone = phone.split('');
      formatted_phone = '(' + temp_phone.slice(0,3).join('') + ') ' + temp_phone.slice(3,6).join('') + '-' + temp_phone.slice(6,10).join('');
    } else {
      formatted_phone = phone;
    }
    
    return formatted_phone;
  }


}

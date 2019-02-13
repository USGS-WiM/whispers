import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';

import { MatDialog, MatDialogRef } from '@angular/material';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Organization } from '@app/interfaces/organization';
import { OrganizationService } from '@services/organization.service';
import { EventOrganizationService } from '@services/event-organization.service';
@Component({
  selector: 'app-add-event-organization',
  templateUrl: './add-event-organization.component.html',
  styleUrls: ['./add-event-organization.component.scss']
})
export class AddEventOrganizationComponent implements OnInit {

  errorMessage = '';
  organizations: Organization[];

  addEventOrganizationForm: FormGroup;

  eventID;

  public filteredOrganizations: ReplaySubject<Organization[]> = new ReplaySubject<Organization[]>(1);
  organizationFilterCtrl: FormControl = new FormControl();

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  submitLoading = false;

  buildAddEventOrganizationForm() {
    this.addEventOrganizationForm = this.formBuilder.group({
      organization: null
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public addEventOrganizationDialogRef: MatDialogRef<AddEventOrganizationComponent>,
    private organizationService: OrganizationService,
    private eventOrganizationService: EventOrganizationService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildAddEventOrganizationForm();

  }

  ngOnInit() {
    this.eventID = this.data.event_id;

    // populate the search select options for the organization control
    this.filteredOrganizations.next(this.data.organizations);

    // listen for search field value changes
    this.organizationFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterOrganization();
      });


  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  private filterOrganization() {
    if (!this.data.organizations) {
      return;
    }
    // get the search keyword
    let search = this.organizationFilterCtrl.value;
    if (!search) {
      this.filteredOrganizations.next(this.data.organizations.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredOrganizations.next(
      // tslint:disable-next-line:max-line-length
      this.data.organizations.filter(organization => organization.name.toLowerCase().indexOf(search) > -1)
    );
  }

  onSubmit(formValue) {

    this.submitLoading = true;

    formValue.event = this.data.event_id;
    this.eventOrganizationService.create(formValue)
      .subscribe(
        (contact) => {
          this.submitLoading = false;
          this.openSnackBar('Event Organization Added', 'OK', 5000);
          this.addEventOrganizationDialogRef.close();
          // place holder for google analytics
          // gtag('event', 'click', {'event_category': 'Event Organization','event_label': 'Event Organization Added, Organization: ' + contact.organization});
        },
        error => {
          this.submitLoading = false;
          this.openSnackBar('Error. Event organization not added. Error message: ' + error, 'OK', 8000);
        }
      );

  }

}

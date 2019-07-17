import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Subject, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';

import { MatDialog, MatDialogRef } from '@angular/material';

import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CirclesDataSource } from '@app/circles/circles.datasource';
import { CircleService } from '@services/circle.service';
import { CircleManagementService } from '@services/circle-management.service';
import { Circle } from '@interfaces/circle';

import { Contact } from '@interfaces/contact';
import { ContactService } from '@services/contact.service';
import { UserService } from '@services/user.service';
declare let gtag: Function;

@Component({
  selector: 'app-circle-management',
  templateUrl: './circle-management.component.html',
  styleUrls: ['./circle-management.component.scss']
})
export class CircleManagementComponent implements OnInit {

  errorMessage = '';
  submitLoading = false;

  dataSource: CirclesDataSource;

  userContactsLoading;

  userContacts: Contact[];

  filteredUserContacts: Observable<any>;
  public filteredContacts: ReplaySubject<Contact[]> = new ReplaySubject<Contact[]>(1);
  contactFilterCtrl: FormControl = new FormControl();

  // contactsSearchControl used for searching User's contacts to retrive email address
  contactsSearchControl: FormControl;

  contactsLoading = true;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  // userLookupControl used to query the User endpoint for user records with matching email addresses
  userLookupControl: FormControl;

  @ViewChild('userInput') userInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete: MatAutocomplete;

  currentUserList;
  newUserList;

  title;
  titleIcon;
  actionButtonText;
  actionButtonIcon;
  circleForm: FormGroup;

  selectedUser;

  matchingUser = null;
  nonMatch = null;

  userAddSubmitLoading = false;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  buildCircleForm() {
    this.circleForm = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      description: '',
      //new_users: this.formBuilder.array([])
      new_users: []
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public circleManagementDialogRef: MatDialogRef<CircleManagementComponent>,
    private circleService: CircleService,
    private circleManagementService: CircleManagementService,
    private contactService: ContactService,
    private userService: UserService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.buildCircleForm();

    this.userLookupControl = new FormControl();
    this.contactsSearchControl = new FormControl();
  }

  ngOnInit() {

    this.dataSource = new CirclesDataSource(this.circleService);

    this.circleForm.get('new_users').setValue([]);

    if (this.data.circle) {
      this.currentUserList = this.data.circle.users;
    }

    this.userContactsLoading = true;
    this.contactService.getContacts()
      .subscribe(
        contacts => {
          this.userContacts = contacts;
          this.userContacts.sort(function (a, b) {
            if (a.last_name < b.last_name) { return -1; }
            if (a.last_name > b.last_name) { return 1; }
            return 0;
          });

          // populate the search select options for the contact control
          this.filteredContacts.next(this.userContacts);

          // listen for search field value changes
          this.contactFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterContact();
            });

          this.userContactsLoading = false;

        },
        error => {
          this.errorMessage = <any>error;
          this.userContactsLoading = false;
        }
      );

    switch (this.data.action) {
      case 'create':
        this.title = 'Create New Circle';
        this.titleIcon = 'fiber_new';
        this.actionButtonText = 'Save';
        this.actionButtonIcon = 'save';
        break;
      case 'edit':
        this.title = 'Update Circle';
        this.titleIcon = 'edit';
        this.actionButtonText = 'Save Changes';
        this.actionButtonIcon = 'save';

        // populate the circleForm
        this.circleForm.patchValue({
          id: this.data.circle.id,
          name: this.data.circle.name,
          description: this.data.circle.description
        });

        for (const user of this.data.circle.users) {
          this.circleForm.value.new_users.push(user.id);
        }

        break;
      case 'addUser':
        this.title = 'Add User to Circle';
        this.titleIcon = 'person_add';
        this.actionButtonText = 'Save Changes';
        this.actionButtonIcon = 'save';

        // populate the circleForm
        this.circleForm.patchValue({
          id: this.data.circle.id,
          name: this.data.circle.name,
          description: this.data.circle.description
        });

        for (const user of this.data.circle.users) {
          this.circleForm.value.new_users.push(user.id);
        }


        break;
      case 'removeUser':
        this.title = 'Remove User from Circle';
        this.titleIcon = 'remove_circle';
        this.actionButtonText = 'Save Changes';
        this.actionButtonIcon = 'save';

        break;
      case 'selectUser':
        this.title = 'Select User for Collaborator List';
        this.titleIcon = 'person_add';
        this.actionButtonText = 'Save Changes';
        this.actionButtonIcon = 'save';
    }
  }

  addContactEmail(selectedContact) {

    if (selectedContact.email === '') {
      this.openSnackBar('This contact has no email address', 'OK', 5000);
    } else {
      this.userLookupControl.setValue(selectedContact.email);
    }
  }

  lookupUser() {

    this.matchingUser = null;
    this.nonMatch = null;

    const emailArray = [];
    emailArray.push(this.userLookupControl.value);

    this.userService.queryUserByEmail(emailArray)
      .subscribe(
        userQueryResponse => {
          console.log(userQueryResponse);

          if (userQueryResponse.matching_users.length > 0) {
            this.matchingUser = userQueryResponse.matching_users[0];
          }

          if (userQueryResponse.no_matching_users.length > 0) {
            this.nonMatch = userQueryResponse.no_matching_users[0];
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  addUserToCircle() {
    this.userAddSubmitLoading = true;

    this.circleForm.value.new_users.push(this.matchingUser.id);

    this.circleService.update(this.circleForm.value)
      .subscribe(
        circle => {
          this.userAddSubmitLoading = false;
          this.openSnackBar('User successfully added to Circle.', 'OK', 5000);
          this.circleManagementService.setCircleReload();
        },
        error => {
          this.errorMessage = <any>error;
          this.userAddSubmitLoading = false;
        }
      );
  }

  // this function exists slightly outside the Circles workflow, though related.
  // this is for adding a verified User to an event's collaborator list (read or write)
  addUserAsCollaborator() {
    this.circleManagementDialogRef.close(this.matchingUser);
  }

  removeUser(id) {

    const index = this.circleForm.value.new_users.indexOf(id);
    if (index > -1) {
      this.circleForm.value.new_users.splice(index, 1);
    }

    for (const user of this.data.circle.users) {
      if (user.id === id) {
        user.removed = true;
      }
    }


  }

  filterContact() {

    // get the search keyword
    let search = this.contactFilterCtrl.value;
    if (!search) {
      this.filteredContacts.next(this.userContacts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredContacts.next(
      // tslint:disable-next-line:max-line-length
      this.userContacts.filter(contact => contact.first_name.toLowerCase().indexOf(search) > -1 || contact.last_name.toLowerCase().indexOf(search) > -1)
    );
  }

  // add(event: MatChipInputEvent): void {
  //   // Add user only when MatAutocomplete is not open
  //   // To make sure this does not conflict with OptionSelected Event
  //   //if (!this.matAutocomplete.isOpen) {
  //   const input = event.input;
  //   const value = event.value;

  //   // Add our email
  //   if ((value || '').trim()) {
  //     this.newUserList.push(value.trim());
  //   }

  //   // Reset the input value
  //   if (input) {
  //     input.value = '';
  //   }

  //   this.userLookupControl.setValue(null);
  //   //}
  // }

  onSubmit(formValue) {

    if (this.data.action === 'create') {

      this.submitLoading = true;

      // if (formValue.new_users.length === 0) {
      //   delete formValue.new_users;
      // }

      this.circleService.create(formValue)
        .subscribe(
          circle => {
            this.submitLoading = false;
            this.openSnackBar('Circle successfully created.', 'OK', 5000);
            this.circleManagementService.setCircleReload();
            this.circleManagementDialogRef.close();
            gtag('event', 'click', {'event_category': 'User Dashboard', 'event_label': 'New Circle Created'});
          },
          error => {
            this.errorMessage = <any>error;
            this.openSnackBar('Error. Circle not created. Error message: ' + error, 'OK', 8000);

          }
        );

    } else if (this.data.action === 'edit') {

      this.submitLoading = true;

      // formValue.new_users = this.users;

      // if (this.currentUserList) {
      //   formValue.new_users = formValue.new_users.concat(this.currentUserList);
      // }

      this.circleService.update(formValue)
        .subscribe(
          circle => {
            this.submitLoading = false;
            this.openSnackBar('Circle successfully updated.', 'OK', 5000);
            this.circleManagementService.setCircleReload();
            this.circleManagementDialogRef.close();

          },
          error => {
            this.errorMessage = <any>error;
            this.openSnackBar('Error. Circle not updated. Error message: ' + error, 'OK', 8000);

          }
        );

    } else if (this.data.action === 'addUser') {
      this.circleManagementDialogRef.close();

    }
  }

}

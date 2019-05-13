import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Observer } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { CanDeactivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { MatDialog, MatDialogRef, MatSelect } from '@angular/material';
import { ConfirmComponent } from '@confirm/confirm.component';
import { EventSubmissionComponent } from '@app/event-submission/event-submission.component';

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<EventSubmissionComponent> {

  confirmDialogRef: MatDialogRef<ConfirmComponent>;
  constructor(public publicDialog: MatDialog) { }

  canDeactivate(
    component: EventSubmissionComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | Promise<boolean> | boolean {

    // Get the current URL
    console.log(state.url);

    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!component.eventSubmissionForm.touched) {

      return true;
    }
    // observable which resolves to true or false when the user decides
    // below commented out return is alternate method using a dialog service to create a window notification
    // return component.dialogService.confirm('Discard changes?');
    return Observable.create((observer: Observer<boolean>) => {
      this.confirmDialogRef = this.publicDialog.open(ConfirmComponent, {
        data: {
          title: 'Are you sure you want to leave?',
          message: 'Any data entered into the form will be lost.',
          showCancelButton: true,
          confirmButtonText: 'Leave this page',
        }
      });

      // resets the boolean observable for the dialog after closing
      this.confirmDialogRef.afterClosed().subscribe(result => {
        observer.next(result);
        observer.complete();
      }, (error) => {
        observer.next(false);
        observer.complete();
      });
    });
  }
}

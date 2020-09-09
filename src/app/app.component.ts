import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';

import { AboutComponent } from '@about/about.component';

import { AuthenticationComponent } from '@authentication/authentication.component';

import { BrowserWarningComponent } from '@browser-warning/browser-warning.component';
import { CurrentUserService } from '@services/current-user.service';

import { APP_SETTINGS } from '@app/app.settings';
import { AuthenticationService } from '@app/services/authentication.service';

import { APP_UTILITIES } from '@app/app.utilities';
import { Notification } from '@app/interfaces/notification';
import { NotificationService } from '@services/notification.service';
import { ResultsCountService } from '@services/results-count.service';

// Needed for scroll to top
import { isPlatformBrowser } from '@angular/common';



import * as $ from 'jquery';
import * as search_api from 'usgs-search-api';
import { UserService } from './services/user.service';
import { ConfirmComponent } from './confirm/confirm.component';
import { RequestPasswordResetComponent } from './request-password-reset/request-password-reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UserRegistrationRoleSelectionComponent } from './user-registration-role-selection/user-registration-role-selection.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  public whispersVersion = '';
  public bannerWarning = '';
  public bannerTextColor = '';
  // public isLoggedIn;
  allNotificationCount;
  unreadNotificationCount;
  firstTenNotifications = [];
  notificationsToDisplay;

  public currentUser;
  private userNotifications;
  private errorMessage;

  aboutDialogRef: MatDialogRef<AboutComponent>;
  authenticationDialogRef: MatDialogRef<AuthenticationComponent>;
  browserWarningDialogRef: MatDialogRef<BrowserWarningComponent>;
  userRegistrationRoleSelectionDialogRef: MatDialogRef<UserRegistrationRoleSelectionComponent>;
  userRegistrationDialogRef: MatDialogRef<UserRegistrationComponent, any>;

  previewNotifications;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public currentUserService: CurrentUserService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private resultsCountService: ResultsCountService,
    private userService: UserService,
  ) {

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    this.resultsCountService.unreadNotificationsCount.subscribe(count => {

      if (count !== this.unreadNotificationCount) {
        // if(this.unreadNotificationCount > 100) {

        // }
        this.unreadNotificationCount = count;
        this.getUserNotifications();
      }
    });
  }

  ngOnInit() {

    this.whispersVersion = APP_SETTINGS.VERSION;

    // this.bannerWarning = APP_SETTINGS.BANNER_WARNING;

    // this.bannerTextColor = APP_SETTINGS.BANNER_TEXT_COLOR;

    // this.isLoggedIn = APP_SETTINGS.IS_LOGGEDIN;

    // if (sessionStorage.getItem('username') === '' || sessionStorage.getItem('username') === undefined) {
    //   this.currentUserService.updateCurrentUser({
    //     'username': ''
    //   });
    // }

    this.route.queryParams.subscribe(params => {
      // TODO: make constants
      const userId = params['user-id'];
      const emailToken = params['email-token'];
      const passwordResetToken = params['password-reset-token'];

      if (userId && emailToken) {
        this.confirmEmailAddress(userId, emailToken);
      } else if (userId && passwordResetToken) {
        this.resetPassword(userId, passwordResetToken);
      }
    })

    if (sessionStorage.getItem('currentUser')) {
      const currentUserObj = JSON.parse(sessionStorage.getItem('currentUser'));
      this.currentUserService.updateCurrentUser(currentUserObj);
    } else {
      this.currentUserService.updateCurrentUser({
        'first_name': '',
        'last_name': '',
        'username': ''
      });
    }

    if (/msie\s|trident\/\//i.test(window.navigator.userAgent)) {
      // if (/msie\s|trident\/|edge\//i.test(window.navigator.userAgent)) {
      this.openBrowserWarningDialog();
    }

    this.getUserNotifications();

    // if ((!!sessionStorage.getItem('username') && !!sessionStorage.getItem('password'))) {

    //   this.currentUserService.updateCurrentUser({
    //     'first_name': sessionStorage.getItem('first_name'),
    //     'last_name': sessionStorage.getItem('last_name')
    //   });

    // } else {
    //   this.currentUserService.updateCurrentUser({
    //     'first_name': '',
    //     'last_name': '',
    //     'username': ''
    //   });
    // }



  }

  getUserNotifications() {

    this.previewNotifications = [];
    this.notificationService.getUserNotifications()
      .subscribe(
        (notifications) => {
          this.userNotifications = notifications;
          this.allNotificationCount = this.userNotifications.length;

          // establish unreadNotifications variable. first contains all notifications
          const unreadNotifications = this.userNotifications;

          // splice out all the read notififcations
          for (let i = unreadNotifications.length - 1; i >= 0; i--) {
            if (unreadNotifications[i].read === true) {
              unreadNotifications.splice(i, 1);
            }
          }
          this.unreadNotificationCount = unreadNotifications.length;

          // if unreadNotifications array is greater than 10, cut it down for the previewNotifications array
          if (unreadNotifications.length > 10) {
            this.previewNotifications = unreadNotifications.slice(0, 10);
          } else {
            this.previewNotifications = unreadNotifications;
          }

        },
        error => {
          this.errorMessage = <any>error;
        }
      );

  }

  openUserDashboard() {
    this.router.navigate([`../userdashboard/`], { relativeTo: this.route });
  }

  openAboutDialog() {
    this.aboutDialogRef = this.dialog.open(AboutComponent, {});
  }

  openBrowserWarningDialog() {
    this.browserWarningDialogRef = this.dialog.open(BrowserWarningComponent, {});
  }

  openUserRegistrationRoleSelectionDialog() {
    this.userRegistrationRoleSelectionDialogRef = this.dialog.open(UserRegistrationRoleSelectionComponent, {
      autoFocus: false
    });
    this.userRegistrationRoleSelectionDialogRef.afterClosed().subscribe(result => {
      if (result === "partner") {
        this.openUserRegistrationDialog("partner");
      } else if (result === "affiliate") {
        this.openUserRegistrationDialog("affiliate");
      } else if (result === "public") {
        this.openUserRegistrationDialog("public");
      }
    });
  }

  openUserRegistrationDialog(type) {

    // Test screen size and for smaller screens, don't set a minWidth for the dialog
    const mediaQueryList = window.matchMedia("(max-width: 400px)");
    this.userRegistrationDialogRef = this.dialog.open(UserRegistrationComponent, {
      minWidth: (mediaQueryList.matches ? 'auto' : '60em'),
      disableClose: true,
      data: {
        title: 'WHISPers Registration',
        titleIcon: 'person',
        showCancelButton: true,
        action_button_text: 'Submit',
        actionButtonIcon: 'send',
        registration_type: type
      }
    });
  }

  logout() {
    if (this.router.url === '/home') {
      location.reload();
    } else {
      this.router.navigate([`../home/`], { relativeTo: this.route });
    }
    this.authenticationService.logout();
  }

  openAuthenticationDialog(data = null) {
    this.authenticationDialogRef = this.dialog.open(AuthenticationComponent, {
      // minWidth: '60%'
      // disableClose: true, data: {
      //   query: this.currentDisplayQuery
      // }
      // height: '75%'
      data: data
    });
    this.authenticationDialogRef.afterClosed().subscribe(result => {
      if (result === "request-password-reset") {
        this.dialog.open(RequestPasswordResetComponent);
      }
    });
  }

  navigateToHome() {
    this.router.navigate([`../home/`], { relativeTo: this.route });
  }


  navigateToEventSubmit() {
    this.router.navigate([`../eventsubmission/`], { relativeTo: this.route });
  }

  navigateNotificationSelect(event) {
    if (!event) {
      // Some notifications need to take the user to the user dashboard
      // for now, to the notifications tab (to be later developed to higher sophistication)
      // 6 is the index number  for the notifications tab
      const tabSpecification: NavigationExtras = { state: { tab: 6 } };
      this.router.navigate([`../userdashboard/`], tabSpecification);

      // the old way, sans tab specification
      // this.router.navigate([`../userdashboard/`], { relativeTo: this.route });
    } else {

      this.router.navigate([`../event/${event}`], { relativeTo: this.route });
    }
  }

  // Scroll to top on each route change
  onActivate(event: any) {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }

  confirmEmailAddress(userId:String, emailToken:String) {

    this.userService.confirmEmail(userId, emailToken)
      .subscribe(
        (user) => {
          // Route to /home/ to remove the verification query parameters
          return this.router.navigate(['/home/'])
          .then(() => {
            this.openAuthenticationDialog({userEmailVerified: true});
          })
        },
        error => {
          let errorMessage = error;
          try {
            errorMessage = JSON.parse(error).status;
          } catch (error) {
            // Ignore JSON parsing error
          }
          const confirmDialogRef = this.dialog.open(ConfirmComponent,
            {
              disableClose: true,
              data: {
                title: 'Email Verification Failed',
                titleIcon: 'warning',
                message: 'Failed to verify your email address: ' + errorMessage,
                confirmButtonText: 'OK',
                showCancelButton: false
              }
            }
          );
        }
      );
  }

  resetPassword(userId: String, passwordResetToken: String) {

    // Route to /home/ to remove the password reset token query parameters
    return this.router.navigate(['/home/'])
    .then(() => {
      this.dialog.open(ResetPasswordComponent, {
        data: {
          userId: userId,
          passwordResetToken: passwordResetToken
        }
      });
    });
  }
}

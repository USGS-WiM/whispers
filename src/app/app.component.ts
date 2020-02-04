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

// Needed for scroll to top
import { isPlatformBrowser } from '@angular/common';



import * as $ from 'jquery';
import * as search_api from 'usgs-search-api';

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
  notificationCount;
  firstTenNotifications = [];
  dummyNotifications = APP_UTILITIES.dummyData;
  notificationsToDisplay;

  public currentUser;
  private userNotifications;
  private errorMessage;

  aboutDialogRef: MatDialogRef<AboutComponent>;
  authenticationDialogRef: MatDialogRef<AuthenticationComponent>;
  browserWarningDialogRef: MatDialogRef<BrowserWarningComponent>;

  previewNotifications;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public currentUserService: CurrentUserService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
  ) {

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
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

    this.notificationService.getUserNotifications()
      .subscribe(
        (notifications) => {
          this.userNotifications = notifications;
          this.notificationCount = this.userNotifications.length;
          this.previewNotifications = this.userNotifications.slice(0, 10);

          // if (this.userNotifications.length > 10) {
          //   this.previewNotifications = this.userNotifications.slice(0, 10);
          // } else {
          //   this.previewNotifications = this.userNotifications;
          // }

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

  logout() {
    if (this.router.url === '/home') {
      location.reload();
    } else {
      this.router.navigate([`../home/`], { relativeTo: this.route });
    }
    this.authenticationService.logout();
  }

  openAuthenticationDialog() {
    this.authenticationDialogRef = this.dialog.open(AuthenticationComponent, {
      // minWidth: '60%'
      // disableClose: true, data: {
      //   query: this.currentDisplayQuery
      // }
      // height: '75%'
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
}

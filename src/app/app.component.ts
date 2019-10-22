import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';

import { AboutComponent } from '@about/about.component';

import { AuthenticationComponent } from '@authentication/authentication.component';

import { BrowserWarningComponent } from '@browser-warning/browser-warning.component';
import { CurrentUserService } from '@services/current-user.service';

import { APP_SETTINGS } from '@app/app.settings';
import { AuthenticationService } from '@app/services/authentication.service';


// Needed for scroll to top
import { isPlatformBrowser } from '@angular/common';



import * as $ from 'jquery';
import * as search_api from 'usgs-search-api';

export interface Notification {
  notification: string;
  event_id: number;
}

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
  public currentUser;

  // dummy data to work with. delete once notifications backend complete
  dummyNotifications: Notification[] = [
    {notification: 'Mark Adams has added a species to Event 170666.', event_id: 170666},
    {notification: 'Barb Smith has added a diagnosis to event 170131.', event_id: 170131},
    {notification: 'An event with E.coli in Minnesota has been added: Event 170676.', event_id: 170676},
    {notification: 'Jane Farmington (a member of your organization) has added an Event: Event 170773.', event_id: 170773},
    {notification: 'An event with White-tailed deer in Minnesota or Wisconsin with the diagnosis Chronic wasting disease has been added: Event 170220.', event_id: 170220},
  ];

  aboutDialogRef: MatDialogRef<AboutComponent>;
  authenticationDialogRef: MatDialogRef<AuthenticationComponent>;
  browserWarningDialogRef: MatDialogRef<BrowserWarningComponent>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public currentUserService: CurrentUserService,
    private authenticationService: AuthenticationService
  ) {

    currentUserService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {

    this.whispersVersion = APP_SETTINGS.VERSION;

    this.bannerWarning = APP_SETTINGS.BANNER_WARNING;

    this.bannerTextColor = APP_SETTINGS.BANNER_TEXT_COLOR;

    //this.isLoggedIn = APP_SETTINGS.IS_LOGGEDIN;

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
      //if (/msie\s|trident\/|edge\//i.test(window.navigator.userAgent)) {
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
      //minWidth: '60%'
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
      // For some cases need to redirect to the user dashboard
      this.router.navigate([`../userdashboard/`], { relativeTo: this.route });
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

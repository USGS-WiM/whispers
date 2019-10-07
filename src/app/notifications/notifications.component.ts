import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  /* Toggle hints for 'Owned and Collaborating Events Notifications' */
  toggle1;
  toggle2;
  toggle3;

  constructor() { }

  ngOnInit() {
  }

}

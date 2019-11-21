import { Component, OnInit, Input } from '@angular/core';

import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { APP_SETTINGS } from '@app/app.settings';
import { APP_UTILITIES } from '@app/app.utilities';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { EventDetail } from '@interfaces/event-detail';
declare let gtag: Function;

@Component({
  selector: 'app-event-public-report',
  templateUrl: './event-public-report.component.html',
  styleUrls: ['./event-public-report.component.scss']
})

export class EventPublicReportComponent implements OnInit {
  @Input('eventData') eventData: EventDetail;
  canvas = document.createElement('canvas');

  constructor() { }

  ngOnInit() {
  }

  printToPDF() {
    // google analytics event
    gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Downloaded Event Report' });
    const whispersLogo = 'src/app/event-details/logo.png'; // TODO: move photo to more appropriate location

    // Getting date/time for timestamp
    const date = APP_UTILITIES.getDateTime;

    // event details
    const data = this.eventData;

    // looping thru all organizations incase there are multiple
    const organizations = [];
    for ( const organzation of data.eventorganizations) {
      organizations.push(organzation.organization.name);
    }
    console.log(organizations);

    // converting whipsers logo png to a dataURL for use in pdfMake
    // TODO it works, but the image i think is getting hidden by other elements, need to fine tune this (maybe with the pdfmake sizing settings)
    const context = this.canvas.getContext('2d');
    const base_image = new Image();
    base_image.src = whispersLogo;
    base_image.onload = function(){
      context.drawImage(base_image, 100, 100);
    };

    const pngURL = this.canvas.toDataURL();
    console.log(pngURL);

    // print template
    console.log('print');
    const docDefinition = {
      pageOrientation: 'landscape',
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL
            },
            {
              text: 'Summary of ' + data.event_type_string + ' Event ID ' + data.id
            },
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [100, 200],
                body: [
                  [{text: 'Contact Organziation(s)', bold: true}, organizations],
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [100, 200],
                body: [
                  [{text: 'Record Status', bold: true}, data.event_status_string],
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [100, 200],
                body: [
                  [{text: 'Report Generated On', bold: true}, date],
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        {
          text: 'Summary Information',
          style: 'header',
          margin: [10, 10]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                body: [
                  [{text: '# of Locations', bold: true}, date],
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                body: [
                  [{text: 'County', bold: true}, date],
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                body: [
                  [{text: 'Event Diagnosis', bold: true}, date],
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                body: [
                  [{text: 'Diagnostic Laboratory', bold: true}, date],
                ]
              },
              layout: 'noBorders'
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                body: [
                  [{text: '# of Animals Affected', bold: true}, date],
                ]
              },
              layout: 'noBorders'
            }
          ]
        }
      ],
      images: {
        logo: pngURL
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        },
        smaller: {
          fontSize: 10
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    };
    pdfMake.createPdf(docDefinition).download();
  }

}

import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Inject } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfMake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

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

export class EventPublicReportComponent implements OnInit, AfterViewInit {
  canvas = document.createElement('canvas');
  loadingData = false;
  labs;
  eventLocsPlusDiagnoses;

  // creating variables for field definitions
  eventTypeDefinition = '';
  eventIdDefinition = '';
  contactOrgDefinition = '';
  recordStatusDefinition = '';
  numberOfLocationsDefinition = '';
  countyDefinition = '';
  eventDiagDefinition = '';
  labDefinition = '';
  numAnimalsAffectedDefinition = '';
  numSpeciesAffectedDefinition = '';
  speceisMostAffectedDefinition = '';
  startEndDatesDefinition = '';
  associatedEventsDefinition = '';
  eventVisibilityDefinition = '';
  stateDefinition = '';
  countryDefinition = '';
  startDateDefinition = '';
  endDateDefinition = '';
  speciesDefinition = '';
  populationDefinition = '';
  knownSickDefinition = '';
  knownDeadDefinition = '';
  estSickDefinition = '';
  estDeadDefinition = '';
  captiveDefinition = '';
  speciesDiagDefinition = '';
  numAssessedDefinition = '';
  numWithDiagDefinition = '';
  diagLabDefinition = '';
  commentTypeDefinition = '';
  commentSourceDefinition = '';

  constructor(
    public eventPublicReportDialogRef: MatDialogRef<EventPublicReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.loadingData = true;
    // creating variables for field definitions
    this.eventTypeDefinition = FIELD_HELP_TEXT.editEventTypeTooltip;
    this.eventIdDefinition = FIELD_HELP_TEXT.eventIDTooltip;
    this.contactOrgDefinition = FIELD_HELP_TEXT.contactOrganizationTooltip;
    this.recordStatusDefinition = FIELD_HELP_TEXT.recordStatusTooltip;
    this.numberOfLocationsDefinition = FIELD_HELP_TEXT.numberOfLocationsDefinition;
    this.countyDefinition = FIELD_HELP_TEXT.countyTooltip;
    this.eventDiagDefinition = FIELD_HELP_TEXT.eventDiagnosisTooltip;
    this.labDefinition = FIELD_HELP_TEXT.editLabTooltip;
    this.numAnimalsAffectedDefinition = FIELD_HELP_TEXT.numberAffectedTooltip;
    this.numSpeciesAffectedDefinition = FIELD_HELP_TEXT.numberOfSpeciesDefinition;
    this.speceisMostAffectedDefinition = FIELD_HELP_TEXT.speciesMostAffectedDefinition;
    this.startEndDatesDefinition = FIELD_HELP_TEXT.startEndDatesDefinition;
    this.associatedEventsDefinition = FIELD_HELP_TEXT.eventGroupIDTooltip;
    this.eventVisibilityDefinition = FIELD_HELP_TEXT.associatedEventDefinition;
    this.stateDefinition = FIELD_HELP_TEXT.stateTooltip;
    this.countryDefinition = FIELD_HELP_TEXT.countryTooltip;
    this.startDateDefinition = FIELD_HELP_TEXT.eventStartDateTooltip;
    this.endDateDefinition = FIELD_HELP_TEXT.eventEndDateTooltip;
    this.speciesDefinition = FIELD_HELP_TEXT.editSpeciesTooltip;
    this.speciesDefinition = FIELD_HELP_TEXT.populationTooltip;
    this.knownSickDefinition = FIELD_HELP_TEXT.knownSickTooltip;
    this.knownDeadDefinition = FIELD_HELP_TEXT.knownDeadTooltip;
    this.estSickDefinition = FIELD_HELP_TEXT.estimatedSickTooltip;
    this.estDeadDefinition = FIELD_HELP_TEXT.estimatedDeadTooltip;
    this.captiveDefinition = FIELD_HELP_TEXT.captiveTooltip;
    this.speciesDiagDefinition = FIELD_HELP_TEXT.speciesDiagnosisTooltip;
    this.numAssessedDefinition = FIELD_HELP_TEXT.numberAssessedTooltip;
    this.numWithDiagDefinition = FIELD_HELP_TEXT.numberWithDiagnosisTooltip;
    this.diagLabDefinition = FIELD_HELP_TEXT.editLabTooltip;
    this.commentTypeDefinition = FIELD_HELP_TEXT.locationCommentTypeTooltip;
    this.commentSourceDefinition = FIELD_HELP_TEXT.commentSourceDefinition;

    // converting whipsers logo png to a dataURL for use in pdfMake
    const whispersLogo = 'src/app/event-public-report/logo.png'; // TODO: move photo to more appropriate location
    const context = this.canvas.getContext('2d');
    const base_image = new Image();
    base_image.src = whispersLogo;
    base_image.onload = function () {
      context.drawImage(base_image, 5, 5, 300, 80);
    };

    setTimeout(() => {
      this.loadingData = false;
    }, 1000);

  }

  ngAfterViewInit() {

  }

  writeRotatedText = function(text) {
    let ctx;
    const canvas = document.createElement('canvas');
    // I am using predefined dimensions so either make this part of the arguments or change at will
    canvas.width = 60;
    canvas.height = 100;
    ctx = canvas.getContext('2d');
    ctx.font = '12pt Arial';
    ctx.save();
    ctx.translate(10, 100);
    ctx.rotate(-0.4 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fillText(text , 0, 0);
    ctx.restore();
    return canvas.toDataURL();
  };

  downloadEventReport() {
    // google analytics event
    gtag('event', 'click', { 'event_category': 'Event Details', 'event_label': 'Downloaded Event Report' });
    const whispersLogo = 'src/app/event-public-report/logo.png'; // TODO: move photo to more appropriate location

    // Getting date/time for timestamp
    const date = APP_UTILITIES.getDateTime;

    // event details
    const data = this.data.event_data;

    // looping thru all organizations incase there are multiple
    const organizations = [];
    for (const organization of data.eventorganizations) {
      organizations.push(organization.organization.name);
    }

    // getting number of locations associated with event
    let locationCount;
    locationCount = data.eventlocations.length;

    // looping thru all counties of all locations
    const counties = [];
    for (const eventlocation of data.eventlocations) {
      let formattedString = '';
      formattedString = eventlocation.administrative_level_two_string + ', ' + eventlocation.administrative_level_one_string + ', ' + eventlocation.country_string;
      counties.push(formattedString);
    }

    // looping thru all event diagsoses incase there are multiple
    const eventDiagnosises = [];
    for (const diagnosis of data.eventdiagnoses) {
      eventDiagnosises.push(diagnosis.diagnosis_string);
    }

    // looping thru event locations to get labs
    const hasLabs = [];
    const noLabs = 'N/A';

    data.eventlocations.forEach(el => {
      el.locationspecies.forEach(ls => {
        ls.speciesdiagnoses.forEach(sd => {
          if (sd.organizations_string.length === 0) {
            return;
          } else {
            hasLabs.push(sd.organizations_string);
          }
        });
      });
    });

    // display 'N/A' if there are no labs
    if (hasLabs.length === 0) {
      this.labs = noLabs;
    } else {
      this.labs = hasLabs;
    }


    // getting species affected count
    let speciesAffectedCount = 0;
    data.eventlocations.forEach(el => {
      el.locationspecies.forEach(ls => {
        speciesAffectedCount = speciesAffectedCount + 1;
      });
    });

    const startDate = data.start_date;
    const endDate = data.end_date;
    const formattedDate = data.start_date + ' - ' + data.end_date;


    // Associated Events
    let associatedEvents;
    const eventsAndLinks = [];
    const eventIds = [];
    const eventLinks = [];

    // Checking to see if there are event groups
    if (data.eventgroups.length === 0) {
      associatedEvents = 'N/A';
    } else {
      associatedEvents = [];
      data.eventgroups.forEach(eg => {
        // only showing the event groups that are category 1
        if (eg.category === 1) {
          eg.events.forEach(element => {
            associatedEvents.push(element);
          });
        }
      });

      associatedEvents = associatedEvents.join(', ');
      // converting to string and adding 'link' field
      /* for (let i = 0; i < associatedEvents.length; i++) {

        // formatting string so that there is not a ',' at the end of last associated event
        const addComma = associatedEvents.length - 1;
        if (i !== addComma) {
          eventsAndLinks.push({ id: associatedEvents[i].toString() + ', ', link: window.location.origin + '/' + associatedEvents[i].toString() });
        } else {
          eventsAndLinks.push({ id: associatedEvents[i].toString(), link: window.location.origin + '/' + associatedEvents[i].toString() });
        }
      } */

      eventsAndLinks.forEach(el => {
        eventIds.push(el.id);
      });
      eventsAndLinks.forEach(el => {
        eventLinks.push(el.link);
      });
      console.log(eventIds);
      console.log(eventLinks);
    }

    // Species Most Affected
    let numberOfSpecies = 0;
    const eventType = data.event_type;
    let speciesArray;
    let speciesAffected;
    let affectedCount = 0;
    let positiveCount = 0;

    if (eventType === 1) { speciesArray = []; } // making speciesAffected an array only if the event is type 1)

    data.eventlocations.forEach(el => {
      el.locationspecies.forEach(ls => {
        numberOfSpecies = numberOfSpecies + 1;
        if (eventType === 1) { // if event is Morbidity/Mortality

          let deads;
          let sicks;

          // summing the dead and sick counts and estimations
          deads = ls.dead_count_estimated + ls.dead_count;
          sicks = ls.sick_count_estimated + ls.sick_count;

          affectedCount = deads + sicks;

          speciesArray.push({ name: ls.species_string, affected_count: affectedCount });

        } else if (eventType === 2) { // if event is Surveillance
          ls.speciesdiagnoses.forEach(sd => {
            positiveCount = positiveCount + sd.positive_count;
          });
          affectedCount = positiveCount;
          speciesAffected = affectedCount;
        }

        // sorting highest to lowest so that species most affected is first in the array
        if (eventType === 1) {
          speciesArray = speciesArray.sort((a, b) => b.affected_count - a.affected_count);
          speciesAffected = speciesArray[0].name;
        }
      });
    });

    // Event Visibility
    let eventVisibility;
    if (data.public) {
      eventVisibility = 'VISIBLE TO THE PUBLIC';
    } else {
      eventVisibility = 'NOT VISIBLE TO THE PUBLIC';
    }

    // whispers logo
    const pngURL = this.canvas.toDataURL();
    console.log(pngURL);

    // printing user's info
    const nameOrgString = this.data.user.first_name + ' ' + this.data.user.last_name + ' (' + this.data.user.organization_string + ')';

    // formatting full URL for footer
    const url = window.location.href;

    const eventLocation = data.eventlocations[0].locationspecies;
    console.log(eventLocation);
    this.eventLocsPlusDiagnoses = [];
    for (const event_location of this.data.event_data.eventlocations) {
      for (const locationspecies of event_location.locationspecies) {
        // speciesAffected.push({ name: ls.species_string, affected_count: affectedCount });

        for (const speciesdiagnosis of locationspecies.speciesdiagnoses) {

          const numAssess = speciesdiagnosis.tested_count + '/' + speciesdiagnosis.diagnosis_count;
          let captive = locationspecies.captive;

          // pdfmake does not like 'undefined' values so setting them to empty string
          const pop = locationspecies.population_count || ' ';
          const ksick = locationspecies.known_sick || ' ';
          const kdead = locationspecies.known_dead || ' ';
          const esick = locationspecies.sick_count_estimated || ' ';
          const edead = locationspecies.dead_count_estimated || ' ';
          captive = 'Yes' || 'No';
          const s_diag = speciesdiagnosis.diagnosis_string || ' ';
          const lab = speciesdiagnosis.organizations_string[0] || ' '; // TODO make this display all the labs if there are more than one

          this.eventLocsPlusDiagnoses.push({ species: locationspecies.species_string, location: event_location.administrative_level_one_string + ', ' + event_location.administrative_level_two_string , population: pop, known_sick: ksick, known_dead: kdead, est_sick: esick, est_dead: edead, captive: captive, species_dia: s_diag, count: numAssess, lab: lab });
        }

      }
    }

    // START defining event location table

    const locationHeaders = {
      eventLocationHeaders: {
        col_1: { image: this.writeRotatedText('Species'), style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'Location', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'Population', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'Known Sick', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_5: { text: 'Known Dead', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_6: { text: 'Est. Sick', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_7: { text: 'Est. Dead', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_8: { text: 'Captive', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_9: { text: 'Species Diagnosis', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_10: { text: '# Assessed/ # diagnosis', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_11: { text: 'Diagnostic Lab', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] }
      }
    };
    // [{image: writeRotatedText('I am rotated'), fit:[7,53], alignment: 'center'}]
    const locationBody = [];

    // pushing header row into the table
    for (const key in locationHeaders) {
      if (locationHeaders.hasOwnProperty(key)) {
        const header = locationHeaders[key];
        const row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        row.push(header.col_6);
        row.push(header.col_7);
        row.push(header.col_8);
        row.push(header.col_9);
        row.push(header.col_10);
        row.push(header.col_11);
        locationBody.push(row);
      }
    }

    const rows = this.eventLocsPlusDiagnoses;

    // pushing data into the rows
    for (const key in rows) {
      if (rows.hasOwnProperty(key)) {
        const elData = rows[key];
        const row = new Array();
        row.push(elData.species);
        row.push(elData.location);
        row.push(elData.population);
        row.push(elData.known_sick);
        row.push(elData.known_dead);
        row.push(elData.est_sick);
        row.push(elData.est_dead);
        row.push(elData.captive);
        row.push(elData.species_dia);
        row.push(elData.count);
        row.push(elData.lab);
        locationBody.push(row);
      }
    }
    // END defining event location table

    function buildTableBody(tableData, columns) {
      const body = [];

      body.push(columns);

      tableData.forEach(function (row) {
        const dataRow = [];

        columns.forEach(function (column) {
          dataRow.push(row[column]); // to out .toString() because null values were causing the function to fail
        });

        body.push(dataRow);
      });

      return body;
    }

    function table(tableData, columns) {
      return {
        table: {
          headerRows: 1,
          body: buildTableBody(tableData, columns)
        }
      };
    }


    // Below code is exploring dynamically generated tables and making hyperlinks. I haven't found a solution for how to create a link out of data in a dynamically generated table
    /* const eventGroups = data.eventgroups;

    function buildTableBody(data, columns) {
      data = eventsAndLinks;
      const body = [];

      body.push(columns);

      data.forEach(function(row) {
        const dataRow = [];

          columns.forEach(function(column) {
              dataRow.push({text: row[column].toString(), link : row.link,  color : '#0000EE'} );
          });

          body.push(dataRow);
      });

      return body;
  }

  function table(data, columns) {
      return {
          table: {
            style: 'smaller',
              headerRows: 0,
              body: buildTableBody(data, columns),

          },
          layout: { defaultBorder: false,
            paddingLeft: function(i, node) { return 15; },
            paddingRight: function(i, node) { return 10; },
            border: [false, false, true, false],
            widths: [150, 250],
           }
      };
  } */ //

    // PDF Definition. This is where you structure/style the pdf
  if (this.data.user.role !== 7 && this.data.user.role !== 6 && this.data.user.role !== undefined) {

    // using date_sort parameter to sort comments old to vew
    let combinedComments = data.combined_comments;
    combinedComments = combinedComments.sort((a, b) => a.date_sort - b.date_sort);

    // START defining comment table
    const commentHeaders = {
      commentHeaders: {
        col_1: { text: 'Comments', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_2: { text: 'Comment Type', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_3: { text: 'Created Date', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_4: { text: 'User', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_5: { text: 'Organization', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
        col_6: { text: 'Comment Source', style: 'tableHeader', alignment: 'center', margin: [0, 8, 0, 0] },
      }
    };

    const commentBody = [];

    // pushing header row into the table
    for (const key in commentHeaders) {
      if (commentHeaders.hasOwnProperty(key)) {
        const header = commentHeaders[key];
        const row = new Array();
        row.push(header.col_1);
        row.push(header.col_2);
        row.push(header.col_3);
        row.push(header.col_4);
        row.push(header.col_5);
        row.push(header.col_6);
        commentBody.push(row);
      }
    }

    const commentRows = combinedComments;

    // pushing data into the rows
    for (const key in commentRows) {
      if (commentRows.hasOwnProperty(key)) {
        const elData = commentRows[key];
        const row = new Array();
        row.push(elData.comment);
        row.push(elData.comment_type);
        row.push(elData.created_date);
        row.push(elData.created_by_string);
        row.push(elData.created_by_organization_string);
        row.push(elData.content_type_string);
        commentBody.push(row);
      }
    }
    // END defining comment table

    const docDefinition = {
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 35],
      footer: function (currentPage, pageCount) {
        return {
          margin: [20, 0, 20, 0],
          style: 'smallest',
          columns: [
            {
              width: 700,
              text: ['Report generated by +' + nameOrgString + ' from ', { text: url, link: url, color: '#0000EE' }, ' on ' + date + '. \n For more information about this event, connect with the Contact Organization.\n For more information about WHISPers, see “About” at https://whispers.usgs.gov.'
              ]
            },
            {
              width: 50,
              alignment: 'right',
              text: 'Page ' + currentPage.toString() + ' of ' + pageCount
            }
          ]
        };
      },
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Summary of ' + data.event_type_string + ' Event ID ' + data.id,
              margin: [0, 15, 0, 0]
            },
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Contact Organziation(s)', bold: true, alignment: 'right' }, '' + organizations], // add new line between contacts
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Record Status', bold: true, alignment: 'right' }, data.event_status_string],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Report Generated On', bold: true, alignment: 'right' }, date],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          text: 'Summary Information',
          style: 'bigger',
          margin: [30, 10]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Locations', bold: true, alignment: 'right' }, locationCount],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'County (or Equivalent)', bold: true, alignment: 'right' }, counties],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Diagnosis', bold: true, alignment: 'right' }, eventDiagnosises],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Diagnostic Laboratory', bold: true, alignment: 'right' }, this.labs],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Animals Affected', bold: true, alignment: 'right' }, data.affected_count],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Species Affected', bold: true, alignment: 'right' }, speciesAffectedCount],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Species Most Affected', bold: true, alignment: 'right' }, speciesAffected]
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Start Date - End Date', bold: true, alignment: 'right' }, formattedDate], // TODO: format according to wireframe & Create function to get count of total days event lasted
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        /* {
          alignment: 'justify',
          columns: [
            { text: 'Associated Events' }, // fixes link issue with dynamic table generation but style is messed up
            table(
              eventsAndLinks, ['id'])
          ]
        }, */
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Associated Events', bold: true, alignment: 'right' }, { text: associatedEvents }], // TODO: Figure out what to do regarding links & Display none if there are none {text: eventIds, link: 'http://localhost:4200/event/' + associatedEvents, color: '#0000EE'}
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Visibility', bold: true, alignment: 'right' }, eventVisibility],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ],
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Details of ' + data.event_type_string + ' Event ID ' + data.id,
              margin: [0, 15, 0, 0]
            }
          ]
        },
        /* {
          alignment: 'justify',
          columns: [
            table(
              this.eventLocsPlusDiagnoses, ['species', 'population', 'known_sick', 'known_dead', 'est_sick', 'est_dead', 'captive', 'species_dia', 'count', 'lab']) // eventLocation[0].speciesdiagnoses[0].diagnosis_string] , eventLocation[0].speciesdiagnoses[0].tested_count, eventLocation[0].speciesdiagnoses[0].positive_count
          ],
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            table(
              combinedComments, ['comment', 'comment_type', 'created_date', 'created_by_string', 'created_by_organization_string', 'content_type_string'])
          ],
          pageBreak: 'after'
        }, */
        {
          alignment: 'justify',
          table: {
            headerRows: 2,
            body: commentBody
          },
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          table: {
            headerRows: 2,
            body: locationBody
          },
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Explanation of Terms',
              margin: [0, 15, 0, 0]
            }
          ]
        },
        {
          alignment: 'justify',
          text: ['WHISPers stands for Wildlife Health Information Sharing Partnership - event reporting system. It is a partner-driven, web-based repository for sharing basic information about historic and ongoing wildlife mortality (death) and/or morbidity (illness) events. The information, such as county-level locations, onset and ending dates, species affected, and diagnosis has generously been shared with the USGS National Wildlife Health Center over time by hundreds of natural resource managers and stakeholders across the U.S. and beyond. The primary goal of the system is to provide natural resource management partners and the public with timely, accurate information on where wildlife disease events are occurring or have occurred for better preparation and decision making. The information is opportunistically collected and does not reflect all the mortality events that occur in North America. \n', { text: 'Disclaimer', fontSize: 11, bold: true }, '\n\n The data on this website are provided for situational awareness of wildlife health events. The USGS National Wildlife Health Center (NWHC) makes every effort to provide accurate and timely information; however, data may not be final or fully accurate, especially if an event is ongoing or data synthesis is not complete. Conclusions drawn from or actions undertaken on the basis of such data and information are the sole responsibility of the user. To ensure that information is accurately interpreted and appropriately credited, dissemination of information from this site (publication, press release, technical report, etc.) should be done in collaboration with the specific agencies and laboratories that have generated the information. \n\n Note: WHISPers data fields and business rules for reporting of surveillance events are under development and thus display of surveillance information may be inconsistent.\n\n'],
          style: 'smaller',
        },
        {
          style: 'definitionsTable',
          table: {
            body: [
              [{ text: 'Event Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventTypeDefinition, border: [false, false, false, false] }],
              [{ text: 'Event ID', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventIdDefinition, border: [false, false, false, false] }],
              [{ text: 'Contact Organization', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.contactOrgDefinition, border: [false, false, false, false] }],
              [{ text: 'Record Status', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.recordStatusDefinition, border: [false, false, false, false] }],
              [{ text: '# of Locations', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numberOfLocationsDefinition, border: [false, false, false, false] }],
              [{ text: 'County (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.countyDefinition, border: [false, false, false, false] }],
              [{ text: 'Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventDiagDefinition, border: [false, false, false, false] }],
              [{ text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.labDefinition, border: [false, false, false, false] }],
              [{ text: '# of Animals Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numAnimalsAffectedDefinition, border: [false, false, false, false] }],
              [{ text: '# of Species Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numSpeciesAffectedDefinition, border: [false, false, false, false] }],
              [{ text: 'Species Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speceisMostAffectedDefinition, border: [false, false, false, false] }],
              [{ text: 'Event Start Date - End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startEndDatesDefinition, border: [false, false, false, false] }],
              [{ text: 'Associated Events', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.associatedEventsDefinition, border: [false, false, false, false] }],
              [{ text: 'Event Visibility', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventVisibilityDefinition, border: [false, false, false, false] }],
            ]
          },
          layout: {
            defaultBorder: false,
            paddingLeft: function (i, node) { return 15; },
            paddingRight: function (i, node) { return 10; },
            // paddingTop: function(i, node) { return 10; }
          }
        },
        {
          alignment: 'justify',
          text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
          style: 'smallest',
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Explanation of Terms cont...',
              margin: [0, 15, 0, 0]
            }
          ]
        },
        {
          style: 'definitionsTable',
          table: {
            body: [
              [{ text: 'State (or Equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.stateDefinition, border: [false, false, false, false] }],
              [{ text: 'Country', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.countryDefinition, border: [false, false, false, false] }],
              [{ text: 'Start Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startDateDefinition, border: [false, false, false, false] }],
              [{ text: 'End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.endDateDefinition, border: [false, false, false, false] }],
              [{ text: 'Species', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDefinition, border: [false, false, false, false] }],
              [{ text: 'Population', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDefinition, border: [false, false, false, false] }],
              [{ text: 'Known Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.knownSickDefinition, border: [false, false, false, false] }],
              [{ text: 'Known Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.knownDeadDefinition, border: [false, false, false, false] }],
              [{ text: 'Estimated Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.estSickDefinition, border: [false, false, false, false] }],
              [{ text: 'Estimate Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.estDeadDefinition, border: [false, false, false, false] }],
              [{ text: 'Captive', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.captiveDefinition, border: [false, false, false, false] }],
              [{ text: 'Species Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speciesDiagDefinition, border: [false, false, false, false] }],
              [{ text: 'Number Assessed', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numAssessedDefinition, border: [false, false, false, false] }],
              [{ text: 'Number with this Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numWithDiagDefinition, border: [false, false, false, false] }],
              [{ text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.labDefinition, border: [false, false, false, false] }],
              [{ text: 'Comment Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Flags comment as belonging to a certain category. See metadata for details on options.', border: [false, false, false, false] }],
              [{ text: 'Comment Source', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.commentSourceDefinition, border: [false, false, false, false] }],
            ]
          },
          layout: {
            defaultBorder: false,
            paddingLeft: function (i, node) { return 15; },
            paddingRight: function (i, node) { return 10; },
            // paddingTop: function(i, node) { return 10; }
          }
        },
        {
          alignment: 'justify',
          text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
          style: 'smallest'
        },
      ],
      images: {
        logo: pngURL
      },
      styles: {
        header: {
          fontSize: 16,
          bold: true
        },
        bigger: {
          fontSize: 18,
          bold: true
        },
        smaller: {
          fontSize: 10
        },
        smallest: {
          fontSize: 8
        },
        definitionsTable: {
          fontSize: 9
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    };

    pdfMake.createPdf(docDefinition).download();
  } else {

    const publicDocDefinition = {
      pageOrientation: 'landscape',
      pageMargins: [20, 20, 20, 35],
      footer: function (currentPage, pageCount) {
        return {
          margin: [20, 0, 20, 0],
          style: 'smallest',
          columns: [
            {
              width: 700,
              text: ['Report generated by +' + nameOrgString + ' from ', { text: url, link: url, color: '#0000EE' }, ' on ' + date + '. \n For more information about this event, connect with the Contact Organization.\n For more information about WHISPers, see “About” at https://whispers.usgs.gov.'
              ]
            },
            {
              width: 50,
              alignment: 'right',
              text: 'Page ' + currentPage.toString() + ' of ' + pageCount
            }
          ]
        };
      },
      content: [
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Summary of ' + data.event_type_string + ' Event ID ' + data.id,
              margin: [0, 15, 0, 0]
            },
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Contact Organziation(s)', bold: true, alignment: 'right' }, '' + organizations], // add new line between contacts
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Record Status', bold: true, alignment: 'right' }, data.event_status_string],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Report Generated On', bold: true, alignment: 'right' }, date],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          text: 'Summary Information',
          style: 'bigger',
          margin: [30, 10]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Locations', bold: true, alignment: 'right' }, locationCount],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'County (or Equivalent)', bold: true, alignment: 'right' }, counties],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Diagnosis', bold: true, alignment: 'right' }, eventDiagnosises],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Diagnostic Laboratory', bold: true, alignment: 'right' }, this.labs],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Animals Affected', bold: true, alignment: 'right' }, data.affected_count],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: '# of Species Affected', bold: true, alignment: 'right' }, speciesAffectedCount],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Species Most Affected', bold: true, alignment: 'right' }, speciesAffected]
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Start Date - End Date', bold: true, alignment: 'right' }, formattedDate], // TODO: format according to wireframe & Create function to get count of total days event lasted
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        /* {
          alignment: 'justify',
          columns: [
            { text: 'Associated Events' }, // fixes link issue with dynamic table generation but style is messed up
            table(
              eventsAndLinks, ['id'])
          ]
        }, */
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Associated Events', bold: true, alignment: 'right' }, { text: associatedEvents }], // TODO: Figure out what to do regarding links & Display none if there are none {text: eventIds, link: 'http://localhost:4200/event/' + associatedEvents, color: '#0000EE'}
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ]
        },
        {
          alignment: 'justify',
          columns: [
            {
              style: 'smaller',
              table: {
                widths: [150, 250],
                body: [
                  [{ border: [false, false, true, false], text: 'Event Visibility', bold: true, alignment: 'right' }, eventVisibility],
                ]
              },
              layout: {
                defaultBorder: false,
                paddingLeft: function (i, node) { return 15; },
                paddingRight: function (i, node) { return 10; },
              }
            }
          ],
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Details of ' + data.event_type_string + ' Event ID ' + data.id,
              margin: [0, 15, 0, 0]
            }
          ]
        },
        {
          alignment: 'justify',
          table: {
            headerRows: 2,
            body: locationBody
          },
          pageBreak: 'after'
        },
        {
          alignment: 'justify',
          columns: [
            {
              image: pngURL,
              width: 400,
              height: 80
            },
            {
              style: 'header',
              text: 'Explanation of Terms',
              margin: [0, 15, 0, 0]
            }
          ]
        },
        {
          alignment: 'justify',
          text: ['WHISPers stands for Wildlife Health Information Sharing Partnership - event reporting system. It is a partner-driven, web-based repository for sharing basic information about historic and ongoing wildlife mortality (death) and/or morbidity (illness) events. The information, such as county-level locations, onset and ending dates, species affected, and diagnosis has generously been shared with the USGS National Wildlife Health Center over time by hundreds of natural resource managers and stakeholders across the U.S. and beyond. The primary goal of the system is to provide natural resource management partners and the public with timely, accurate information on where wildlife disease events are occurring or have occurred for better preparation and decision making. The information is opportunistically collected and does not reflect all the mortality events that occur in North America. \n', { text: 'Disclaimer', fontSize: 11, bold: true }, '\n\n The data on this website are provided for situational awareness of wildlife health events. The USGS National Wildlife Health Center (NWHC) makes every effort to provide accurate and timely information; however, data may not be final or fully accurate, especially if an event is ongoing or data synthesis is not complete. Conclusions drawn from or actions undertaken on the basis of such data and information are the sole responsibility of the user. To ensure that information is accurately interpreted and appropriately credited, dissemination of information from this site (publication, press release, technical report, etc.) should be done in collaboration with the specific agencies and laboratories that have generated the information. \n\n Note: WHISPers data fields and business rules for reporting of surveillance events are under development and thus display of surveillance information may be inconsistent.\n\n'],
          style: 'smaller',
        },
        {
          style: 'definitionsTable',
          table: {
            body: [
              [{ text: 'Event Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventTypeDefinition, border: [false, false, false, false] }],
              [{ text: 'Event ID', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventIdDefinition, border: [false, false, false, false] }],
              [{ text: 'Contact Organization', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.contactOrgDefinition, border: [false, false, false, false] }],
              [{ text: 'Record Status', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.recordStatusDefinition, border: [false, false, false, false] }],
              [{ text: '# of Locations', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numberOfLocationsDefinition, border: [false, false, false, false] }],
              [{ text: 'County (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.countyDefinition, border: [false, false, false, false] }],
              [{ text: 'Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventDiagDefinition, border: [false, false, false, false] }],
              [{ text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.labDefinition, border: [false, false, false, false] }],
              [{ text: '# of Animals Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numAnimalsAffectedDefinition, border: [false, false, false, false] }],
              [{ text: '# of Species Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.numSpeciesAffectedDefinition, border: [false, false, false, false] }],
              [{ text: 'Species Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.speceisMostAffectedDefinition, border: [false, false, false, false] }],
              [{ text: 'Event Start Date - End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.startEndDatesDefinition, border: [false, false, false, false] }],
              [{ text: 'Associated Events', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.associatedEventsDefinition, border: [false, false, false, false] }],
              [{ text: 'Event Visibility', border: [false, false, true, false], alignment: 'right', bold: true }, { text: this.eventVisibilityDefinition, border: [false, false, false, false] }],
            ]
          },
          layout: {
            defaultBorder: false,
            paddingLeft: function (i, node) { return 15; },
            paddingRight: function (i, node) { return 10; },
            // paddingTop: function(i, node) { return 10; }
          }
        },
        {
          alignment: 'justify',
          text: ['\n\nFor more details, see WHISPers metadata at ', { text: 'https://www.usgs.gov/nwhc/whispers', link: 'https://www.usgs.gov/nwhc/whispers', color: '#0000EE' }, '.'],
          style: 'smallest',
        }
      ],
      images: {
        logo: pngURL
      },
      styles: {
        header: {
          fontSize: 16,
          bold: true
        },
        bigger: {
          fontSize: 18,
          bold: true
        },
        smaller: {
          fontSize: 10
        },
        smallest: {
          fontSize: 8
        },
        definitionsTable: {
          fontSize: 9
        }
      },
      defaultStyle: {
        columnGap: 20
      }
    };
    pdfMake.createPdf(publicDocDefinition).download();
  }
  }

}

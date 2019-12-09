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

  // this isn't working????
  // @Input('eventData') eventData: EventDetail;
  constructor(
    public eventPublicReportDialogRef: MatDialogRef<EventPublicReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.loadingData = true;

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
    let speciesAffected;
    let affectedCount = 0;
    let positiveCount = 0;

    if (eventType === 1) { speciesAffected = []; } // making speciesAffected an array only if the event is type 1)

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

          speciesAffected.push({ name: ls.species_string, affected_count: affectedCount });

        } else if (eventType === 2) { // if event is Surveillance
          ls.speciesdiagnoses.forEach(sd => {
            positiveCount = positiveCount + sd.positive_count;
          });
          affectedCount = positiveCount;
          speciesAffected = affectedCount;
        }

        // sorting most to least so that species most affected is first in the array
        if (eventType === 1) {
          speciesAffected = speciesAffected.sort((a, b) => b.affected_count - a.affected_count);
        }
        console.log('species affected: ' + speciesAffected);
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

    // print template
    console.log('print');

    // using date_sort parameter to sort comments old to vew
    let combinedComments = data.combined_comments;
    combinedComments = combinedComments.sort((a, b) => a.date_sort - b.date_sort);

    const eventLocation = data.eventlocations[0].locationspecies;
    console.log(eventLocation);

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
  } */

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
                  [{ border: [false, false, true, false], text: 'Species Most Affected', bold: true, alignment: 'right' }, speciesAffected[0].name ],
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
          columns: [
            /* { text: 'Associated Events' }, */
            table(
              eventLocation, ['species_string', 'population_count', 'sick_count', 'dead_count', 'sick_count_estimated', 'dead_count_estimated', 'captive']) // eventLocation[0].speciesdiagnoses[0].diagnosis_string] , eventLocation[0].speciesdiagnoses[0].tested_count, eventLocation[0].speciesdiagnoses[0].positive_count
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
              [{ text: 'Event Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Mortality/Morbidity: Noteworthy occurrence of one or more sick or dead animals clustered in space and time. Surveillance: Positive detections of a pathogen during active surveillance of healthy live animals.', border: [false, false, false, false] }],
              [{ text: 'Event ID', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'System-generated unique identifier for an event.', border: [false, false, false, false] }],
              [{ text: 'Contact Organization', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Organization(s) to contact regarding general inquiries about the event.', border: [false, false, false, false] }],
              [{ text: 'Record Status', border: [false, false, true, false], alignment: 'right', bold: true }, { text: '"Complete" if 1.) the event has ended, 2.) diagnostic tests are finalized, and 3.) all information is updated in WHISPers. Otherwise, "Incomplete".', border: [false, false, false, false] }],
              [{ text: '# of Locations', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Number of locations (e.g., town or lake) that each represents a distinct spatial cluster of animal observations within a county.', border: [false, false, false, false] }],
              [{ text: 'County (or equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'County of location (or equivalent, such as parish or borough in the United States).', border: [false, false, false, false] }],
              [{ text: 'Event Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'The overall main reason(s) for illness and/or death across all locations and species and thus the major cause(s) of the event, or a diagnosis deemed significant enough to list at the event level for situational awareness.', border: [false, false, false, false] }],
              [{ text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Laboratory(ies) providing the diagnoses for this species at this location.', border: [false, false, false, false] }],
              [{ text: '# of Animals Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Total number affected. A count of sick plus dead animals for a morbidity/mortality event.', border: [false, false, false, false] }],
              [{ text: '# of Species Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Total number affected. A count of sick plus dead animals for a morbidity/mortality event.', border: [false, false, false, false] }],
              [{ text: 'Species Most Affected', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Total number of species affected', border: [false, false, false, false] }],
              [{ text: 'Event Start Date - End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Beginning date of the event (considering all locations). Ending date of the event (considering all locations).', border: [false, false, false, false] }],
              [{ text: 'Associated Events', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Events that are biologically equivalent and were grouped together by wildlife disease specialists at the USGS National Wildlife Health Center.', border: [false, false, false, false] }],
              [{ text: 'Event Visibility', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Indicates whether event is visible to the public or not.', border: [false, false, false, false] }],
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
              [{ text: 'State (or Equivalent)', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'State of location (or equivalent, such as provinces or territories in Canada).', border: [false, false, false, false] }],
              [{ text: 'Country', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Country of location', border: [false, false, false, false] }],
              [{ text: 'Start Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Estimated beginning date of the event at this location.', border: [false, false, false, false] }],
              [{ text: 'End Date', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Estimated ending date of the event at this location.', border: [false, false, false, false] }],
              [{ text: 'Species', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Species affected at this location.', border: [false, false, false, false] }],
              [{ text: 'Population', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Estimate of the maximum number of this species at this location, including live, sick, and dead.', border: [false, false, false, false] }],
              [{ text: 'Known Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Exact minimum count of animals exhibiting clinical signs of illness at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured.', border: [false, false, false, false] }],
              [{ text: 'Known Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Exact minimum count of the cumulative number of dead animals (not including euthanized) at this location over the length of the event.', border: [false, false, false, false] }],
              [{ text: 'Estimated Sick', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Best guess of the maximum number of animals that might be showing clinical signs (include any known sick animals) at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured.', border: [false, false, false, false] }],
              [{ text: 'Estimate Dead', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Best guess of the maximum number of animals that died (include any known dead animals) at this location over the length of the event. ', border: [false, false, false, false] }],
              [{ text: 'Captive', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Describes if species affected at this location are captive or not.', border: [false, false, false, false] }],
              [{ text: 'Species Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: '1.) Diagnosis has been determined by a wildlife professional to be an ultimate (or underlying) cause of death or morbidity in at least one specimen examined from this location  2.) Any reportable disease listed by OIE or USDA  or  3.) those diagnoses deemed significant by the user or organization.', border: [false, false, false, false] }],
              [{ text: 'Number Assessed', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Number of individual specimens laboratory tested or examined for a specific etiology. For morbidity/mortality events, specimens will be individual animals. For surveillance events, specimens might reflect individual animals and/or environmental samples. Across diagnoses, numbers are nonadditive.', border: [false, false, false, false] }],
              [{ text: 'Number with this Diagnosis', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Number of individual specimens with the selected diagnosis (can be a suspect diagnosis). For morbidity/mortality events, specimens will be individual animals. For surveillance events, specimens might reflect individual animals and/or environmental samples. Across diagnoses, numbers are nonadditive.', border: [false, false, false, false] }],
              [{ text: 'Diagnostic Laboratory', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Laboratory(ies) providing the diagnoses for this species at this location.', border: [false, false, false, false] }],
              [{ text: 'Comment Type', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Flags comment as belonging to a certain category. See metadata for details on options.', border: [false, false, false, false] }],
              [{ text: 'Comment Source', border: [false, false, true, false], alignment: 'right', bold: true }, { text: 'Comment timeline is a compilation of comments entered in various sections of the event record; the source identifies from where the comment originated.', border: [false, false, false, false] }],
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
  }

}

import { Injectable } from '@angular/core';
import { EventSummary } from '@app/interfaces/event-summary';

import { APP_SETTINGS } from '@app/app.settings';

@Injectable()
export class APP_UTILITIES {

    public static get DEFAULT_COUNTRY_ID(): string {

        // TODO: impove this function to actually lookup the default country id 
        // using the default country abbreviation string from APP_SETTINGS.
        // doing this quick and dirty to make quick progress now. 
        return '30';
    }

    public static get SAMPLE_EVENT_DATA() {
        return [
            {
                "id": 1000,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Fortean",
                "complete": true,
                "start_date": "2011-07-12",
                "end_date": "2015-06-23",
                "affected_count": 39,
                "epi_staff": "Pittman Montgomery",
                "event_status": 4,
                "event_status_string": "New Event Record",
                "legal_status": "Legal - Case Open",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Tue Dec 29 2015 11:22:43 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Wed Sep 03 2014 07:36:59 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnosis": {
                    "id": 1039,
                    "diagnosis": 1,
                    "diagnosis_string": "Open",
                    "confirmed": true,
                    "major": true,
                    "priority": 1,
                    "created_date": "2011-12-30",
                    "created_by": "nbartlein",
                    "modified_date": "2019-01-20",
                    "modified_by": "jchipault"
                },
                "states": [
                    {
                        "id": 1006,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "IA",
                        "created_date": "2011-10-31",
                        "created_by": "jchipault",
                        "modified_date": "2016-12-17",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1412,
                        "name": "Polk",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "38.1215",
                        "centroid_longitude": "-177.8789",
                        "fips_code": "5ade4264a0aa3ceb5d944b59",
                        "created_date": "2016-10-01",
                        "created_by": "nbartlein",
                        "modified_date": "2012-07-04",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1421,
                        "name": "Polk",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "1.4553",
                        "centroid_longitude": "-61.0585",
                        "fips_code": "5ade4264e66715fb2c17c88b",
                        "created_date": "2018-12-02",
                        "created_by": "kmiller",
                        "modified_date": "2015-01-28",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1015,
                        "name": "Hennepin",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "72.9673",
                        "centroid_longitude": "113.2274",
                        "fips_code": "5ade4264451b074eb5da1c97",
                        "created_date": "2013-04-19",
                        "created_by": "jchipault",
                        "modified_date": "2013-11-15",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1485,
                        "name": "Polk",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "46.2955",
                        "centroid_longitude": "-29.3409",
                        "fips_code": "5ade426412a009a926e681a5",
                        "created_date": "2014-02-11",
                        "created_by": "nbartlein",
                        "modified_date": "2012-08-24",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1322,
                        "name": "Snow Goose",
                        "class_name": "in",
                        "order_name": "cillum",
                        "family_name": "cillum",
                        "sub_family_name": "ex",
                        "genus_name": "laborum",
                        "species_latin_name": "exercitation",
                        "subspecies_latin_name": "ullamco",
                        "tsn": 2,
                        "created_date": "2011-01-01",
                        "created_by": "kmiller",
                        "modified_date": "2011-02-03",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1283,
                        "name": "Mallard",
                        "class_name": "Lorem",
                        "order_name": "non",
                        "family_name": "deserunt",
                        "sub_family_name": "elit",
                        "genus_name": "pariatur",
                        "species_latin_name": "tempor",
                        "subspecies_latin_name": "est",
                        "tsn": 5,
                        "created_date": "2016-04-20",
                        "created_by": "kmiller",
                        "modified_date": "2017-05-23",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1001,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "event_reference": " Translink",
                "complete": false,
                "start_date": "2011-08-28",
                "end_date": "2015-07-25",
                "affected_count": 32,
                "epi_staff": "Berry Hester",
                "event_status": 3,
                "event_status_string": "New Event Record",
                "legal_status": "Legal - Case Closed",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Wed Jan 31 2018 03:56:39 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Thu Dec 06 2012 03:49:02 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnosis": {
                    "id": 1104,
                    "diagnosis": 2,
                    "diagnosis_string": "Schistosomiasis",
                    "confirmed": true,
                    "major": false,
                    "priority": 3,
                    "created_date": "2012-09-09",
                    "created_by": "kmiller",
                    "modified_date": "2015-07-17",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1356,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "MT",
                        "created_date": "2011-09-06",
                        "created_by": "kmiller",
                        "modified_date": "2014-12-07",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1494,
                        "name": "Montana",
                        "country": 30,
                        "abbreviation": "MT",
                        "created_date": "2015-10-11",
                        "created_by": "jchipault",
                        "modified_date": "2012-12-31",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1278,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "32.2967",
                        "centroid_longitude": "142.2346",
                        "fips_code": "5ade426446974eb3f0f7ab94",
                        "created_date": "2013-08-08",
                        "created_by": "kmiller",
                        "modified_date": "2018-09-21",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1120,
                        "name": "Marquette",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "31.2919",
                        "centroid_longitude": "-79.4635",
                        "fips_code": "5ade4264d1e589d44a32006d",
                        "created_date": "2016-11-21",
                        "created_by": "jchipault",
                        "modified_date": "2015-07-21",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1050,
                        "name": "Gopher Frog",
                        "class_name": "dolor",
                        "order_name": "ullamco",
                        "family_name": "dolor",
                        "sub_family_name": "proident",
                        "genus_name": "officia",
                        "species_latin_name": "proident",
                        "subspecies_latin_name": "esse",
                        "tsn": 4,
                        "created_date": "2017-03-04",
                        "created_by": "nbartlein",
                        "modified_date": "2011-05-20",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1002,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Turnabout",
                "complete": false,
                "start_date": "2013-04-06",
                "end_date": "2015-08-11",
                "affected_count": 31,
                "epi_staff": "Earline Leon",
                "event_status": 4,
                "event_status_string": "New Event Record",
                "legal_status": "Legal - Case Closed",
                "legal_number": null,
                "superevent": "",
                "created_date": "Sun Feb 08 2015 04:18:13 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Thu Apr 19 2018 04:04:42 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnosis": {
                    "id": 1159,
                    "diagnosis": 1,
                    "diagnosis_string": "Open",
                    "confirmed": true,
                    "major": false,
                    "priority": 3,
                    "created_date": "2017-08-26",
                    "created_by": "nbartlein",
                    "modified_date": "2014-11-20",
                    "modified_by": "nbartlein"
                },
                "states": [
                    {
                        "id": 1398,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "MT",
                        "created_date": "2012-12-08",
                        "created_by": "jchipault",
                        "modified_date": "2012-05-10",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1288,
                        "name": "Minnesota",
                        "country": 30,
                        "abbreviation": "MT",
                        "created_date": "2016-11-10",
                        "created_by": "jchipault",
                        "modified_date": "2018-02-01",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1355,
                        "name": "Hennepin",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "17.1208",
                        "centroid_longitude": "-53.8112",
                        "fips_code": "5ade426423fe78529191695b",
                        "created_date": "2016-07-12",
                        "created_by": "nbartlein",
                        "modified_date": "2015-06-10",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1040,
                        "name": "Polk",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "56.0553",
                        "centroid_longitude": "134.7895",
                        "fips_code": "5ade42642fae8ba25292ec4f",
                        "created_date": "2012-12-07",
                        "created_by": "nbartlein",
                        "modified_date": "2011-01-20",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1317,
                        "name": "Brown Pelican",
                        "class_name": "aliquip",
                        "order_name": "amet",
                        "family_name": "deserunt",
                        "sub_family_name": "consequat",
                        "genus_name": "amet",
                        "species_latin_name": "in",
                        "subspecies_latin_name": "veniam",
                        "tsn": 5,
                        "created_date": "2018-04-08",
                        "created_by": "kmiller",
                        "modified_date": "2011-10-14",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1003,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "event_reference": " Ziore",
                "complete": true,
                "start_date": "2014-07-17",
                "end_date": "2012-02-27",
                "affected_count": 27,
                "epi_staff": "Stout Bruce",
                "event_status": 4,
                "event_status_string": "Supplemental Report Needed",
                "legal_status": "Potential Legal",
                "legal_number": null,
                "superevent": "",
                "created_date": "Mon Apr 25 2016 06:20:03 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Sun May 24 2015 17:07:42 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnosis": {
                    "id": 1086,
                    "diagnosis": 5,
                    "diagnosis_string": "Avian Cholera",
                    "confirmed": false,
                    "major": true,
                    "priority": 3,
                    "created_date": "2013-09-22",
                    "created_by": "nbartlein",
                    "modified_date": "2012-06-06",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1020,
                        "name": "Minnesota",
                        "country": 30,
                        "abbreviation": "MN",
                        "created_date": "2011-09-06",
                        "created_by": "jchipault",
                        "modified_date": "2011-05-26",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1052,
                        "name": "Michigan",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2016-06-11",
                        "created_by": "jchipault",
                        "modified_date": "2016-07-24",
                        "modified_by": "kmiller"
                    }
                ],
                "counties": [
                    {
                        "id": 1017,
                        "name": "Polk",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "28.5993",
                        "centroid_longitude": "49.9545",
                        "fips_code": "5ade426497e113522c2b2887",
                        "created_date": "2011-01-05",
                        "created_by": "jchipault",
                        "modified_date": "2018-04-01",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1382,
                        "name": "Juneau",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "4.7053",
                        "centroid_longitude": "-174.5625",
                        "fips_code": "5ade4264494f73d6d6470bcf",
                        "created_date": "2013-03-29",
                        "created_by": "nbartlein",
                        "modified_date": "2015-01-24",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1387,
                        "name": "Marquette",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "35.5393",
                        "centroid_longitude": "153.9914",
                        "fips_code": "5ade42641fe20bb3cc508ee4",
                        "created_date": "2018-12-14",
                        "created_by": "nbartlein",
                        "modified_date": "2016-10-23",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1253,
                        "name": "Juneau",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "63.8274",
                        "centroid_longitude": "-146.0234",
                        "fips_code": "5ade426452ae483380f7a4eb",
                        "created_date": "2017-04-28",
                        "created_by": "nbartlein",
                        "modified_date": "2013-06-29",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1353,
                        "name": "Brown Pelican",
                        "class_name": "exercitation",
                        "order_name": "reprehenderit",
                        "family_name": "occaecat",
                        "sub_family_name": "enim",
                        "genus_name": "ullamco",
                        "species_latin_name": "fugiat",
                        "subspecies_latin_name": "labore",
                        "tsn": 5,
                        "created_date": "2018-07-05",
                        "created_by": "nbartlein",
                        "modified_date": "2014-01-14",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1004,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "event_reference": " Ramjob",
                "complete": false,
                "start_date": "2015-01-04",
                "end_date": "2014-06-04",
                "affected_count": 25,
                "epi_staff": "Christie Day",
                "event_status": 2,
                "event_status_string": "Final Report Needed",
                "legal_status": "Legal - Case Closed",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Fri Dec 26 2014 12:45:59 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Tue Sep 10 2013 15:32:53 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnosis": {
                    "id": 1182,
                    "diagnosis": 1,
                    "diagnosis_string": "Schistosomiasis",
                    "confirmed": false,
                    "major": false,
                    "priority": 3,
                    "created_date": "2013-07-12",
                    "created_by": "kmiller",
                    "modified_date": "2017-11-10",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1126,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2013-07-05",
                        "created_by": "nbartlein",
                        "modified_date": "2018-04-01",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1188,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2013-04-25",
                        "created_by": "jchipault",
                        "modified_date": "2018-09-04",
                        "modified_by": "nbartlein"
                    }
                ],
                "counties": [
                    {
                        "id": 1270,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "30.7604",
                        "centroid_longitude": "-26.1325",
                        "fips_code": "5ade42641af851c4c58d8be0",
                        "created_date": "2018-10-27",
                        "created_by": "nbartlein",
                        "modified_date": "2015-06-19",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1420,
                        "name": "Dane",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "18.2493",
                        "centroid_longitude": "14.005",
                        "fips_code": "5ade426450fd7fd27f5b9ec8",
                        "created_date": "2019-01-23",
                        "created_by": "nbartlein",
                        "modified_date": "2014-06-08",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1364,
                        "name": "Snow Goose",
                        "class_name": "dolor",
                        "order_name": "ipsum",
                        "family_name": "et",
                        "sub_family_name": "cillum",
                        "genus_name": "aute",
                        "species_latin_name": "ipsum",
                        "subspecies_latin_name": "magna",
                        "tsn": 2,
                        "created_date": "2012-11-18",
                        "created_by": "kmiller",
                        "modified_date": "2015-02-03",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1005,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Zilphur",
                "complete": true,
                "start_date": "2018-07-15",
                "end_date": "2018-12-08",
                "affected_count": 32,
                "epi_staff": "Buchanan Marsh",
                "event_status": 6,
                "event_status_string": "New Event Record",
                "legal_status": "Legal - Case Open",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Sun Apr 15 2018 22:41:23 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Thu Feb 05 2015 12:05:00 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnosis": {
                    "id": 1212,
                    "diagnosis": 3,
                    "diagnosis_string": "Aspergillosis",
                    "confirmed": false,
                    "major": true,
                    "priority": 1,
                    "created_date": "2016-07-03",
                    "created_by": "nbartlein",
                    "modified_date": "2017-07-04",
                    "modified_by": "nbartlein"
                },
                "states": [
                    {
                        "id": 1469,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "IA",
                        "created_date": "2012-09-25",
                        "created_by": "kmiller",
                        "modified_date": "2014-01-13",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1252,
                        "name": "Juneau",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "88.0019",
                        "centroid_longitude": "99.7831",
                        "fips_code": "5ade42646f5d581118469486",
                        "created_date": "2012-11-12",
                        "created_by": "nbartlein",
                        "modified_date": "2014-12-01",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1463,
                        "name": "Polk",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "19.1776",
                        "centroid_longitude": "-2.3036",
                        "fips_code": "5ade42641cd6deefb268346b",
                        "created_date": "2013-09-28",
                        "created_by": "nbartlein",
                        "modified_date": "2015-09-24",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1159,
                        "name": "Snow Goose",
                        "class_name": "in",
                        "order_name": "dolor",
                        "family_name": "velit",
                        "sub_family_name": "non",
                        "genus_name": "aliqua",
                        "species_latin_name": "anim",
                        "subspecies_latin_name": "proident",
                        "tsn": 5,
                        "created_date": "2015-10-20",
                        "created_by": "nbartlein",
                        "modified_date": "2017-10-20",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1200,
                        "name": "Brown-headed Cowbird",
                        "class_name": "eiusmod",
                        "order_name": "ea",
                        "family_name": "tempor",
                        "sub_family_name": "adipisicing",
                        "genus_name": "eu",
                        "species_latin_name": "aliquip",
                        "subspecies_latin_name": "labore",
                        "tsn": 5,
                        "created_date": "2013-01-02",
                        "created_by": "nbartlein",
                        "modified_date": "2014-05-21",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1006,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "event_reference": " Neteria",
                "complete": true,
                "start_date": "2011-08-14",
                "end_date": "2013-07-24",
                "affected_count": 24,
                "epi_staff": "Schwartz Witt",
                "event_status": 3,
                "event_status_string": "Supplemental Report Needed",
                "legal_status": "Legal - Case Closed",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Tue Feb 19 2013 10:18:32 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Thu Jun 12 2014 03:11:05 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnosis": {
                    "id": 1337,
                    "diagnosis": 3,
                    "diagnosis_string": "Open",
                    "confirmed": false,
                    "major": false,
                    "priority": 3,
                    "created_date": "2017-07-20",
                    "created_by": "jchipault",
                    "modified_date": "2017-08-25",
                    "modified_by": "jchipault"
                },
                "states": [
                    {
                        "id": 1012,
                        "name": "Minnesota",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2016-10-05",
                        "created_by": "nbartlein",
                        "modified_date": "2014-01-05",
                        "modified_by": "nbartlein"
                    }
                ],
                "counties": [
                    {
                        "id": 1128,
                        "name": "Hennepin",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "23.2643",
                        "centroid_longitude": "-78.3602",
                        "fips_code": "5ade426480ad44698e00e243",
                        "created_date": "2013-01-14",
                        "created_by": "jchipault",
                        "modified_date": "2017-01-17",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1420,
                        "name": "Marathon",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "12.4897",
                        "centroid_longitude": "-110.9103",
                        "fips_code": "5ade4264e2bc2720a518147c",
                        "created_date": "2013-02-16",
                        "created_by": "nbartlein",
                        "modified_date": "2015-10-01",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1221,
                        "name": "Dane",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "43.9437",
                        "centroid_longitude": "-81.9139",
                        "fips_code": "5ade426468f60aca1787d279",
                        "created_date": "2013-08-28",
                        "created_by": "kmiller",
                        "modified_date": "2017-02-07",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1126,
                        "name": "Marathon",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "11.9138",
                        "centroid_longitude": "72.6833",
                        "fips_code": "5ade42647ceab54a1cf5a5ad",
                        "created_date": "2013-03-27",
                        "created_by": "jchipault",
                        "modified_date": "2014-07-08",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1167,
                        "name": "Brown Pelican",
                        "class_name": "proident",
                        "order_name": "fugiat",
                        "family_name": "ad",
                        "sub_family_name": "deserunt",
                        "genus_name": "esse",
                        "species_latin_name": "amet",
                        "subspecies_latin_name": "sunt",
                        "tsn": 5,
                        "created_date": "2018-10-30",
                        "created_by": "nbartlein",
                        "modified_date": "2011-10-28",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1276,
                        "name": "Mallard",
                        "class_name": "excepteur",
                        "order_name": "est",
                        "family_name": "commodo",
                        "sub_family_name": "deserunt",
                        "genus_name": "aliqua",
                        "species_latin_name": "consequat",
                        "subspecies_latin_name": "id",
                        "tsn": 2,
                        "created_date": "2019-01-19",
                        "created_by": "nbartlein",
                        "modified_date": "2015-01-21",
                        "modified_by": "kmiller"
                    }
                ]
            },
            {
                "id": 1007,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "event_reference": " Wazzu",
                "complete": true,
                "start_date": "2016-05-06",
                "end_date": "2012-10-27",
                "affected_count": 36,
                "epi_staff": "Dudley Doyle",
                "event_status": 2,
                "event_status_string": "Field and Diagnostics Ongoing",
                "legal_status": "Legal - Case Open",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Mon Feb 22 2016 23:43:56 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Fri Jul 18 2014 01:44:52 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnosis": {
                    "id": 1121,
                    "diagnosis": 5,
                    "diagnosis_string": "Schistosomiasis",
                    "confirmed": false,
                    "major": true,
                    "priority": 2,
                    "created_date": "2013-04-16",
                    "created_by": "kmiller",
                    "modified_date": "2014-01-05",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1328,
                        "name": "Michigan",
                        "country": 30,
                        "abbreviation": "MN",
                        "created_date": "2013-04-22",
                        "created_by": "kmiller",
                        "modified_date": "2017-11-24",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1201,
                        "name": "Hennepin",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "12.9842",
                        "centroid_longitude": "57.1304",
                        "fips_code": "5ade426472d058f52217e27a",
                        "created_date": "2015-04-07",
                        "created_by": "nbartlein",
                        "modified_date": "2011-11-14",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1211,
                        "name": "Hennepin",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "14.6374",
                        "centroid_longitude": "157.5376",
                        "fips_code": "5ade426464be02c2c8a085e4",
                        "created_date": "2017-10-27",
                        "created_by": "jchipault",
                        "modified_date": "2018-07-13",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1351,
                        "name": "Marathon",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "19.9375",
                        "centroid_longitude": "122.6397",
                        "fips_code": "5ade426457e9f16d57d8b41a",
                        "created_date": "2011-09-15",
                        "created_by": "nbartlein",
                        "modified_date": "2013-10-05",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1396,
                        "name": "Hennepin",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "8.5027",
                        "centroid_longitude": "79.1439",
                        "fips_code": "5ade42644a5474691b9a41db",
                        "created_date": "2013-05-25",
                        "created_by": "jchipault",
                        "modified_date": "2013-05-23",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1454,
                        "name": "Common Loon",
                        "class_name": "magna",
                        "order_name": "consequat",
                        "family_name": "adipisicing",
                        "sub_family_name": "nisi",
                        "genus_name": "magna",
                        "species_latin_name": "pariatur",
                        "subspecies_latin_name": "ipsum",
                        "tsn": 5,
                        "created_date": "2014-02-06",
                        "created_by": "nbartlein",
                        "modified_date": "2013-08-30",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1008,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Marqet",
                "complete": true,
                "start_date": "2015-05-20",
                "end_date": "2017-04-05",
                "affected_count": 40,
                "epi_staff": "Elinor English",
                "event_status": 3,
                "event_status_string": "Completed by Owner",
                "legal_status": "Potential Legal",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Sun Dec 21 2014 16:12:56 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Sat Jul 30 2016 06:44:02 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnosis": {
                    "id": 1485,
                    "diagnosis": 1,
                    "diagnosis_string": "Schistosomiasis",
                    "confirmed": true,
                    "major": false,
                    "priority": 3,
                    "created_date": "2017-09-03",
                    "created_by": "kmiller",
                    "modified_date": "2016-11-20",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1005,
                        "name": "Minnesota",
                        "country": 30,
                        "abbreviation": "MN",
                        "created_date": "2014-12-17",
                        "created_by": "kmiller",
                        "modified_date": "2011-04-17",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1371,
                        "name": "Dane",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "23.1493",
                        "centroid_longitude": "-117.941",
                        "fips_code": "5ade42645cbe9696f787cdfc",
                        "created_date": "2014-07-10",
                        "created_by": "kmiller",
                        "modified_date": "2015-06-09",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1205,
                        "name": "Dane",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "75.4175",
                        "centroid_longitude": "17.7599",
                        "fips_code": "5ade426470cc70d5b6fa57de",
                        "created_date": "2014-01-12",
                        "created_by": "jchipault",
                        "modified_date": "2016-08-31",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1350,
                        "name": "Juneau",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "4.7773",
                        "centroid_longitude": "114.1484",
                        "fips_code": "5ade4264964f8bc907bbb9b2",
                        "created_date": "2014-04-08",
                        "created_by": "jchipault",
                        "modified_date": "2014-06-19",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1067,
                        "name": "Common Loon",
                        "class_name": "enim",
                        "order_name": "reprehenderit",
                        "family_name": "occaecat",
                        "sub_family_name": "exercitation",
                        "genus_name": "labore",
                        "species_latin_name": "et",
                        "subspecies_latin_name": "adipisicing",
                        "tsn": 5,
                        "created_date": "2011-03-06",
                        "created_by": "jchipault",
                        "modified_date": "2014-08-06",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1362,
                        "name": "Brown Pelican",
                        "class_name": "enim",
                        "order_name": "occaecat",
                        "family_name": "voluptate",
                        "sub_family_name": "nulla",
                        "genus_name": "in",
                        "species_latin_name": "esse",
                        "subspecies_latin_name": "pariatur",
                        "tsn": 5,
                        "created_date": "2011-06-15",
                        "created_by": "jchipault",
                        "modified_date": "2012-10-22",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1009,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "event_reference": " Uncorp",
                "complete": true,
                "start_date": "2011-01-13",
                "end_date": "2012-10-02",
                "affected_count": 34,
                "epi_staff": "Felecia Henry",
                "event_status": 6,
                "event_status_string": "Completed by Owner",
                "legal_status": "Legal - Case Closed",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Fri Nov 25 2016 15:51:03 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Fri Sep 12 2014 12:27:19 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnosis": {
                    "id": 1130,
                    "diagnosis": 4,
                    "diagnosis_string": "Schistosomiasis",
                    "confirmed": true,
                    "major": true,
                    "priority": 1,
                    "created_date": "2017-08-26",
                    "created_by": "nbartlein",
                    "modified_date": "2018-06-25",
                    "modified_by": "nbartlein"
                },
                "states": [
                    {
                        "id": 1214,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2017-09-02",
                        "created_by": "kmiller",
                        "modified_date": "2014-03-17",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1384,
                        "name": "Minnesota",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2014-11-23",
                        "created_by": "jchipault",
                        "modified_date": "2016-11-09",
                        "modified_by": "nbartlein"
                    }
                ],
                "counties": [
                    {
                        "id": 1342,
                        "name": "Hennepin",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "83.1388",
                        "centroid_longitude": "-77.86",
                        "fips_code": "5ade4264e7b03ba5c1de15ff",
                        "created_date": "2013-10-14",
                        "created_by": "nbartlein",
                        "modified_date": "2013-01-13",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1366,
                        "name": "Polk",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "58.8368",
                        "centroid_longitude": "-108.874",
                        "fips_code": "5ade42644e42e0fd59f93aa8",
                        "created_date": "2015-07-20",
                        "created_by": "jchipault",
                        "modified_date": "2013-12-03",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1216,
                        "name": "Marquette",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "9.3854",
                        "centroid_longitude": "-91.3159",
                        "fips_code": "5ade4264595e2c0daca77844",
                        "created_date": "2015-01-26",
                        "created_by": "nbartlein",
                        "modified_date": "2017-10-03",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1341,
                        "name": "Hennepin",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "73.0667",
                        "centroid_longitude": "-127.7506",
                        "fips_code": "5ade4264a222d9862eca4c97",
                        "created_date": "2014-03-20",
                        "created_by": "kmiller",
                        "modified_date": "2018-08-28",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1029,
                        "name": "Snow Goose",
                        "class_name": "in",
                        "order_name": "amet",
                        "family_name": "dolor",
                        "sub_family_name": "ex",
                        "genus_name": "ullamco",
                        "species_latin_name": "fugiat",
                        "subspecies_latin_name": "velit",
                        "tsn": 1,
                        "created_date": "2011-11-29",
                        "created_by": "jchipault",
                        "modified_date": "2015-01-08",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1140,
                        "name": "Brown-headed Cowbird",
                        "class_name": "duis",
                        "order_name": "minim",
                        "family_name": "minim",
                        "sub_family_name": "velit",
                        "genus_name": "duis",
                        "species_latin_name": "qui",
                        "subspecies_latin_name": "cillum",
                        "tsn": 1,
                        "created_date": "2015-06-12",
                        "created_by": "jchipault",
                        "modified_date": "2012-11-06",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1010,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Ontagene",
                "complete": true,
                "start_date": "2012-12-05",
                "end_date": "2015-01-24",
                "affected_count": 30,
                "epi_staff": "Alisa Gregory",
                "event_status": 2,
                "event_status_string": "New Event Record",
                "legal_status": "Legal - Case Open",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Tue May 31 2016 14:46:25 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Mon Jan 30 2012 13:23:56 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnosis": {
                    "id": 1432,
                    "diagnosis": 1,
                    "diagnosis_string": "Avian Cholera",
                    "confirmed": false,
                    "major": true,
                    "priority": 1,
                    "created_date": "2013-10-06",
                    "created_by": "jchipault",
                    "modified_date": "2017-06-22",
                    "modified_by": "nbartlein"
                },
                "states": [
                    {
                        "id": 1324,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2018-05-29",
                        "created_by": "nbartlein",
                        "modified_date": "2017-07-06",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1193,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2012-03-22",
                        "created_by": "kmiller",
                        "modified_date": "2018-12-09",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1405,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "26.4378",
                        "centroid_longitude": "141.0736",
                        "fips_code": "5ade4264a56411f04a97e3db",
                        "created_date": "2018-07-15",
                        "created_by": "kmiller",
                        "modified_date": "2016-07-09",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1438,
                        "name": "Dane",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "59.2857",
                        "centroid_longitude": "-161.6391",
                        "fips_code": "5ade42646bb8ef096dcc5b01",
                        "created_date": "2016-10-03",
                        "created_by": "jchipault",
                        "modified_date": "2016-03-20",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1084,
                        "name": "Juneau",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "38.1678",
                        "centroid_longitude": "107.005",
                        "fips_code": "5ade42644b8150ec5b35dc69",
                        "created_date": "2015-04-06",
                        "created_by": "kmiller",
                        "modified_date": "2016-11-06",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1051,
                        "name": "Gopher Frog",
                        "class_name": "commodo",
                        "order_name": "fugiat",
                        "family_name": "elit",
                        "sub_family_name": "sint",
                        "genus_name": "nostrud",
                        "species_latin_name": "aliquip",
                        "subspecies_latin_name": "sint",
                        "tsn": 4,
                        "created_date": "2012-02-21",
                        "created_by": "jchipault",
                        "modified_date": "2013-04-12",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1474,
                        "name": "Snow Goose",
                        "class_name": "pariatur",
                        "order_name": "quis",
                        "family_name": "nulla",
                        "sub_family_name": "eu",
                        "genus_name": "ullamco",
                        "species_latin_name": "est",
                        "subspecies_latin_name": "nulla",
                        "tsn": 3,
                        "created_date": "2016-04-10",
                        "created_by": "jchipault",
                        "modified_date": "2017-05-19",
                        "modified_by": "kmiller"
                    }
                ]
            },
            {
                "id": 1011,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "event_reference": " Zerology",
                "complete": true,
                "start_date": "2011-03-05",
                "end_date": "2011-09-26",
                "affected_count": 28,
                "epi_staff": "Becker Parks",
                "event_status": 6,
                "event_status_string": "Completed by Owner",
                "legal_status": "Potential Legal",
                "legal_number": null,
                "superevent": "",
                "created_date": "Thu Jul 14 2016 23:05:56 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Wed Oct 08 2014 06:49:24 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnosis": {
                    "id": 1091,
                    "diagnosis": 4,
                    "diagnosis_string": "Avian Cholera",
                    "confirmed": true,
                    "major": false,
                    "priority": 3,
                    "created_date": "2016-12-09",
                    "created_by": "jchipault",
                    "modified_date": "2015-11-09",
                    "modified_by": "nbartlein"
                },
                "states": [
                    {
                        "id": 1055,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2014-12-01",
                        "created_by": "kmiller",
                        "modified_date": "2017-05-01",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1490,
                        "name": "Michigan",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2015-09-21",
                        "created_by": "jchipault",
                        "modified_date": "2014-03-03",
                        "modified_by": "kmiller"
                    }
                ],
                "counties": [
                    {
                        "id": 1141,
                        "name": "Juneau",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "30.1452",
                        "centroid_longitude": "124.1237",
                        "fips_code": "5ade4264979ea9d44974fff7",
                        "created_date": "2014-10-11",
                        "created_by": "jchipault",
                        "modified_date": "2011-09-02",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1296,
                        "name": "Dane",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "6.4376",
                        "centroid_longitude": "-91.4735",
                        "fips_code": "5ade4264629aae54e9505c1f",
                        "created_date": "2011-12-14",
                        "created_by": "jchipault",
                        "modified_date": "2018-04-13",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1357,
                        "name": "Juneau",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "73.575",
                        "centroid_longitude": "-139.2127",
                        "fips_code": "5ade4264b6b9f4166a197700",
                        "created_date": "2018-01-30",
                        "created_by": "jchipault",
                        "modified_date": "2015-04-26",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1220,
                        "name": "Common Loon",
                        "class_name": "voluptate",
                        "order_name": "labore",
                        "family_name": "ex",
                        "sub_family_name": "Lorem",
                        "genus_name": "nostrud",
                        "species_latin_name": "tempor",
                        "subspecies_latin_name": "do",
                        "tsn": 5,
                        "created_date": "2016-10-16",
                        "created_by": "nbartlein",
                        "modified_date": "2018-10-27",
                        "modified_by": "kmiller"
                    }
                ]
            },
            {
                "id": 1012,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "event_reference": " Grainspot",
                "complete": false,
                "start_date": "2012-08-02",
                "end_date": "2018-02-14",
                "affected_count": 25,
                "epi_staff": "Susanne Lowery",
                "event_status": 3,
                "event_status_string": "New Event Record",
                "legal_status": "Potential Legal",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Sun Jul 12 2015 21:49:34 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Thu Apr 18 2013 22:48:59 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnosis": {
                    "id": 1445,
                    "diagnosis": 2,
                    "diagnosis_string": "Open",
                    "confirmed": false,
                    "major": true,
                    "priority": 2,
                    "created_date": "2018-07-30",
                    "created_by": "nbartlein",
                    "modified_date": "2019-01-27",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1431,
                        "name": "Minnesota",
                        "country": 30,
                        "abbreviation": "IA",
                        "created_date": "2017-05-24",
                        "created_by": "kmiller",
                        "modified_date": "2017-03-02",
                        "modified_by": "nbartlein"
                    }
                ],
                "counties": [
                    {
                        "id": 1297,
                        "name": "Dane",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "17.6688",
                        "centroid_longitude": "95.8141",
                        "fips_code": "5ade426496108834d47592bf",
                        "created_date": "2013-01-10",
                        "created_by": "jchipault",
                        "modified_date": "2018-11-18",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1449,
                        "name": "Hennepin",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "3.7195",
                        "centroid_longitude": "150.1382",
                        "fips_code": "5ade4264fdf28b2a315a15ff",
                        "created_date": "2015-05-20",
                        "created_by": "nbartlein",
                        "modified_date": "2017-08-15",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1203,
                        "name": "Snow Goose",
                        "class_name": "cupidatat",
                        "order_name": "officia",
                        "family_name": "eu",
                        "sub_family_name": "ut",
                        "genus_name": "anim",
                        "species_latin_name": "aliqua",
                        "subspecies_latin_name": "Lorem",
                        "tsn": 2,
                        "created_date": "2014-05-31",
                        "created_by": "jchipault",
                        "modified_date": "2018-07-02",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1013,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Syntac",
                "complete": false,
                "start_date": "2016-04-03",
                "end_date": "2015-07-06",
                "affected_count": 40,
                "epi_staff": "Clare Watts",
                "event_status": 4,
                "event_status_string": "Supplemental Report Needed",
                "legal_status": "Legal - Case Closed",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Fri Feb 16 2018 19:17:38 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Sun Jan 31 2016 03:45:59 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnosis": {
                    "id": 1069,
                    "diagnosis": 2,
                    "diagnosis_string": "Avian Cholera",
                    "confirmed": false,
                    "major": true,
                    "priority": 2,
                    "created_date": "2011-12-15",
                    "created_by": "kmiller",
                    "modified_date": "2018-12-06",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1442,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "MT",
                        "created_date": "2018-02-23",
                        "created_by": "jchipault",
                        "modified_date": "2015-04-06",
                        "modified_by": "kmiller"
                    }
                ],
                "counties": [
                    {
                        "id": 1461,
                        "name": "Polk",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "78.627",
                        "centroid_longitude": "39.3343",
                        "fips_code": "5ade4264587413ac21659255",
                        "created_date": "2017-09-08",
                        "created_by": "nbartlein",
                        "modified_date": "2013-12-30",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1060,
                        "name": "Dane",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "35.8463",
                        "centroid_longitude": "-152.322",
                        "fips_code": "5ade426454e7e97addc987a4",
                        "created_date": "2012-02-14",
                        "created_by": "jchipault",
                        "modified_date": "2014-05-01",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1078,
                        "name": "Marathon",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "57.2087",
                        "centroid_longitude": "-137.462",
                        "fips_code": "5ade42641c360c765f4bedd3",
                        "created_date": "2013-06-04",
                        "created_by": "nbartlein",
                        "modified_date": "2012-09-30",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1418,
                        "name": "Gopher Frog",
                        "class_name": "ea",
                        "order_name": "ex",
                        "family_name": "aliquip",
                        "sub_family_name": "eiusmod",
                        "genus_name": "reprehenderit",
                        "species_latin_name": "veniam",
                        "subspecies_latin_name": "in",
                        "tsn": 3,
                        "created_date": "2015-10-11",
                        "created_by": "nbartlein",
                        "modified_date": "2015-11-08",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1030,
                        "name": "Snow Goose",
                        "class_name": "esse",
                        "order_name": "veniam",
                        "family_name": "non",
                        "sub_family_name": "non",
                        "genus_name": "voluptate",
                        "species_latin_name": "incididunt",
                        "subspecies_latin_name": "quis",
                        "tsn": 1,
                        "created_date": "2012-07-05",
                        "created_by": "jchipault",
                        "modified_date": "2017-03-10",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1014,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Luxuria",
                "complete": true,
                "start_date": "2017-11-24",
                "end_date": "2011-06-10",
                "affected_count": 30,
                "epi_staff": "Pickett Cooper",
                "event_status": 2,
                "event_status_string": "Supplemental Report Needed",
                "legal_status": "Legal - Case Closed",
                "legal_number": null,
                "superevent": "",
                "created_date": "Tue Dec 17 2013 14:05:50 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Sun Jan 07 2018 13:07:16 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnosis": {
                    "id": 1124,
                    "diagnosis": 3,
                    "diagnosis_string": "Schistosomiasis",
                    "confirmed": true,
                    "major": true,
                    "priority": 1,
                    "created_date": "2018-11-16",
                    "created_by": "kmiller",
                    "modified_date": "2017-03-10",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1194,
                        "name": "Michigan",
                        "country": 30,
                        "abbreviation": "MT",
                        "created_date": "2013-10-24",
                        "created_by": "kmiller",
                        "modified_date": "2015-09-20",
                        "modified_by": "kmiller"
                    }
                ],
                "counties": [
                    {
                        "id": 1335,
                        "name": "Juneau",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "3.9054",
                        "centroid_longitude": "-99.9645",
                        "fips_code": "5ade4264d43bc0fbc01a73a9",
                        "created_date": "2019-01-23",
                        "created_by": "kmiller",
                        "modified_date": "2015-02-26",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1059,
                        "name": "Hennepin",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "5.7423",
                        "centroid_longitude": "-37.4374",
                        "fips_code": "5ade4264efd7a3d64d00bfbd",
                        "created_date": "2011-08-17",
                        "created_by": "nbartlein",
                        "modified_date": "2015-08-13",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1433,
                        "name": "Marathon",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "88.2899",
                        "centroid_longitude": "-115.1005",
                        "fips_code": "5ade4264db47882c97a1344e",
                        "created_date": "2011-10-10",
                        "created_by": "kmiller",
                        "modified_date": "2017-10-17",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1155,
                        "name": "Juneau",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "30.6966",
                        "centroid_longitude": "76.0096",
                        "fips_code": "5ade426450081d9e04921cf4",
                        "created_date": "2018-06-03",
                        "created_by": "nbartlein",
                        "modified_date": "2018-01-31",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1456,
                        "name": "Common Loon",
                        "class_name": "laborum",
                        "order_name": "do",
                        "family_name": "fugiat",
                        "sub_family_name": "amet",
                        "genus_name": "eiusmod",
                        "species_latin_name": "sit",
                        "subspecies_latin_name": "mollit",
                        "tsn": 2,
                        "created_date": "2013-12-23",
                        "created_by": "kmiller",
                        "modified_date": "2011-12-11",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1285,
                        "name": "Brown Pelican",
                        "class_name": "sit",
                        "order_name": "commodo",
                        "family_name": "consequat",
                        "sub_family_name": "dolore",
                        "genus_name": "ad",
                        "species_latin_name": "ad",
                        "subspecies_latin_name": "anim",
                        "tsn": 1,
                        "created_date": "2014-03-19",
                        "created_by": "nbartlein",
                        "modified_date": "2011-08-06",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1015,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "event_reference": " Ginkle",
                "complete": true,
                "start_date": "2017-06-11",
                "end_date": "2015-11-16",
                "affected_count": 21,
                "epi_staff": "Anna Waters",
                "event_status": 3,
                "event_status_string": "Supplemental Report Needed",
                "legal_status": "Potential Legal",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Tue Jan 17 2017 04:51:32 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Tue Mar 17 2015 02:24:52 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnosis": {
                    "id": 1209,
                    "diagnosis": 3,
                    "diagnosis_string": "Schistosomiasis",
                    "confirmed": false,
                    "major": false,
                    "priority": 3,
                    "created_date": "2014-06-08",
                    "created_by": "jchipault",
                    "modified_date": "2011-12-22",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1033,
                        "name": "Michigan",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2017-12-30",
                        "created_by": "nbartlein",
                        "modified_date": "2014-07-03",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1379,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "MT",
                        "created_date": "2016-01-04",
                        "created_by": "jchipault",
                        "modified_date": "2017-11-15",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1467,
                        "name": "Marquette",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "63.374",
                        "centroid_longitude": "-46.7294",
                        "fips_code": "5ade42643192c6d73a47dded",
                        "created_date": "2016-05-31",
                        "created_by": "nbartlein",
                        "modified_date": "2014-12-29",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1164,
                        "name": "Marquette",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "71.1416",
                        "centroid_longitude": "-136.4723",
                        "fips_code": "5ade42648ed55d3223030a78",
                        "created_date": "2017-08-14",
                        "created_by": "nbartlein",
                        "modified_date": "2014-08-29",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1338,
                        "name": "Brown-headed Cowbird",
                        "class_name": "do",
                        "order_name": "consequat",
                        "family_name": "anim",
                        "sub_family_name": "adipisicing",
                        "genus_name": "non",
                        "species_latin_name": "minim",
                        "subspecies_latin_name": "fugiat",
                        "tsn": 5,
                        "created_date": "2017-03-26",
                        "created_by": "jchipault",
                        "modified_date": "2014-03-10",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1016,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "event_reference": " Endicil",
                "complete": false,
                "start_date": "2013-07-08",
                "end_date": "2012-12-16",
                "affected_count": 40,
                "epi_staff": "Boyd Meyer",
                "event_status": 3,
                "event_status_string": "New Event Record",
                "legal_status": "Legal - Case Open",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Thu Jan 19 2012 17:56:43 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Mon Aug 08 2016 20:20:52 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnosis": {
                    "id": 1270,
                    "diagnosis": 2,
                    "diagnosis_string": "Avian Cholera",
                    "confirmed": true,
                    "major": false,
                    "priority": 1,
                    "created_date": "2015-07-09",
                    "created_by": "nbartlein",
                    "modified_date": "2011-11-01",
                    "modified_by": "jchipault"
                },
                "states": [
                    {
                        "id": 1386,
                        "name": "Montana",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2018-12-28",
                        "created_by": "jchipault",
                        "modified_date": "2011-08-23",
                        "modified_by": "jchipault"
                    }
                ],
                "counties": [
                    {
                        "id": 1183,
                        "name": "Marathon",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "17.186",
                        "centroid_longitude": "-20.753",
                        "fips_code": "5ade4264f2cac473f9be3c5e",
                        "created_date": "2013-07-31",
                        "created_by": "jchipault",
                        "modified_date": "2017-12-26",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1296,
                        "name": "Marathon",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "3.2109",
                        "centroid_longitude": "40.4263",
                        "fips_code": "5ade426448f5ff8d1b7174b6",
                        "created_date": "2015-03-03",
                        "created_by": "nbartlein",
                        "modified_date": "2017-08-30",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1494,
                        "name": "Hennepin",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "44.5101",
                        "centroid_longitude": "149.503",
                        "fips_code": "5ade42644eb381c7ba89ce1a",
                        "created_date": "2018-03-15",
                        "created_by": "jchipault",
                        "modified_date": "2013-09-27",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1275,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "35.9036",
                        "centroid_longitude": "114.3768",
                        "fips_code": "5ade42647c50777fc66d9fcd",
                        "created_date": "2016-04-16",
                        "created_by": "jchipault",
                        "modified_date": "2012-07-09",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1374,
                        "name": "Common Loon",
                        "class_name": "laboris",
                        "order_name": "eiusmod",
                        "family_name": "tempor",
                        "sub_family_name": "qui",
                        "genus_name": "in",
                        "species_latin_name": "qui",
                        "subspecies_latin_name": "incididunt",
                        "tsn": 1,
                        "created_date": "2017-12-06",
                        "created_by": "kmiller",
                        "modified_date": "2015-10-29",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1406,
                        "name": "Gopher Frog",
                        "class_name": "excepteur",
                        "order_name": "esse",
                        "family_name": "velit",
                        "sub_family_name": "commodo",
                        "genus_name": "aute",
                        "species_latin_name": "consectetur",
                        "subspecies_latin_name": "laboris",
                        "tsn": 4,
                        "created_date": "2011-10-05",
                        "created_by": "nbartlein",
                        "modified_date": "2012-10-15",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1017,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Jumpstack",
                "complete": false,
                "start_date": "2013-07-12",
                "end_date": "2013-01-18",
                "affected_count": 25,
                "epi_staff": "Lenore Stuart",
                "event_status": 5,
                "event_status_string": "Final Report Needed",
                "legal_status": "N/A",
                "legal_number": null,
                "superevent": "",
                "created_date": "Thu Jan 22 2015 02:18:10 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Fri Jan 09 2015 00:59:22 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnosis": {
                    "id": 1244,
                    "diagnosis": 4,
                    "diagnosis_string": "Aspergillosis",
                    "confirmed": true,
                    "major": false,
                    "priority": 1,
                    "created_date": "2013-05-05",
                    "created_by": "kmiller",
                    "modified_date": "2015-05-29",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1219,
                        "name": "Minnesota",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2017-08-22",
                        "created_by": "kmiller",
                        "modified_date": "2015-06-26",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1063,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2017-02-21",
                        "created_by": "kmiller",
                        "modified_date": "2011-03-03",
                        "modified_by": "kmiller"
                    }
                ],
                "counties": [
                    {
                        "id": 1063,
                        "name": "Dane",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "12.743",
                        "centroid_longitude": "157.6087",
                        "fips_code": "5ade42642c3f167cd227a919",
                        "created_date": "2015-11-30",
                        "created_by": "nbartlein",
                        "modified_date": "2013-03-16",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1312,
                        "name": "Marquette",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "57.1972",
                        "centroid_longitude": "-164.9993",
                        "fips_code": "5ade4264b2053f9e2cb6403c",
                        "created_date": "2013-08-01",
                        "created_by": "nbartlein",
                        "modified_date": "2016-05-09",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1169,
                        "name": "Polk",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "22.3133",
                        "centroid_longitude": "-13.6513",
                        "fips_code": "5ade426403b1e8ee6b08053e",
                        "created_date": "2012-06-29",
                        "created_by": "jchipault",
                        "modified_date": "2013-05-11",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1246,
                        "name": "Marathon",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "84.8697",
                        "centroid_longitude": "-85.6993",
                        "fips_code": "5ade4264c6c02498deab6f29",
                        "created_date": "2012-01-11",
                        "created_by": "kmiller",
                        "modified_date": "2013-03-28",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1243,
                        "name": "Gopher Frog",
                        "class_name": "ex",
                        "order_name": "consequat",
                        "family_name": "laborum",
                        "sub_family_name": "consequat",
                        "genus_name": "sunt",
                        "species_latin_name": "labore",
                        "subspecies_latin_name": "aute",
                        "tsn": 5,
                        "created_date": "2011-06-12",
                        "created_by": "nbartlein",
                        "modified_date": "2011-07-23",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1009,
                        "name": "Mallard",
                        "class_name": "ad",
                        "order_name": "aliquip",
                        "family_name": "non",
                        "sub_family_name": "enim",
                        "genus_name": "velit",
                        "species_latin_name": "laboris",
                        "subspecies_latin_name": "nostrud",
                        "tsn": 3,
                        "created_date": "2017-08-01",
                        "created_by": "jchipault",
                        "modified_date": "2012-07-13",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1018,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Enomen",
                "complete": false,
                "start_date": "2016-12-11",
                "end_date": "2013-01-04",
                "affected_count": 24,
                "epi_staff": "Matilda Workman",
                "event_status": 3,
                "event_status_string": "New Event Record",
                "legal_status": "Legal - Case Closed",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Sun Dec 02 2012 09:53:30 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Wed Jun 05 2013 00:53:42 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnosis": {
                    "id": 1242,
                    "diagnosis": 3,
                    "diagnosis_string": "Avian Cholera",
                    "confirmed": true,
                    "major": false,
                    "priority": 3,
                    "created_date": "2016-03-11",
                    "created_by": "jchipault",
                    "modified_date": "2018-04-03",
                    "modified_by": "kmiller"
                },
                "states": [
                    {
                        "id": 1102,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "MN",
                        "created_date": "2011-07-20",
                        "created_by": "jchipault",
                        "modified_date": "2012-08-30",
                        "modified_by": "kmiller"
                    }
                ],
                "counties": [
                    {
                        "id": 1494,
                        "name": "Juneau",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "0.0131",
                        "centroid_longitude": "101.5116",
                        "fips_code": "5ade42647222f7811e8b2b7b",
                        "created_date": "2015-02-03",
                        "created_by": "jchipault",
                        "modified_date": "2013-12-27",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1458,
                        "name": "Marathon",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "47.4481",
                        "centroid_longitude": "16.2704",
                        "fips_code": "5ade4264b6f542398ad6550b",
                        "created_date": "2013-12-26",
                        "created_by": "kmiller",
                        "modified_date": "2016-09-27",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1384,
                        "name": "Dane",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "25.5024",
                        "centroid_longitude": "-25.8257",
                        "fips_code": "5ade426484b427bef72bc690",
                        "created_date": "2012-02-05",
                        "created_by": "jchipault",
                        "modified_date": "2014-04-08",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1288,
                        "name": "Snow Goose",
                        "class_name": "eu",
                        "order_name": "aliquip",
                        "family_name": "mollit",
                        "sub_family_name": "amet",
                        "genus_name": "proident",
                        "species_latin_name": "commodo",
                        "subspecies_latin_name": "mollit",
                        "tsn": 1,
                        "created_date": "2018-01-30",
                        "created_by": "jchipault",
                        "modified_date": "2012-11-11",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1047,
                        "name": "Brown Pelican",
                        "class_name": "aliqua",
                        "order_name": "laborum",
                        "family_name": "anim",
                        "sub_family_name": "nisi",
                        "genus_name": "officia",
                        "species_latin_name": "mollit",
                        "subspecies_latin_name": "amet",
                        "tsn": 3,
                        "created_date": "2014-02-13",
                        "created_by": "kmiller",
                        "modified_date": "2013-07-25",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1019,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "event_reference": " Deepends",
                "complete": true,
                "start_date": "2011-10-14",
                "end_date": "2018-11-07",
                "affected_count": 23,
                "epi_staff": "Elliott Rosales",
                "event_status": 2,
                "event_status_string": "Supplemental Report Needed",
                "legal_status": "N/A",
                "legal_number": 12456,
                "superevent": "",
                "created_date": "Thu Oct 26 2017 17:22:28 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Tue Feb 07 2017 10:20:20 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnosis": {
                    "id": 1268,
                    "diagnosis": 2,
                    "diagnosis_string": "Schistosomiasis",
                    "confirmed": false,
                    "major": false,
                    "priority": 2,
                    "created_date": "2011-03-07",
                    "created_by": "kmiller",
                    "modified_date": "2016-12-18",
                    "modified_by": "nbartlein"
                },
                "states": [
                    {
                        "id": 1431,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2014-02-21",
                        "created_by": "kmiller",
                        "modified_date": "2012-09-24",
                        "modified_by": "nbartlein"
                    }
                ],
                "counties": [
                    {
                        "id": 1371,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "55.6626",
                        "centroid_longitude": "-38.6362",
                        "fips_code": "5ade4264fddadd3917ef596f",
                        "created_date": "2014-03-05",
                        "created_by": "kmiller",
                        "modified_date": "2017-03-20",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1301,
                        "name": "Polk",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "34.3143",
                        "centroid_longitude": "-19.2371",
                        "fips_code": "5ade4264963364f8bbb57e54",
                        "created_date": "2017-08-18",
                        "created_by": "kmiller",
                        "modified_date": "2018-01-09",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1494,
                        "name": "Marathon",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "39.9621",
                        "centroid_longitude": "-37.3617",
                        "fips_code": "5ade426460e0425c7e2236fc",
                        "created_date": "2013-04-16",
                        "created_by": "kmiller",
                        "modified_date": "2013-12-17",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1036,
                        "name": "Brown Pelican",
                        "class_name": "quis",
                        "order_name": "est",
                        "family_name": "irure",
                        "sub_family_name": "pariatur",
                        "genus_name": "et",
                        "species_latin_name": "sunt",
                        "subspecies_latin_name": "nisi",
                        "tsn": 3,
                        "created_date": "2014-05-22",
                        "created_by": "kmiller",
                        "modified_date": "2017-10-11",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1284,
                        "name": "Brown-headed Cowbird",
                        "class_name": "ex",
                        "order_name": "nulla",
                        "family_name": "laboris",
                        "sub_family_name": "consequat",
                        "genus_name": "est",
                        "species_latin_name": "laborum",
                        "subspecies_latin_name": "aliquip",
                        "tsn": 5,
                        "created_date": "2013-09-28",
                        "created_by": "nbartlein",
                        "modified_date": "2017-01-07",
                        "modified_by": "jchipault"
                    }
                ]
            }
        ]
    }

    public static get SAMPLE_EVENT_DETAIL_DATA() {
        return [
            {
                "id": 1000,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 27,
                "end_date": "2017-08-31",
                "start_date": "2017-10-28",
                "complete": false,
                "event_reference": "duis",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Minnesota Department of Natural Resources",
                        "private_name": "IADNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1000,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1000,
                        "start_date": "2014-05-29",
                        "end_date": "2013-06-06",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Wisconsin",
                        "county": 47,
                        "county_string": "Marathon",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Mallard",
                                "population_count": 100,
                                "sick_count": 27,
                                "dead_count": 37,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Avian Cholera",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Other"
                                        },
                                        "confirmed": false,
                                        "major": true,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 2,
                                        "positive_count": 4,
                                        "suspect_count": 73,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1001,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 38,
                "end_date": "2016-04-18",
                "start_date": "2018-10-17",
                "complete": false,
                "event_reference": "et",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Iowa Department of Natural Resources-Clear Lake",
                        "private_name": "WDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1001,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1001,
                        "start_date": "2012-06-05",
                        "end_date": "2012-07-16",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Wisconsin",
                        "county": 47,
                        "county_string": "Juneau",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Gopher Frog",
                                "population_count": 100,
                                "sick_count": 29,
                                "dead_count": 28,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "None",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Aspergillosis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Nut/Met/Dev"
                                        },
                                        "confirmed": false,
                                        "major": true,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 2,
                                        "positive_count": 4,
                                        "suspect_count": 55,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Iowa Department of Natural Resources-Clear Lake"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1002,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 33,
                "end_date": "2017-08-18",
                "start_date": "2015-05-08",
                "complete": false,
                "event_reference": "duis",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources",
                        "private_name": "WDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1002,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1002,
                        "start_date": "2012-05-19",
                        "end_date": "2013-05-01",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Montana",
                        "county": 47,
                        "county_string": "Dane",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Common Loon",
                                "population_count": 100,
                                "sick_count": 33,
                                "dead_count": 27,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 1,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Hatchling",
                                "sex_bias": 1,
                                "sex_bias_string": "Unknown",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Schistosomiasis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Toxin"
                                        },
                                        "confirmed": false,
                                        "major": true,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 3,
                                        "positive_count": 4,
                                        "suspect_count": 21,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Iowa Department of Natural Resources-Boone"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1003,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 24,
                "end_date": "2011-01-19",
                "start_date": "2012-04-07",
                "complete": false,
                "event_reference": "elit",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources",
                        "private_name": "MNDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1003,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Avian Cholera",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1003,
                        "start_date": "2012-08-14",
                        "end_date": "2014-10-09",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Wisconsin",
                        "county": 47,
                        "county_string": "Hennepin",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Gopher Frog",
                                "population_count": 100,
                                "sick_count": 25,
                                "dead_count": 39,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 1,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Aspergillosis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Other"
                                        },
                                        "confirmed": false,
                                        "major": false,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 4,
                                        "positive_count": 4,
                                        "suspect_count": 24,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Iowa Department of Natural Resources-Boone"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1004,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 29,
                "end_date": "2014-03-06",
                "start_date": "2012-04-25",
                "complete": false,
                "event_reference": "sunt",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Iowa Department of Natural Resources-Clear Lake",
                        "private_name": "MNDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1004,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1004,
                        "start_date": "2014-10-05",
                        "end_date": "2011-08-14",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Michigan",
                        "county": 47,
                        "county_string": "Hennepin",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Brown-headed Cowbird",
                                "population_count": 100,
                                "sick_count": 24,
                                "dead_count": 40,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Aspergillosis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Bacteria"
                                        },
                                        "confirmed": true,
                                        "major": false,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 2,
                                        "positive_count": 4,
                                        "suspect_count": 50,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources-Science Ops"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1005,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 59,
                "end_date": "2011-01-27",
                "start_date": "2017-06-16",
                "complete": false,
                "event_reference": "tempor",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources",
                        "private_name": "WDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1005,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Avian Cholera",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1005,
                        "start_date": "2016-07-30",
                        "end_date": "2016-02-09",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Michigan",
                        "county": 47,
                        "county_string": "Hennepin",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Gopher Frog",
                                "population_count": 100,
                                "sick_count": 40,
                                "dead_count": 35,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "None",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Open",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Nut/Met/Dev"
                                        },
                                        "confirmed": true,
                                        "major": true,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 1,
                                        "positive_count": 2,
                                        "suspect_count": 43,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Iowa Department of Natural Resources-Clear Lake"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1006,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 85,
                "end_date": "2017-08-11",
                "start_date": "2011-09-14",
                "complete": false,
                "event_reference": "elit",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Iowa Department of Natural Resources-Clear Lake",
                        "private_name": "MNDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1006,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1006,
                        "start_date": "2017-05-13",
                        "end_date": "2018-04-15",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Wisconsin",
                        "county": 47,
                        "county_string": "Polk",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Brown-headed Cowbird",
                                "population_count": 100,
                                "sick_count": 27,
                                "dead_count": 23,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 1,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Hatchling",
                                "sex_bias": 1,
                                "sex_bias_string": "None",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Open",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Nut/Met/Dev"
                                        },
                                        "confirmed": true,
                                        "major": true,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 3,
                                        "positive_count": 4,
                                        "suspect_count": 29,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1007,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 33,
                "end_date": "2014-04-21",
                "start_date": "2014-12-04",
                "complete": false,
                "event_reference": "aliqua",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources-Science Ops",
                        "private_name": "IADNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1007,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Avian Cholera",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1007,
                        "start_date": "2016-02-10",
                        "end_date": "2015-02-15",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Illinois",
                        "county": 47,
                        "county_string": "Juneau",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Common Loon",
                                "population_count": 100,
                                "sick_count": 30,
                                "dead_count": 27,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Hatchling",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Avian Cholera",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Parasite"
                                        },
                                        "confirmed": false,
                                        "major": false,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 3,
                                        "positive_count": 2,
                                        "suspect_count": 69,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources-Science Ops"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1008,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 37,
                "end_date": "2013-12-01",
                "start_date": "2013-04-08",
                "complete": false,
                "event_reference": "quis",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Minnesota Department of Natural Resources",
                        "private_name": "MNDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1008,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1008,
                        "start_date": "2017-12-15",
                        "end_date": "2014-08-15",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Montana",
                        "county": 47,
                        "county_string": "Polk",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Gopher Frog",
                                "population_count": 100,
                                "sick_count": 25,
                                "dead_count": 25,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 1,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "None",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Open",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Fungus"
                                        },
                                        "confirmed": true,
                                        "major": false,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 1,
                                        "positive_count": 1,
                                        "suspect_count": 41,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1009,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 65,
                "end_date": "2016-08-26",
                "start_date": "2015-10-27",
                "complete": false,
                "event_reference": "id",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources-Science Ops",
                        "private_name": "IADNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1009,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1009,
                        "start_date": "2016-09-09",
                        "end_date": "2019-01-07",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Illinois",
                        "county": 47,
                        "county_string": "Marquette",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Snow Goose",
                                "population_count": 100,
                                "sick_count": 21,
                                "dead_count": 26,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Juvenile",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Schistosomiasis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Toxin"
                                        },
                                        "confirmed": true,
                                        "major": false,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 3,
                                        "positive_count": 3,
                                        "suspect_count": 36,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Minnesota Department of Natural Resources"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1010,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 59,
                "end_date": "2016-07-23",
                "start_date": "2011-08-25",
                "complete": false,
                "event_reference": "commodo",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Iowa Department of Natural Resources-Boone",
                        "private_name": "IADNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1010,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1010,
                        "start_date": "2012-03-04",
                        "end_date": "2018-10-16",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Iowa",
                        "county": 47,
                        "county_string": "Polk",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Gopher Frog",
                                "population_count": 100,
                                "sick_count": 34,
                                "dead_count": 30,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 1,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Avian Cholera",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Fungus"
                                        },
                                        "confirmed": true,
                                        "major": true,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 4,
                                        "positive_count": 2,
                                        "suspect_count": 5,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources-Science Ops"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1011,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 89,
                "end_date": "2017-10-22",
                "start_date": "2016-06-26",
                "complete": false,
                "event_reference": "deserunt",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources-Science Ops",
                        "private_name": "MNDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1011,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1011,
                        "start_date": "2014-10-06",
                        "end_date": "2018-03-28",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Michigan",
                        "county": 47,
                        "county_string": "Dane",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Gopher Frog",
                                "population_count": 100,
                                "sick_count": 39,
                                "dead_count": 28,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 1,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Juvenile",
                                "sex_bias": 1,
                                "sex_bias_string": "None",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Open",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Nut/Met/Dev"
                                        },
                                        "confirmed": false,
                                        "major": true,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 3,
                                        "positive_count": 3,
                                        "suspect_count": 7,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Iowa Department of Natural Resources-Boone"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1012,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 31,
                "end_date": "2015-03-18",
                "start_date": "2011-04-05",
                "complete": false,
                "event_reference": "ad",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources-Science Ops",
                        "private_name": "WDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1012,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1012,
                        "start_date": "2013-03-15",
                        "end_date": "2017-07-09",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Michigan",
                        "county": 47,
                        "county_string": "Juneau",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Brown-headed Cowbird",
                                "population_count": 100,
                                "sick_count": 30,
                                "dead_count": 25,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Hatchling",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Aspergillosis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Fungus"
                                        },
                                        "confirmed": false,
                                        "major": false,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 3,
                                        "positive_count": 2,
                                        "suspect_count": 16,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Iowa Department of Natural Resources-Boone"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1013,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 26,
                "end_date": "2016-07-06",
                "start_date": "2014-03-24",
                "complete": false,
                "event_reference": "fugiat",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Iowa Department of Natural Resources-Boone",
                        "private_name": "WDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1013,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1013,
                        "start_date": "2016-03-17",
                        "end_date": "2015-02-10",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Montana",
                        "county": 47,
                        "county_string": "Juneau",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Snow Goose",
                                "population_count": 100,
                                "sick_count": 32,
                                "dead_count": 30,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Juvenile",
                                "sex_bias": 1,
                                "sex_bias_string": "None",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Aspergillosis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Nut/Met/Dev"
                                        },
                                        "confirmed": false,
                                        "major": false,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 3,
                                        "positive_count": 4,
                                        "suspect_count": 27,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Iowa Department of Natural Resources-Boone"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1014,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 62,
                "end_date": "2013-07-12",
                "start_date": "2014-10-22",
                "complete": false,
                "event_reference": "occaecat",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources-Science Ops",
                        "private_name": "MNDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1014,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1014,
                        "start_date": "2014-02-18",
                        "end_date": "2011-02-11",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Minnesota",
                        "county": 47,
                        "county_string": "Dane",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Brown-headed Cowbird",
                                "population_count": 100,
                                "sick_count": 37,
                                "dead_count": 35,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 1,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Juvenile",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Open",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Bacteria"
                                        },
                                        "confirmed": false,
                                        "major": true,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 4,
                                        "positive_count": 3,
                                        "suspect_count": 61,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources-Science Ops"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1015,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 92,
                "end_date": "2018-04-30",
                "start_date": "2011-08-08",
                "complete": false,
                "event_reference": "ut",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources-Science Ops",
                        "private_name": "IADNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1015,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1015,
                        "start_date": "2012-01-05",
                        "end_date": "2012-07-24",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Michigan",
                        "county": 47,
                        "county_string": "Polk",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Brown-headed Cowbird",
                                "population_count": 100,
                                "sick_count": 39,
                                "dead_count": 40,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "None",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Open",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Toxin"
                                        },
                                        "confirmed": false,
                                        "major": true,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 2,
                                        "positive_count": 3,
                                        "suspect_count": 20,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Minnesota Department of Natural Resources"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1016,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 32,
                "end_date": "2011-02-21",
                "start_date": "2015-07-16",
                "complete": false,
                "event_reference": "esse",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Iowa Department of Natural Resources-Clear Lake",
                        "private_name": "WDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1016,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1016,
                        "start_date": "2014-02-13",
                        "end_date": "2017-07-05",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Illinois",
                        "county": 47,
                        "county_string": "Hennepin",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Brown-headed Cowbird",
                                "population_count": 100,
                                "sick_count": 22,
                                "dead_count": 33,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "None",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Avian Cholera",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Other"
                                        },
                                        "confirmed": false,
                                        "major": false,
                                        "priority": 1,
                                        "causal": false,
                                        "tested_count": 1,
                                        "positive_count": 3,
                                        "suspect_count": 71,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources-Science Ops"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1017,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 64,
                "end_date": "2016-03-10",
                "start_date": "2018-01-26",
                "complete": false,
                "event_reference": "do",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Wisconsin Department of Natural Resources",
                        "private_name": "MNDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1017,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1017,
                        "start_date": "2017-11-04",
                        "end_date": "2013-04-24",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Michigan",
                        "county": 47,
                        "county_string": "Polk",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Brown Pelican",
                                "population_count": 100,
                                "sick_count": 23,
                                "dead_count": 27,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 1,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "Female",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Aspergillosis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Nut/Met/Dev"
                                        },
                                        "confirmed": false,
                                        "major": false,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 3,
                                        "positive_count": 3,
                                        "suspect_count": 15,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1018,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 94,
                "end_date": "2013-07-07",
                "start_date": "2013-10-30",
                "complete": false,
                "event_reference": "voluptate",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Iowa Department of Natural Resources-Clear Lake",
                        "private_name": "WDNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1018,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1018,
                        "start_date": "2018-02-10",
                        "end_date": "2013-06-22",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Minnesota",
                        "county": 47,
                        "county_string": "Juneau",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Snow Goose",
                                "population_count": 100,
                                "sick_count": 27,
                                "dead_count": 28,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Adult",
                                "sex_bias": 1,
                                "sex_bias_string": "Male",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Schistosomiasis",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Bacteria"
                                        },
                                        "confirmed": false,
                                        "major": true,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 2,
                                        "positive_count": 4,
                                        "suspect_count": 5,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Minnesota Department of Natural Resources"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                "id": 1019,
                "superevent": null,
                "legal_number": null,
                "legal_status": 1,
                "event_status_string": "Open",
                "event_status": 1,
                "epi_staff": "Barb Bodenstein",
                "affected_count": 65,
                "end_date": "2013-11-08",
                "start_date": "2014-01-31",
                "complete": false,
                "event_reference": "veniam",
                "event_type_string": "Mortality/Morbidity",
                "event_type": 1,
                "event_organization": [
                    {
                        "id": 1,
                        "name": "Minnesota Department of Natural Resources",
                        "private_name": "IADNR",
                        "address_one": "123 5th Ave",
                        "address_two": "",
                        "city": "Madison",
                        "zip_postal_code": 53703,
                        "state": 51,
                        "country": 30,
                        "phone": null,
                        "parent_organization": null,
                        "do_not_publish": false,
                        "created_date": "2018-04-17",
                        "created_by": "admin",
                        "modified_date": "2018-04-17",
                        "modified_by": "admin"
                    }
                ],
                "event_diagnosis": [
                    {
                        "event_id": 1019,
                        "diagnosis_id": 45,
                        "diagnosis_string": "Open",
                        "confirmed": false,
                        "major": true,
                        "priority": 1
                    }
                ],
                "event_locations": [
                    {
                        "event": 1019,
                        "start_date": "2013-08-20",
                        "end_date": "2018-06-08",
                        "country": 130,
                        "country_string": "United States",
                        "state": 24,
                        "state_string": "Michigan",
                        "county": 47,
                        "county_string": "Marquette",
                        "county_multiple": false,
                        "county_unknown": false,
                        "latitude": 45.362498,
                        "longitude": -93.339744,
                        "priority": 1,
                        "land_ownership": 2,
                        "land_ownership_string": "State/Province",
                        "flyway": "Mississppi",
                        "gnis_name": 644081,
                        "gnis_name_string": "Lake George",
                        "location_species": [
                            {
                                "species": 23,
                                "species_string": "Brown Pelican",
                                "population_count": 100,
                                "sick_count": 22,
                                "dead_count": 32,
                                "sick_count_estimated": null,
                                "dead_count_estimated": null,
                                "priority": 2,
                                "captive": 0,
                                "age_bias": 1,
                                "age_bias_string": "Hatchling",
                                "sex_bias": 1,
                                "sex_bias_string": "Unknown",
                                "species_diagnosis": [
                                    {
                                        "location_species": 1,
                                        "diagnosis": {
                                            "id": 67,
                                            "name": "Open",
                                            "diagnosis_type": 1,
                                            "diagnosis_type_string": "Bacteria"
                                        },
                                        "confirmed": false,
                                        "major": false,
                                        "priority": 1,
                                        "causal": true,
                                        "tested_count": 2,
                                        "positive_count": 3,
                                        "suspect_count": 13,
                                        "pooled": true,
                                        "diagnosis_organization": [
                                            {
                                                "organization": 23,
                                                "name": "Wisconsin Department of Natural Resources"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }

}

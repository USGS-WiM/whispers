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
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2012-04-06",
                "end_date": "2017-03-27",
                "affected_count": 22,
                "created_date": "Sun Sep 21 2014 00:43:25 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Fri Mar 16 2018 01:55:32 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1086,
                        "diagnosis": 1,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": false,
                        "major": true,
                        "priority": 2,
                        "created_date": "2013-07-17",
                        "created_by": "kmiller",
                        "modified_date": "2013-03-11",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1122,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2013-04-15",
                        "created_by": "nbartlein",
                        "modified_date": "2013-12-21",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1303,
                        "name": "Marathon",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "3.2871",
                        "centroid_longitude": "36.8313",
                        "fips_code": "5b2acdd8417a0e4d2ca1dfa0",
                        "created_date": "2017-04-04",
                        "created_by": "jchipault",
                        "modified_date": "2015-07-16",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1240,
                        "name": "Marathon",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "65.3291",
                        "centroid_longitude": "-78.2591",
                        "fips_code": "5b2acdd8e2590ed182918729",
                        "created_date": "2011-06-14",
                        "created_by": "jchipault",
                        "modified_date": "2018-02-02",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1267,
                        "name": "Marquette",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "63.6295",
                        "centroid_longitude": "87.8853",
                        "fips_code": "5b2acdd89c8b721f6ecb28e8",
                        "created_date": "2017-03-24",
                        "created_by": "nbartlein",
                        "modified_date": "2017-03-06",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1426,
                        "name": "Juneau",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "16.3566",
                        "centroid_longitude": "122.2644",
                        "fips_code": "5b2acdd8714f19d12a3740bf",
                        "created_date": "2012-03-28",
                        "created_by": "kmiller",
                        "modified_date": "2014-07-23",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1439,
                        "name": "Snow Goose",
                        "class_name": "deserunt",
                        "order_name": "quis",
                        "family_name": "qui",
                        "sub_family_name": "in",
                        "genus_name": "consequat",
                        "species_latin_name": "nostrud",
                        "subspecies_latin_name": "laborum",
                        "tsn": 1,
                        "created_date": "2013-05-26",
                        "created_by": "nbartlein",
                        "modified_date": "2015-12-28",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1177,
                        "name": "Brown Pelican",
                        "class_name": "culpa",
                        "order_name": "exercitation",
                        "family_name": "commodo",
                        "sub_family_name": "sint",
                        "genus_name": "ea",
                        "species_latin_name": "exercitation",
                        "subspecies_latin_name": "nulla",
                        "tsn": 4,
                        "created_date": "2013-10-08",
                        "created_by": "kmiller",
                        "modified_date": "2011-04-09",
                        "modified_by": "kmiller"
                    }
                ]
            },
            {
                "id": 1001,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "start_date": "2015-01-06",
                "end_date": "2012-03-02",
                "affected_count": 35,
                "created_date": "Thu May 31 2018 05:16:11 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Fri Nov 20 2015 10:43:49 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1086,
                        "diagnosis": 4,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": true,
                        "major": false,
                        "priority": 1,
                        "created_date": "2018-11-04",
                        "created_by": "nbartlein",
                        "modified_date": "2013-03-09",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1338,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2012-02-09",
                        "created_by": "nbartlein",
                        "modified_date": "2018-07-06",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1429,
                        "name": "Marquette",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "22.0065",
                        "centroid_longitude": "108.23",
                        "fips_code": "5b2acdd8326602e2164b6c4a",
                        "created_date": "2017-02-17",
                        "created_by": "nbartlein",
                        "modified_date": "2017-04-29",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1000,
                        "name": "Hennepin",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "38.1221",
                        "centroid_longitude": "-71.9535",
                        "fips_code": "5b2acdd8f56713c240844a3e",
                        "created_date": "2018-11-02",
                        "created_by": "kmiller",
                        "modified_date": "2013-05-06",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1095,
                        "name": "Brown Pelican",
                        "class_name": "culpa",
                        "order_name": "Lorem",
                        "family_name": "in",
                        "sub_family_name": "labore",
                        "genus_name": "id",
                        "species_latin_name": "anim",
                        "subspecies_latin_name": "amet",
                        "tsn": 4,
                        "created_date": "2014-08-21",
                        "created_by": "nbartlein",
                        "modified_date": "2013-10-11",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1002,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "start_date": "2018-04-07",
                "end_date": "2014-06-09",
                "affected_count": 33,
                "created_date": "Sat Apr 02 2016 09:46:33 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Tue Jan 03 2012 20:52:21 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1027,
                        "diagnosis": 5,
                        "diagnosis_string": "Open",
                        "confirmed": true,
                        "major": false,
                        "priority": 2,
                        "created_date": "2014-04-20",
                        "created_by": "nbartlein",
                        "modified_date": "2017-03-13",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1373,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2011-12-16",
                        "created_by": "jchipault",
                        "modified_date": "2018-01-26",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1420,
                        "name": "Dane",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "18.9564",
                        "centroid_longitude": "-46.1841",
                        "fips_code": "5b2acdd867856c0a31d6e4d4",
                        "created_date": "2011-11-25",
                        "created_by": "kmiller",
                        "modified_date": "2012-11-22",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1061,
                        "name": "Polk",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "78.1471",
                        "centroid_longitude": "79.7192",
                        "fips_code": "5b2acdd8d32bc307931fdb9f",
                        "created_date": "2017-08-12",
                        "created_by": "nbartlein",
                        "modified_date": "2015-11-15",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1281,
                        "name": "Juneau",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "11.2581",
                        "centroid_longitude": "128.8251",
                        "fips_code": "5b2acdd8b455b904f601cf24",
                        "created_date": "2016-09-28",
                        "created_by": "nbartlein",
                        "modified_date": "2011-08-21",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1313,
                        "name": "Snow Goose",
                        "class_name": "consequat",
                        "order_name": "cillum",
                        "family_name": "irure",
                        "sub_family_name": "ea",
                        "genus_name": "ad",
                        "species_latin_name": "dolore",
                        "subspecies_latin_name": "aliqua",
                        "tsn": 3,
                        "created_date": "2014-05-09",
                        "created_by": "jchipault",
                        "modified_date": "2013-11-24",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1003,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2013-05-21",
                "end_date": "2012-05-30",
                "affected_count": 38,
                "created_date": "Fri Jun 01 2018 01:11:35 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Thu Oct 15 2015 14:50:19 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnoses": [
                    {
                        "id": 1140,
                        "diagnosis": 4,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": false,
                        "major": true,
                        "priority": 2,
                        "created_date": "2014-12-16",
                        "created_by": "kmiller",
                        "modified_date": "2017-07-14",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1123,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2015-11-03",
                        "created_by": "kmiller",
                        "modified_date": "2011-03-30",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1189,
                        "name": "Marathon",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "54.1811",
                        "centroid_longitude": "121.4344",
                        "fips_code": "5b2acdd8df0d8fdddeb74228",
                        "created_date": "2014-07-23",
                        "created_by": "jchipault",
                        "modified_date": "2012-05-15",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1129,
                        "name": "Polk",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "64.8878",
                        "centroid_longitude": "-161.8918",
                        "fips_code": "5b2acdd848aaa7ff8c1ce9ad",
                        "created_date": "2014-12-09",
                        "created_by": "jchipault",
                        "modified_date": "2017-02-28",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1388,
                        "name": "Marquette",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "21.6641",
                        "centroid_longitude": "-171.3283",
                        "fips_code": "5b2acdd854178fa1667835c1",
                        "created_date": "2013-04-06",
                        "created_by": "jchipault",
                        "modified_date": "2016-03-17",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1397,
                        "name": "Brown Pelican",
                        "class_name": "magna",
                        "order_name": "aliqua",
                        "family_name": "minim",
                        "sub_family_name": "pariatur",
                        "genus_name": "commodo",
                        "species_latin_name": "proident",
                        "subspecies_latin_name": "esse",
                        "tsn": 4,
                        "created_date": "2014-10-23",
                        "created_by": "nbartlein",
                        "modified_date": "2013-09-09",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1486,
                        "name": "Common Loon",
                        "class_name": "aute",
                        "order_name": "id",
                        "family_name": "deserunt",
                        "sub_family_name": "culpa",
                        "genus_name": "velit",
                        "species_latin_name": "fugiat",
                        "subspecies_latin_name": "deserunt",
                        "tsn": 5,
                        "created_date": "2018-07-31",
                        "created_by": "jchipault",
                        "modified_date": "2016-03-14",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1004,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "start_date": "2012-11-11",
                "end_date": "2017-10-15",
                "affected_count": 39,
                "created_date": "Fri Dec 28 2012 14:33:02 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Tue Apr 22 2014 07:35:23 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnoses": [
                    {
                        "id": 1284,
                        "diagnosis": 5,
                        "diagnosis_string": "Open",
                        "confirmed": true,
                        "major": false,
                        "priority": 3,
                        "created_date": "2018-04-04",
                        "created_by": "nbartlein",
                        "modified_date": "2014-11-08",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1369,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2012-06-04",
                        "created_by": "jchipault",
                        "modified_date": "2011-12-14",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1320,
                        "name": "Dane",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "47.8022",
                        "centroid_longitude": "-1.3942",
                        "fips_code": "5b2acdd83bd89bbf0cf52ff6",
                        "created_date": "2017-07-29",
                        "created_by": "nbartlein",
                        "modified_date": "2018-02-01",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1393,
                        "name": "Juneau",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "88.486",
                        "centroid_longitude": "-78.7726",
                        "fips_code": "5b2acdd8de2fd0f1b9f1004d",
                        "created_date": "2018-04-16",
                        "created_by": "jchipault",
                        "modified_date": "2011-02-01",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1452,
                        "name": "Polk",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "20.476",
                        "centroid_longitude": "-71.7021",
                        "fips_code": "5b2acdd827a78e996ea82855",
                        "created_date": "2016-08-13",
                        "created_by": "kmiller",
                        "modified_date": "2012-07-29",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1269,
                        "name": "Hennepin",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "50.2862",
                        "centroid_longitude": "-170.2246",
                        "fips_code": "5b2acdd8f0413fc05a508a24",
                        "created_date": "2013-12-14",
                        "created_by": "kmiller",
                        "modified_date": "2014-11-20",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1187,
                        "name": "Common Loon",
                        "class_name": "commodo",
                        "order_name": "sint",
                        "family_name": "quis",
                        "sub_family_name": "eu",
                        "genus_name": "aliqua",
                        "species_latin_name": "laboris",
                        "subspecies_latin_name": "in",
                        "tsn": 5,
                        "created_date": "2011-09-04",
                        "created_by": "nbartlein",
                        "modified_date": "2011-09-20",
                        "modified_by": "kmiller"
                    }
                ]
            },
            {
                "id": 1005,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2011-07-24",
                "end_date": "2018-09-06",
                "affected_count": 27,
                "created_date": "Mon Apr 09 2018 18:12:48 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Sun Apr 14 2013 02:17:51 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1473,
                        "diagnosis": 2,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": true,
                        "major": false,
                        "priority": 1,
                        "created_date": "2014-12-19",
                        "created_by": "kmiller",
                        "modified_date": "2016-11-21",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1396,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2015-09-03",
                        "created_by": "kmiller",
                        "modified_date": "2018-01-01",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1481,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2011-10-06",
                        "created_by": "jchipault",
                        "modified_date": "2012-07-29",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1288,
                        "name": "Polk",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "0.9169",
                        "centroid_longitude": "-69.6077",
                        "fips_code": "5b2acdd8a8d13079539b3943",
                        "created_date": "2016-05-29",
                        "created_by": "jchipault",
                        "modified_date": "2011-11-03",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1320,
                        "name": "Marquette",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "85.3297",
                        "centroid_longitude": "148.9498",
                        "fips_code": "5b2acdd8425a16d8fcc713cb",
                        "created_date": "2018-05-13",
                        "created_by": "jchipault",
                        "modified_date": "2017-04-17",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1332,
                        "name": "Marathon",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "2.0525",
                        "centroid_longitude": "113.1012",
                        "fips_code": "5b2acdd85242cf8329a92565",
                        "created_date": "2017-01-22",
                        "created_by": "jchipault",
                        "modified_date": "2017-08-01",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1429,
                        "name": "Snow Goose",
                        "class_name": "cupidatat",
                        "order_name": "eu",
                        "family_name": "laborum",
                        "sub_family_name": "eu",
                        "genus_name": "nisi",
                        "species_latin_name": "nisi",
                        "subspecies_latin_name": "voluptate",
                        "tsn": 2,
                        "created_date": "2018-04-15",
                        "created_by": "jchipault",
                        "modified_date": "2018-07-10",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1144,
                        "name": "Gopher Frog",
                        "class_name": "culpa",
                        "order_name": "consectetur",
                        "family_name": "velit",
                        "sub_family_name": "eu",
                        "genus_name": "ullamco",
                        "species_latin_name": "ut",
                        "subspecies_latin_name": "non",
                        "tsn": 3,
                        "created_date": "2015-04-09",
                        "created_by": "kmiller",
                        "modified_date": "2017-11-05",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1006,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2012-05-15",
                "end_date": "2016-03-09",
                "affected_count": 28,
                "created_date": "Mon Jan 06 2014 12:50:12 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Mon Mar 23 2015 23:58:28 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnoses": [
                    {
                        "id": 1067,
                        "diagnosis": 5,
                        "diagnosis_string": "Avian Cholera",
                        "confirmed": false,
                        "major": false,
                        "priority": 1,
                        "created_date": "2012-01-05",
                        "created_by": "kmiller",
                        "modified_date": "2016-08-15",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1329,
                        "name": "Michigan",
                        "country": 30,
                        "abbreviation": "IA",
                        "created_date": "2011-07-11",
                        "created_by": "kmiller",
                        "modified_date": "2011-07-04",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1398,
                        "name": "Montana",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2016-07-16",
                        "created_by": "kmiller",
                        "modified_date": "2015-12-31",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1064,
                        "name": "Hennepin",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "6.1621",
                        "centroid_longitude": "68.9717",
                        "fips_code": "5b2acdd85039b48b5e8c0fee",
                        "created_date": "2014-04-17",
                        "created_by": "jchipault",
                        "modified_date": "2015-10-22",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1268,
                        "name": "Hennepin",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "37.2563",
                        "centroid_longitude": "171.1129",
                        "fips_code": "5b2acdd8831e1a191ac28535",
                        "created_date": "2015-09-05",
                        "created_by": "kmiller",
                        "modified_date": "2012-05-14",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1007,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "47.2801",
                        "centroid_longitude": "-87.6863",
                        "fips_code": "5b2acdd87b98df05fd77cf86",
                        "created_date": "2017-10-19",
                        "created_by": "kmiller",
                        "modified_date": "2012-10-16",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1448,
                        "name": "Snow Goose",
                        "class_name": "proident",
                        "order_name": "voluptate",
                        "family_name": "laboris",
                        "sub_family_name": "duis",
                        "genus_name": "aliqua",
                        "species_latin_name": "consequat",
                        "subspecies_latin_name": "nulla",
                        "tsn": 5,
                        "created_date": "2015-06-24",
                        "created_by": "kmiller",
                        "modified_date": "2018-09-09",
                        "modified_by": "kmiller"
                    }
                ]
            },
            {
                "id": 1007,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2012-05-25",
                "end_date": "2012-03-15",
                "affected_count": 28,
                "created_date": "Fri Nov 08 2013 05:57:08 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Fri Jun 01 2012 07:14:52 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnoses": [
                    {
                        "id": 1418,
                        "diagnosis": 4,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": false,
                        "major": false,
                        "priority": 3,
                        "created_date": "2018-01-06",
                        "created_by": "nbartlein",
                        "modified_date": "2017-01-16",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1404,
                        "name": "Montana",
                        "country": 30,
                        "abbreviation": "MT",
                        "created_date": "2014-07-09",
                        "created_by": "nbartlein",
                        "modified_date": "2016-09-24",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1055,
                        "name": "Michigan",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2011-12-26",
                        "created_by": "nbartlein",
                        "modified_date": "2011-06-15",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1433,
                        "name": "Polk",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "31.2261",
                        "centroid_longitude": "-137.1944",
                        "fips_code": "5b2acdd84e4d732309b02494",
                        "created_date": "2018-04-06",
                        "created_by": "nbartlein",
                        "modified_date": "2011-06-11",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1331,
                        "name": "Dane",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "56.7385",
                        "centroid_longitude": "109.9006",
                        "fips_code": "5b2acdd8e47e0e5c0769a51f",
                        "created_date": "2013-12-25",
                        "created_by": "jchipault",
                        "modified_date": "2013-11-28",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1121,
                        "name": "Common Loon",
                        "class_name": "sunt",
                        "order_name": "eiusmod",
                        "family_name": "enim",
                        "sub_family_name": "adipisicing",
                        "genus_name": "exercitation",
                        "species_latin_name": "voluptate",
                        "subspecies_latin_name": "excepteur",
                        "tsn": 4,
                        "created_date": "2011-07-16",
                        "created_by": "nbartlein",
                        "modified_date": "2015-10-20",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1367,
                        "name": "Mallard",
                        "class_name": "et",
                        "order_name": "velit",
                        "family_name": "officia",
                        "sub_family_name": "laboris",
                        "genus_name": "duis",
                        "species_latin_name": "tempor",
                        "subspecies_latin_name": "anim",
                        "tsn": 2,
                        "created_date": "2014-06-10",
                        "created_by": "kmiller",
                        "modified_date": "2015-07-18",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1008,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "start_date": "2013-05-02",
                "end_date": "2014-06-17",
                "affected_count": 32,
                "created_date": "Mon Dec 07 2015 18:37:05 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Sun Jun 14 2015 00:52:12 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1410,
                        "diagnosis": 1,
                        "diagnosis_string": "Avian Cholera",
                        "confirmed": false,
                        "major": true,
                        "priority": 3,
                        "created_date": "2011-04-07",
                        "created_by": "kmiller",
                        "modified_date": "2011-04-04",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1401,
                        "name": "Montana",
                        "country": 30,
                        "abbreviation": "MN",
                        "created_date": "2013-11-20",
                        "created_by": "kmiller",
                        "modified_date": "2011-08-30",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1072,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "8.0387",
                        "centroid_longitude": "110.8385",
                        "fips_code": "5b2acdd859f787d696d98265",
                        "created_date": "2016-03-11",
                        "created_by": "kmiller",
                        "modified_date": "2014-07-07",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1256,
                        "name": "Hennepin",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "55.4135",
                        "centroid_longitude": "-30.5664",
                        "fips_code": "5b2acdd810dc6f4f1cc28520",
                        "created_date": "2014-05-03",
                        "created_by": "jchipault",
                        "modified_date": "2018-03-21",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1085,
                        "name": "Marquette",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "30.3517",
                        "centroid_longitude": "1.894",
                        "fips_code": "5b2acdd8d3215d5d2c99c861",
                        "created_date": "2017-10-02",
                        "created_by": "nbartlein",
                        "modified_date": "2013-06-08",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1269,
                        "name": "Gopher Frog",
                        "class_name": "eiusmod",
                        "order_name": "sit",
                        "family_name": "et",
                        "sub_family_name": "aliqua",
                        "genus_name": "enim",
                        "species_latin_name": "et",
                        "subspecies_latin_name": "cillum",
                        "tsn": 4,
                        "created_date": "2013-12-16",
                        "created_by": "kmiller",
                        "modified_date": "2011-12-14",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1009,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2011-05-11",
                "end_date": "2013-03-28",
                "affected_count": 40,
                "created_date": "Thu Dec 21 2017 16:01:52 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Sat Nov 08 2014 08:08:33 GMT+0000 (UTC)",
                "modified_by": "jchipault",
                "event_diagnoses": [
                    {
                        "id": 1201,
                        "diagnosis": 1,
                        "diagnosis_string": "Avian Cholera",
                        "confirmed": true,
                        "major": false,
                        "priority": 1,
                        "created_date": "2011-07-30",
                        "created_by": "nbartlein",
                        "modified_date": "2013-07-03",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1178,
                        "name": "Montana",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2012-06-25",
                        "created_by": "nbartlein",
                        "modified_date": "2018-11-09",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1150,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "28.1212",
                        "centroid_longitude": "162.8262",
                        "fips_code": "5b2acdd8dfa1d3bd3228b797",
                        "created_date": "2019-01-29",
                        "created_by": "nbartlein",
                        "modified_date": "2013-01-25",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1176,
                        "name": "Hennepin",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "81.3471",
                        "centroid_longitude": "77.9668",
                        "fips_code": "5b2acdd85900c0c96fd1ce7a",
                        "created_date": "2018-09-22",
                        "created_by": "jchipault",
                        "modified_date": "2011-12-05",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1023,
                        "name": "Mallard",
                        "class_name": "id",
                        "order_name": "proident",
                        "family_name": "reprehenderit",
                        "sub_family_name": "aliqua",
                        "genus_name": "adipisicing",
                        "species_latin_name": "ad",
                        "subspecies_latin_name": "amet",
                        "tsn": 2,
                        "created_date": "2014-12-15",
                        "created_by": "jchipault",
                        "modified_date": "2014-02-18",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1280,
                        "name": "Brown-headed Cowbird",
                        "class_name": "adipisicing",
                        "order_name": "dolore",
                        "family_name": "excepteur",
                        "sub_family_name": "voluptate",
                        "genus_name": "do",
                        "species_latin_name": "anim",
                        "subspecies_latin_name": "id",
                        "tsn": 2,
                        "created_date": "2013-01-06",
                        "created_by": "nbartlein",
                        "modified_date": "2012-03-21",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1010,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2012-02-24",
                "end_date": "2017-10-18",
                "affected_count": 33,
                "created_date": "Sat Jun 18 2016 11:32:47 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Sun Mar 04 2012 17:56:34 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnoses": [
                    {
                        "id": 1001,
                        "diagnosis": 5,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": true,
                        "major": true,
                        "priority": 3,
                        "created_date": "2017-07-23",
                        "created_by": "kmiller",
                        "modified_date": "2015-04-12",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1080,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2016-09-11",
                        "created_by": "nbartlein",
                        "modified_date": "2011-07-20",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1285,
                        "name": "Marquette",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "7.6314",
                        "centroid_longitude": "-30.5335",
                        "fips_code": "5b2acdd8e0fc86529cebc873",
                        "created_date": "2015-11-26",
                        "created_by": "kmiller",
                        "modified_date": "2016-10-10",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1187,
                        "name": "Marquette",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "60.5348",
                        "centroid_longitude": "-28.1359",
                        "fips_code": "5b2acdd8e636f26bb072276a",
                        "created_date": "2015-10-03",
                        "created_by": "kmiller",
                        "modified_date": "2014-12-09",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1007,
                        "name": "Marquette",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "26.4161",
                        "centroid_longitude": "129.6019",
                        "fips_code": "5b2acdd851c5738001cf4c88",
                        "created_date": "2017-12-04",
                        "created_by": "jchipault",
                        "modified_date": "2015-09-10",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1268,
                        "name": "Marathon",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "26.423",
                        "centroid_longitude": "176.5147",
                        "fips_code": "5b2acdd82a20dab47d8840bf",
                        "created_date": "2016-12-11",
                        "created_by": "jchipault",
                        "modified_date": "2016-12-06",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1190,
                        "name": "Brown Pelican",
                        "class_name": "officia",
                        "order_name": "adipisicing",
                        "family_name": "eiusmod",
                        "sub_family_name": "elit",
                        "genus_name": "eiusmod",
                        "species_latin_name": "Lorem",
                        "subspecies_latin_name": "ullamco",
                        "tsn": 1,
                        "created_date": "2012-04-04",
                        "created_by": "jchipault",
                        "modified_date": "2013-12-03",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1426,
                        "name": "Mallard",
                        "class_name": "anim",
                        "order_name": "sit",
                        "family_name": "nisi",
                        "sub_family_name": "fugiat",
                        "genus_name": "est",
                        "species_latin_name": "mollit",
                        "subspecies_latin_name": "minim",
                        "tsn": 5,
                        "created_date": "2014-10-07",
                        "created_by": "kmiller",
                        "modified_date": "2017-02-04",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1011,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "start_date": "2014-04-02",
                "end_date": "2016-04-06",
                "affected_count": 30,
                "created_date": "Fri Dec 09 2016 19:36:45 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Mon Mar 14 2016 02:06:45 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1115,
                        "diagnosis": 2,
                        "diagnosis_string": "Avian Cholera",
                        "confirmed": false,
                        "major": true,
                        "priority": 1,
                        "created_date": "2011-04-05",
                        "created_by": "jchipault",
                        "modified_date": "2013-08-21",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1247,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "WI",
                        "created_date": "2011-08-09",
                        "created_by": "jchipault",
                        "modified_date": "2015-08-07",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1491,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2011-06-08",
                        "created_by": "kmiller",
                        "modified_date": "2017-02-11",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1466,
                        "name": "Polk",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "68.0418",
                        "centroid_longitude": "-3.2092",
                        "fips_code": "5b2acdd81da8c9aa6fed8b96",
                        "created_date": "2012-03-15",
                        "created_by": "kmiller",
                        "modified_date": "2011-10-12",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1336,
                        "name": "Juneau",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "5.5827",
                        "centroid_longitude": "-73.5469",
                        "fips_code": "5b2acdd8cf73b4d50536fec8",
                        "created_date": "2017-05-25",
                        "created_by": "nbartlein",
                        "modified_date": "2016-06-15",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1137,
                        "name": "Hennepin",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "34.3662",
                        "centroid_longitude": "166.8705",
                        "fips_code": "5b2acdd862fa1761163344c7",
                        "created_date": "2018-05-16",
                        "created_by": "nbartlein",
                        "modified_date": "2015-04-17",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1230,
                        "name": "Mallard",
                        "class_name": "irure",
                        "order_name": "voluptate",
                        "family_name": "Lorem",
                        "sub_family_name": "et",
                        "genus_name": "officia",
                        "species_latin_name": "anim",
                        "subspecies_latin_name": "ad",
                        "tsn": 1,
                        "created_date": "2012-01-28",
                        "created_by": "jchipault",
                        "modified_date": "2017-06-30",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1303,
                        "name": "Brown Pelican",
                        "class_name": "culpa",
                        "order_name": "labore",
                        "family_name": "officia",
                        "sub_family_name": "sit",
                        "genus_name": "laboris",
                        "species_latin_name": "laboris",
                        "subspecies_latin_name": "sit",
                        "tsn": 5,
                        "created_date": "2014-06-20",
                        "created_by": "nbartlein",
                        "modified_date": "2017-11-23",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1012,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "start_date": "2018-10-01",
                "end_date": "2011-12-02",
                "affected_count": 37,
                "created_date": "Wed Apr 03 2013 03:38:42 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Sun Jan 15 2017 18:30:52 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1460,
                        "diagnosis": 3,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": true,
                        "major": true,
                        "priority": 3,
                        "created_date": "2016-11-11",
                        "created_by": "nbartlein",
                        "modified_date": "2011-05-23",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1053,
                        "name": "Illinois",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2012-07-12",
                        "created_by": "nbartlein",
                        "modified_date": "2011-12-05",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1173,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2016-11-22",
                        "created_by": "kmiller",
                        "modified_date": "2014-06-29",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1339,
                        "name": "Marathon",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "52.4403",
                        "centroid_longitude": "-57.1466",
                        "fips_code": "5b2acdd8a315898bde50d946",
                        "created_date": "2014-05-17",
                        "created_by": "kmiller",
                        "modified_date": "2012-05-19",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1297,
                        "name": "Dane",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "23.8856",
                        "centroid_longitude": "-22.3562",
                        "fips_code": "5b2acdd86b9168fc8d370fdc",
                        "created_date": "2018-02-11",
                        "created_by": "kmiller",
                        "modified_date": "2013-07-28",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1480,
                        "name": "Marathon",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "0.4818",
                        "centroid_longitude": "66.9162",
                        "fips_code": "5b2acdd8bdc63b8aa1297467",
                        "created_date": "2012-04-18",
                        "created_by": "kmiller",
                        "modified_date": "2011-07-17",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1241,
                        "name": "Snow Goose",
                        "class_name": "irure",
                        "order_name": "aute",
                        "family_name": "commodo",
                        "sub_family_name": "tempor",
                        "genus_name": "laboris",
                        "species_latin_name": "incididunt",
                        "subspecies_latin_name": "amet",
                        "tsn": 3,
                        "created_date": "2017-09-05",
                        "created_by": "nbartlein",
                        "modified_date": "2013-05-22",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1013,
                "event_type": 1,
                "event_type_string": "Surveillance",
                "start_date": "2016-07-19",
                "end_date": "2011-08-02",
                "affected_count": 30,
                "created_date": "Thu Jan 21 2016 11:07:42 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Sun Dec 02 2012 07:21:52 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnoses": [
                    {
                        "id": 1099,
                        "diagnosis": 4,
                        "diagnosis_string": "Schistosomiasis",
                        "confirmed": true,
                        "major": true,
                        "priority": 1,
                        "created_date": "2013-06-20",
                        "created_by": "nbartlein",
                        "modified_date": "2015-04-27",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1217,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "MN",
                        "created_date": "2012-08-13",
                        "created_by": "nbartlein",
                        "modified_date": "2013-08-24",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1259,
                        "name": "Hennepin",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "32.8311",
                        "centroid_longitude": "-61.1431",
                        "fips_code": "5b2acdd8684da92572880188",
                        "created_date": "2011-09-16",
                        "created_by": "jchipault",
                        "modified_date": "2017-09-26",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1101,
                        "name": "Marquette",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "63.25",
                        "centroid_longitude": "135.635",
                        "fips_code": "5b2acdd8ec649a7e14153186",
                        "created_date": "2013-02-12",
                        "created_by": "nbartlein",
                        "modified_date": "2012-09-10",
                        "modified_by": "jchipault"
                    }
                ],
                "species": [
                    {
                        "id": 1484,
                        "name": "Snow Goose",
                        "class_name": "consequat",
                        "order_name": "ullamco",
                        "family_name": "et",
                        "sub_family_name": "ex",
                        "genus_name": "esse",
                        "species_latin_name": "nisi",
                        "subspecies_latin_name": "magna",
                        "tsn": 2,
                        "created_date": "2011-05-30",
                        "created_by": "nbartlein",
                        "modified_date": "2019-01-21",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1168,
                        "name": "Snow Goose",
                        "class_name": "exercitation",
                        "order_name": "dolor",
                        "family_name": "nostrud",
                        "sub_family_name": "voluptate",
                        "genus_name": "aute",
                        "species_latin_name": "ad",
                        "subspecies_latin_name": "consectetur",
                        "tsn": 3,
                        "created_date": "2012-12-29",
                        "created_by": "jchipault",
                        "modified_date": "2011-03-06",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1014,
                "event_type": 2,
                "event_type_string": "Surveillance",
                "start_date": "2011-12-29",
                "end_date": "2014-04-22",
                "affected_count": 34,
                "created_date": "Fri May 26 2017 14:21:55 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Wed Oct 03 2012 21:52:22 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1295,
                        "diagnosis": 1,
                        "diagnosis_string": "Open",
                        "confirmed": true,
                        "major": false,
                        "priority": 1,
                        "created_date": "2011-09-06",
                        "created_by": "jchipault",
                        "modified_date": "2018-10-03",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1361,
                        "name": "Montana",
                        "country": 30,
                        "abbreviation": "IA",
                        "created_date": "2017-05-14",
                        "created_by": "jchipault",
                        "modified_date": "2011-10-15",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1104,
                        "name": "Polk",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "75.8503",
                        "centroid_longitude": "-155.7874",
                        "fips_code": "5b2acdd8b349a9a474c7dc98",
                        "created_date": "2018-09-05",
                        "created_by": "jchipault",
                        "modified_date": "2018-09-19",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1174,
                        "name": "Marathon",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "13.7534",
                        "centroid_longitude": "-102.2702",
                        "fips_code": "5b2acdd8603e52719f023201",
                        "created_date": "2011-03-23",
                        "created_by": "kmiller",
                        "modified_date": "2015-08-08",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1258,
                        "name": "Juneau",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "87.5884",
                        "centroid_longitude": "-30.4064",
                        "fips_code": "5b2acdd83fbab28cca7ad073",
                        "created_date": "2012-08-22",
                        "created_by": "jchipault",
                        "modified_date": "2018-02-16",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1153,
                        "name": "Hennepin",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "58.6576",
                        "centroid_longitude": "-87.5109",
                        "fips_code": "5b2acdd8b23de92b736b095c",
                        "created_date": "2016-06-05",
                        "created_by": "jchipault",
                        "modified_date": "2017-06-25",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1355,
                        "name": "Brown-headed Cowbird",
                        "class_name": "ipsum",
                        "order_name": "pariatur",
                        "family_name": "Lorem",
                        "sub_family_name": "sint",
                        "genus_name": "adipisicing",
                        "species_latin_name": "pariatur",
                        "subspecies_latin_name": "qui",
                        "tsn": 4,
                        "created_date": "2015-06-23",
                        "created_by": "jchipault",
                        "modified_date": "2014-02-21",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1015,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2012-03-14",
                "end_date": "2017-03-06",
                "affected_count": 20,
                "created_date": "Sat Apr 11 2015 04:09:39 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Wed Jun 10 2015 12:40:01 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1216,
                        "diagnosis": 3,
                        "diagnosis_string": "Open",
                        "confirmed": true,
                        "major": false,
                        "priority": 1,
                        "created_date": "2013-11-03",
                        "created_by": "jchipault",
                        "modified_date": "2018-08-23",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1327,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "IA",
                        "created_date": "2013-01-13",
                        "created_by": "nbartlein",
                        "modified_date": "2013-06-05",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1375,
                        "name": "Marathon",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "37.9767",
                        "centroid_longitude": "1.5148",
                        "fips_code": "5b2acdd8202c207568796028",
                        "created_date": "2017-04-12",
                        "created_by": "jchipault",
                        "modified_date": "2012-11-14",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1342,
                        "name": "Juneau",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "58.1936",
                        "centroid_longitude": "93.8097",
                        "fips_code": "5b2acdd84c51bedd87d96f27",
                        "created_date": "2011-11-13",
                        "created_by": "nbartlein",
                        "modified_date": "2018-12-09",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1172,
                        "name": "Polk",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "37.5583",
                        "centroid_longitude": "-95.0391",
                        "fips_code": "5b2acdd84d37a05a4b7f3ea7",
                        "created_date": "2017-04-30",
                        "created_by": "jchipault",
                        "modified_date": "2017-08-25",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1346,
                        "name": "Hennepin",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "42.2065",
                        "centroid_longitude": "111.209",
                        "fips_code": "5b2acdd8e6e9de21387da88a",
                        "created_date": "2012-06-28",
                        "created_by": "kmiller",
                        "modified_date": "2016-05-09",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1396,
                        "name": "Brown Pelican",
                        "class_name": "aliquip",
                        "order_name": "incididunt",
                        "family_name": "occaecat",
                        "sub_family_name": "consectetur",
                        "genus_name": "ad",
                        "species_latin_name": "commodo",
                        "subspecies_latin_name": "aute",
                        "tsn": 4,
                        "created_date": "2015-03-02",
                        "created_by": "kmiller",
                        "modified_date": "2013-04-20",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1016,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2015-05-18",
                "end_date": "2018-10-18",
                "affected_count": 36,
                "created_date": "Thu Sep 07 2017 14:24:34 GMT+0000 (UTC)",
                "created_by": "nbartlein",
                "modified_date": "Mon Jul 06 2015 15:13:19 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1186,
                        "diagnosis": 1,
                        "diagnosis_string": "Avian Cholera",
                        "confirmed": true,
                        "major": true,
                        "priority": 2,
                        "created_date": "2012-03-08",
                        "created_by": "nbartlein",
                        "modified_date": "2014-09-03",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1230,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "MN",
                        "created_date": "2013-05-05",
                        "created_by": "kmiller",
                        "modified_date": "2017-06-11",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1456,
                        "name": "Michigan",
                        "country": 30,
                        "abbreviation": "MN",
                        "created_date": "2015-09-30",
                        "created_by": "nbartlein",
                        "modified_date": "2018-10-18",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1356,
                        "name": "Marquette",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "75.0141",
                        "centroid_longitude": "-36.6909",
                        "fips_code": "5b2acdd81845d5ef4f7ef9d9",
                        "created_date": "2013-04-23",
                        "created_by": "kmiller",
                        "modified_date": "2012-01-05",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1072,
                        "name": "Juneau",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "81.3139",
                        "centroid_longitude": "-2.8724",
                        "fips_code": "5b2acdd8aeef738bc7194673",
                        "created_date": "2012-03-04",
                        "created_by": "nbartlein",
                        "modified_date": "2011-02-21",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1334,
                        "name": "Brown Pelican",
                        "class_name": "voluptate",
                        "order_name": "consectetur",
                        "family_name": "dolor",
                        "sub_family_name": "nisi",
                        "genus_name": "duis",
                        "species_latin_name": "ad",
                        "subspecies_latin_name": "magna",
                        "tsn": 5,
                        "created_date": "2012-03-19",
                        "created_by": "kmiller",
                        "modified_date": "2015-02-15",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1126,
                        "name": "Brown Pelican",
                        "class_name": "id",
                        "order_name": "culpa",
                        "family_name": "laborum",
                        "sub_family_name": "adipisicing",
                        "genus_name": "sunt",
                        "species_latin_name": "ut",
                        "subspecies_latin_name": "Lorem",
                        "tsn": 2,
                        "created_date": "2016-09-01",
                        "created_by": "jchipault",
                        "modified_date": "2013-04-13",
                        "modified_by": "nbartlein"
                    }
                ]
            },
            {
                "id": 1017,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2011-09-11",
                "end_date": "2013-09-15",
                "affected_count": 28,
                "created_date": "Mon Jan 21 2013 17:48:59 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Mon Dec 14 2015 17:23:19 GMT+0000 (UTC)",
                "modified_by": "nbartlein",
                "event_diagnoses": [
                    {
                        "id": 1097,
                        "diagnosis": 1,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": true,
                        "major": false,
                        "priority": 3,
                        "created_date": "2015-11-22",
                        "created_by": "nbartlein",
                        "modified_date": "2016-10-12",
                        "modified_by": "kmiller"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1028,
                        "name": "Iowa",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2018-06-29",
                        "created_by": "jchipault",
                        "modified_date": "2017-02-22",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1192,
                        "name": "Marquette",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "60.1974",
                        "centroid_longitude": "45.8396",
                        "fips_code": "5b2acdd81ea5e3349145f087",
                        "created_date": "2013-08-18",
                        "created_by": "jchipault",
                        "modified_date": "2017-10-26",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1458,
                        "name": "Marquette",
                        "state": 1,
                        "points": "",
                        "centroid_latitude": "70.8524",
                        "centroid_longitude": "-120.1631",
                        "fips_code": "5b2acdd8063df85ea95a0fe4",
                        "created_date": "2014-09-18",
                        "created_by": "kmiller",
                        "modified_date": "2014-07-15",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1111,
                        "name": "Polk",
                        "state": 2,
                        "points": "",
                        "centroid_latitude": "1.6325",
                        "centroid_longitude": "53.7752",
                        "fips_code": "5b2acdd8fb2f1f863f211aec",
                        "created_date": "2014-08-26",
                        "created_by": "jchipault",
                        "modified_date": "2011-08-16",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1349,
                        "name": "Snow Goose",
                        "class_name": "proident",
                        "order_name": "cillum",
                        "family_name": "consequat",
                        "sub_family_name": "non",
                        "genus_name": "pariatur",
                        "species_latin_name": "aliqua",
                        "subspecies_latin_name": "aliquip",
                        "tsn": 4,
                        "created_date": "2018-01-10",
                        "created_by": "jchipault",
                        "modified_date": "2012-05-14",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1423,
                        "name": "Brown-headed Cowbird",
                        "class_name": "dolor",
                        "order_name": "nisi",
                        "family_name": "et",
                        "sub_family_name": "eu",
                        "genus_name": "quis",
                        "species_latin_name": "labore",
                        "subspecies_latin_name": "velit",
                        "tsn": 1,
                        "created_date": "2015-12-18",
                        "created_by": "kmiller",
                        "modified_date": "2016-01-18",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1018,
                "event_type": 1,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2014-07-22",
                "end_date": "2014-01-02",
                "affected_count": 35,
                "created_date": "Sat Nov 03 2012 02:28:03 GMT+0000 (UTC)",
                "created_by": "kmiller",
                "modified_date": "Fri Nov 28 2014 20:40:35 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnoses": [
                    {
                        "id": 1447,
                        "diagnosis": 5,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": false,
                        "major": false,
                        "priority": 3,
                        "created_date": "2012-01-15",
                        "created_by": "jchipault",
                        "modified_date": "2018-11-16",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1318,
                        "name": "Montana",
                        "country": 30,
                        "abbreviation": "MI",
                        "created_date": "2014-01-06",
                        "created_by": "kmiller",
                        "modified_date": "2011-09-11",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1290,
                        "name": "Juneau",
                        "state": 4,
                        "points": "",
                        "centroid_latitude": "38.1657",
                        "centroid_longitude": "-145.5913",
                        "fips_code": "5b2acdd843fa1efc80047fb4",
                        "created_date": "2012-11-04",
                        "created_by": "jchipault",
                        "modified_date": "2015-09-15",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1293,
                        "name": "Polk",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "7.0213",
                        "centroid_longitude": "-23.5485",
                        "fips_code": "5b2acdd82c9aace527f5882c",
                        "created_date": "2011-12-21",
                        "created_by": "kmiller",
                        "modified_date": "2017-11-10",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1245,
                        "name": "Juneau",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "47.3256",
                        "centroid_longitude": "-40.1526",
                        "fips_code": "5b2acdd85e75d07c65c65e03",
                        "created_date": "2014-11-26",
                        "created_by": "jchipault",
                        "modified_date": "2017-08-28",
                        "modified_by": "nbartlein"
                    }
                ],
                "species": [
                    {
                        "id": 1235,
                        "name": "Mallard",
                        "class_name": "ullamco",
                        "order_name": "occaecat",
                        "family_name": "ad",
                        "sub_family_name": "sit",
                        "genus_name": "ad",
                        "species_latin_name": "consequat",
                        "subspecies_latin_name": "officia",
                        "tsn": 3,
                        "created_date": "2014-03-15",
                        "created_by": "nbartlein",
                        "modified_date": "2014-06-22",
                        "modified_by": "kmiller"
                    },
                    {
                        "id": 1231,
                        "name": "Mallard",
                        "class_name": "aliqua",
                        "order_name": "et",
                        "family_name": "eiusmod",
                        "sub_family_name": "incididunt",
                        "genus_name": "eu",
                        "species_latin_name": "ullamco",
                        "subspecies_latin_name": "aliquip",
                        "tsn": 4,
                        "created_date": "2013-05-14",
                        "created_by": "nbartlein",
                        "modified_date": "2017-02-26",
                        "modified_by": "jchipault"
                    }
                ]
            },
            {
                "id": 1019,
                "event_type": 2,
                "event_type_string": "Morbidity / Mortality",
                "start_date": "2012-08-30",
                "end_date": "2016-12-09",
                "affected_count": 32,
                "created_date": "Fri Mar 04 2016 17:52:24 GMT+0000 (UTC)",
                "created_by": "jchipault",
                "modified_date": "Mon Mar 17 2014 07:45:31 GMT+0000 (UTC)",
                "modified_by": "kmiller",
                "event_diagnoses": [
                    {
                        "id": 1436,
                        "diagnosis": 5,
                        "diagnosis_string": "Aspergillosis",
                        "confirmed": false,
                        "major": true,
                        "priority": 1,
                        "created_date": "2016-06-03",
                        "created_by": "kmiller",
                        "modified_date": "2011-02-18",
                        "modified_by": "nbartlein"
                    }
                ],
                "administrativelevelones": [
                    {
                        "id": 1260,
                        "name": "Wisconsin",
                        "country": 30,
                        "abbreviation": "IL",
                        "created_date": "2015-02-02",
                        "created_by": "kmiller",
                        "modified_date": "2018-05-31",
                        "modified_by": "jchipault"
                    }
                ],
                "administrativeleveltwos": [
                    {
                        "id": 1366,
                        "name": "Marathon",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "64.3224",
                        "centroid_longitude": "-124.391",
                        "fips_code": "5b2acdd81f2778fb7766240f",
                        "created_date": "2013-09-05",
                        "created_by": "jchipault",
                        "modified_date": "2015-04-11",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1142,
                        "name": "Juneau",
                        "state": 5,
                        "points": "",
                        "centroid_latitude": "74.3934",
                        "centroid_longitude": "169.6409",
                        "fips_code": "5b2acdd870126c9f7dbe2d56",
                        "created_date": "2011-11-19",
                        "created_by": "jchipault",
                        "modified_date": "2011-06-21",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1254,
                        "name": "Marathon",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "43.9003",
                        "centroid_longitude": "-47.3785",
                        "fips_code": "5b2acdd8eb52185f2e04828a",
                        "created_date": "2013-01-18",
                        "created_by": "nbartlein",
                        "modified_date": "2011-12-15",
                        "modified_by": "jchipault"
                    },
                    {
                        "id": 1228,
                        "name": "Hennepin",
                        "state": 3,
                        "points": "",
                        "centroid_latitude": "37.7392",
                        "centroid_longitude": "-166.1837",
                        "fips_code": "5b2acdd8a74d260b9a3af2f9",
                        "created_date": "2012-06-02",
                        "created_by": "kmiller",
                        "modified_date": "2014-10-12",
                        "modified_by": "kmiller"
                    }
                ],
                "species": [
                    {
                        "id": 1191,
                        "name": "Snow Goose",
                        "class_name": "ex",
                        "order_name": "non",
                        "family_name": "tempor",
                        "sub_family_name": "aute",
                        "genus_name": "deserunt",
                        "species_latin_name": "mollit",
                        "subspecies_latin_name": "in",
                        "tsn": 1,
                        "created_date": "2018-02-05",
                        "created_by": "nbartlein",
                        "modified_date": "2016-10-27",
                        "modified_by": "nbartlein"
                    },
                    {
                        "id": 1457,
                        "name": "Brown Pelican",
                        "class_name": "excepteur",
                        "order_name": "exercitation",
                        "family_name": "aliquip",
                        "sub_family_name": "occaecat",
                        "genus_name": "in",
                        "species_latin_name": "et",
                        "subspecies_latin_name": "ea",
                        "tsn": 1,
                        "created_date": "2016-03-16",
                        "created_by": "kmiller",
                        "modified_date": "2014-09-11",
                        "modified_by": "kmiller"
                    }
                ]
            }
        ]
    }

    public static get SAMPLE_EVENT_DETAIL_DATA() {
        return [
            {
                "id": 3,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Marathon",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Juneau",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Dane",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Hennepin",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Hennepin",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Hennepin",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Polk",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Juneau",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Polk",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Marquette",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Polk",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Dane",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Juneau",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Juneau",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Dane",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Polk",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Hennepin",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Polk",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Juneau",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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
                        "administrative_level_two": 47,
                        "administrative_level_two_string": "Marquette",
                        "administrative_level_two_multiple": false,
                        "administrative_level_two_unknown": false,
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

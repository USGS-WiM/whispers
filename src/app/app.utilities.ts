import { Injectable } from "@angular/core";
import { EventSummary } from "@app/interfaces/event-summary";

@Injectable()
export class APP_UTILITIES {

    public static get STATES() {
        return [
            {
                "id": 1,
                "name": "Alabama",
                "abbreviation": "AL"
            },
            {
                "id": 2,
                "name": "Alaska",
                "abbreviation": "AK"
            },
            {
                "id": 3,
                "name": "Arizona",
                "abbreviation": "AZ"
            },
            {
                "id": 4,
                "name": "Arkansas",
                "abbreviation": "AR"
            },
            {
                "id": 5,
                "name": "California",
                "abbreviation": "CA"
            },
            {
                "id": 6,
                "name": "Colorado",
                "abbreviation": "CO"
            },
            {
                "id": 7,
                "name": "Connecticut",
                "abbreviation": "CT"
            },
            {
                "id": 8,
                "name": "Delaware",
                "abbreviation": "DE"
            },
            {
                "id": 9,
                "name": "District of Columbia",
                "abbreviation": "DC"
            },
            {
                "id": 10,
                "name": "Florida",
                "abbreviation": "FL"
            },
            {
                "id": 11,
                "name": "Georgia",
                "abbreviation": "GA"
            },
            {
                "id": 12,
                "name": "Hawaii",
                "abbreviation": "HI"
            },
            {
                "id": 13,
                "name": "Idaho",
                "abbreviation": "ID"
            },
            {
                "id": 14,
                "name": "Illinois",
                "abbreviation": "IL"
            },
            {
                "id": 15,
                "name": "Indiana",
                "abbreviation": "IN"
            },
            {
                "id": 16,
                "name": "Iowa",
                "abbreviation": "IA"
            },
            {
                "id": 17,
                "name": "Kansa",
                "abbreviation": "KS"
            },
            {
                "id": 18,
                "name": "Kentucky",
                "abbreviation": "KY"
            },
            {
                "id": 19,
                "name": "Lousiana",
                "abbreviation": "LA"
            },
            {
                "id": 20,
                "name": "Maine",
                "abbreviation": "ME"
            },
            {
                "id": 21,
                "name": "Maryland",
                "abbreviation": "MD"
            },
            {
                "id": 22,
                "name": "Massachusetts",
                "abbreviation": "MA"
            },
            {
                "id": 23,
                "name": "Michigan",
                "abbreviation": "MI"
            },
            {
                "id": 24,
                "name": "Minnesota",
                "abbreviation": "MN"
            },
            {
                "id": 25,
                "name": "Mississippi",
                "abbreviation": "MS"
            },
            {
                "id": 26,
                "name": "Missouri",
                "abbreviation": "MO"
            },
            {
                "id": 27,
                "name": "Montana",
                "abbreviation": "MT"
            },
            {
                "id": 28,
                "name": "Nebraska",
                "abbreviation": "NE"
            },
            {
                "id": 29,
                "name": "Nevada",
                "abbreviation": "NV"
            },
            {
                "id": 30,
                "name": "New Hampshire",
                "abbreviation": "NH"
            },
            {
                "id": 31,
                "name": "New Jersey",
                "abbreviation": "NJ"
            },
            {
                "id": 32,
                "name": "New Mexico",
                "abbreviation": "NM"
            },
            {
                "id": 33,
                "name": "New York",
                "abbreviation": "NY"
            },
            {
                "id": 34,
                "name": "North Carolina",
                "abbreviation": "NC"
            },
            {
                "id": 35,
                "name": "North Dakota",
                "abbreviation": "ND"
            },
            {
                "id": 36,
                "name": "Ohio",
                "abbreviation": "OH"
            },
            {
                "id": 37,
                "name": "Oklahoma",
                "abbreviation": "OK"
            },
            {

                "id": 38,
                "name": "Oregon",
                "abbreviation": "OR"
            },
            {
                "id": 39,
                "name": "Pennsylvania",
                "abbreviation": "PA"
            },
            {
                "id": 40,
                "name": "Rhode Island",
                "abbreviation": "RI"
            },
            {
                "id": 41,
                "name": "South Carolina",
                "abbreviation": "SC"
            },
            {
                "id": 42,
                "name": "South Dakota",
                "abbreviation": "SD"
            },
            {
                "id": 43,
                "name": "Tennessee",
                "abbreviation": "TN"
            },
            {
                "id": 44,
                "name": "Texas",
                "abbreviation": "TX"
            },
            {
                "id": 45,
                "name": "Utah",
                "abbreviation": "UT"
            },
            {
                "id": 46,
                "name": "Vermont",
                "abbreviation": "VT"
            },
            {
                "id": 47,
                "name": "Virginia",
                "abbreviation": "VA"
            },
            {
                "id": 48,
                "name": "Washington",
                "abbreviation": "WA"
            },
            {
                "id": 49,
                "name": "West Virginia",
                "abbreviation": "WV"
            },
            {
                "id": 50,
                "name": "Wisconsin",
                "abbreviation": "WI"
            },
            {
                "id": 51,
                "name": "Wyoming",
                "abbreviation": "WY"
            }
        ]
    }

    public static get SAMPLE_EVENT_DATA() {
        return [
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Wed Mar 29 2017 17:58:26 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun Apr 27 2014 09:48:43 GMT+0000 (UTC)",
                        "tsn": 4,
                        "subspecies_latin_name": "non",
                        "species_latin_name": "et",
                        "genus_name": "sunt",
                        "sub_family_name": "nulla",
                        "family_name": "officia",
                        "order_name": "aliquip",
                        "class_name": "est",
                        "name": "Gopher Frog",
                        "id": 1220
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sun Oct 26 2014 13:21:19 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun Apr 26 2015 14:28:50 GMT+0000 (UTC)",
                        "tsn": 2,
                        "subspecies_latin_name": "amet",
                        "species_latin_name": "ullamco",
                        "genus_name": "sit",
                        "sub_family_name": "esse",
                        "family_name": "reprehenderit",
                        "order_name": "irure",
                        "class_name": "fugiat",
                        "name": "Brown-headed Cowbird",
                        "id": 1025
                    }
                ],
                "counties": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Wed Apr 04 2012 00:24:44 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Mon Dec 29 2014 01:17:31 GMT+0000 (UTC)",
                        "fips_code": "5abbf4e9eda8a16424ed83d7",
                        "centroid_longitude": "-54.8788",
                        "centroid_latitude": "39.2213",
                        "points": "",
                        "state": 3,
                        "name": "Dane",
                        "id": 1313
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Thu Feb 09 2017 23:30:57 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Fri May 05 2017 13:44:26 GMT+0000 (UTC)",
                        "fips_code": "5abbf4e98951358a5826275b",
                        "centroid_longitude": "121.6405",
                        "centroid_latitude": "18.3502",
                        "points": "",
                        "state": 4,
                        "name": "Marathon",
                        "id": 1460
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Wed Mar 28 2012 14:57:07 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Mon Apr 03 2017 16:52:27 GMT+0000 (UTC)",
                        "fips_code": "5abbf4e9534c71f2d364bbbe",
                        "centroid_longitude": "137.8871",
                        "centroid_latitude": "36.787",
                        "points": "",
                        "state": 1,
                        "name": "Polk",
                        "id": 1359
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Tue Feb 05 2013 04:32:02 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sat Nov 02 2013 07:14:02 GMT+0000 (UTC)",
                        "fips_code": "5abbf4e9d9109393281893b7",
                        "centroid_longitude": "106.9289",
                        "centroid_latitude": "15.0013",
                        "points": "",
                        "state": 4,
                        "name": "Marquette",
                        "id": 1476
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Tue Oct 18 2016 00:42:53 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Sat May 10 2014 22:35:57 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 2,
                        "name": "Minnesota",
                        "id": 1295
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Fri Nov 10 2017 14:04:02 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Tue Apr 17 2012 20:46:29 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 3,
                        "name": "Minnesota",
                        "id": 1183
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "sspencer",
                    "modified_date": "Tue Jan 13 2015 19:09:24 GMT+0000 (UTC)",
                    "created_by": "jpstokdyk",
                    "created_date": "Wed Jun 27 2012 00:28:41 GMT+0000 (UTC)",
                    "priority": 2,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Schistosomiasis",
                    "diagnosis": 5,
                    "id": 1277
                },
                "modified_by": "afirnstahl",
                "modified_date": "Sat Nov 19 2016 17:35:21 GMT+0000 (UTC)",
                "created_by": "jpstokdyk",
                "created_date": "Sun Aug 21 2016 08:53:50 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "Potential Legal",
                "event_status_string": "Supplemental Report Needed",
                "event_status": 4,
                "epi_staff": "Gutierrez Mann",
                "affected_count": 32,
                "end_date": "Mon Sep 24 2012 08:06:41 GMT+0000 (UTC)",
                "start_date": "Sun Feb 19 2012 12:31:14 GMT+0000 (UTC)",
                "complete": true,
                "event_reference": " Aquasure",
                "event_type_string": "Surveillance",
                "event_type": 2,
                "id": 0
            },
            {
                "species": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri Sep 02 2016 06:06:00 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Tue Jun 20 2017 02:28:51 GMT+0000 (UTC)",
                        "tsn": 1,
                        "subspecies_latin_name": "cillum",
                        "species_latin_name": "do",
                        "genus_name": "do",
                        "sub_family_name": "laboris",
                        "family_name": "aliqua",
                        "order_name": "magna",
                        "class_name": "reprehenderit",
                        "name": "Snow Goose",
                        "id": 1351
                    }
                ],
                "counties": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Wed Sep 20 2017 05:41:01 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Tue Mar 01 2016 03:30:11 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea0b7ad3fab9e8fac1",
                        "centroid_longitude": "-51.2535",
                        "centroid_latitude": "70.5426",
                        "points": "",
                        "state": 1,
                        "name": "Marquette",
                        "id": 1246
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Fri Feb 12 2016 22:18:01 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Mon Feb 16 2015 13:59:22 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea1df15c0e49256b1e",
                        "centroid_longitude": "151.9073",
                        "centroid_latitude": "81.331",
                        "points": "",
                        "state": 3,
                        "name": "Marathon",
                        "id": 1005
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri Mar 04 2016 04:15:16 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue Nov 20 2012 22:14:00 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 2,
                        "name": "Michigan",
                        "id": 1376
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Mon Aug 10 2015 07:04:43 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun Dec 09 2012 20:30:54 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 5,
                        "name": "Minnesota",
                        "id": 1495
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "afirnstahl",
                    "modified_date": "Thu Oct 13 2016 20:19:13 GMT+0000 (UTC)",
                    "created_by": "afirnstahl",
                    "created_date": "Thu Sep 17 2015 14:39:39 GMT+0000 (UTC)",
                    "priority": 2,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Avian Cholera",
                    "diagnosis": 4,
                    "id": 1003
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Wed Nov 14 2012 08:51:00 GMT+0000 (UTC)",
                "created_by": "afirnstahl",
                "created_date": "Sat Feb 04 2012 21:56:19 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "Legal - Case Open",
                "event_status_string": "Supplemental Report Needed",
                "event_status": 6,
                "epi_staff": "Ellen Vance",
                "affected_count": 40,
                "end_date": "Sun May 14 2017 01:04:02 GMT+0000 (UTC)",
                "start_date": "Thu Aug 24 2017 18:55:32 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Isoswitch",
                "event_type_string": "Surveillance",
                "event_type": 1,
                "id": 1
            },
            {
                "species": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Fri Nov 23 2012 18:21:37 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun May 20 2012 10:45:43 GMT+0000 (UTC)",
                        "tsn": 1,
                        "subspecies_latin_name": "esse",
                        "species_latin_name": "adipisicing",
                        "genus_name": "consectetur",
                        "sub_family_name": "fugiat",
                        "family_name": "culpa",
                        "order_name": "proident",
                        "class_name": "aliquip",
                        "name": "Brown-headed Cowbird",
                        "id": 1049
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Thu Nov 12 2015 12:47:01 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Fri Oct 18 2013 01:20:05 GMT+0000 (UTC)",
                        "tsn": 5,
                        "subspecies_latin_name": "do",
                        "species_latin_name": "consectetur",
                        "genus_name": "pariatur",
                        "sub_family_name": "aliquip",
                        "family_name": "in",
                        "order_name": "ex",
                        "class_name": "aliquip",
                        "name": "Mallard",
                        "id": 1318
                    }
                ],
                "counties": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Thu Mar 07 2013 02:53:01 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Fri Feb 22 2013 12:32:25 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eac151d341ffde674e",
                        "centroid_longitude": "69.0389",
                        "centroid_latitude": "12.5926",
                        "points": "",
                        "state": 3,
                        "name": "Marathon",
                        "id": 1250
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sat Feb 04 2012 03:40:04 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Mon Jan 23 2012 14:00:30 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea3a91547d2d545cf6",
                        "centroid_longitude": "53.5626",
                        "centroid_latitude": "67.0662",
                        "points": "",
                        "state": 1,
                        "name": "Polk",
                        "id": 1179
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Thu Aug 10 2017 18:41:51 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Fri Feb 26 2016 14:42:44 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eafec4df5ae75013f8",
                        "centroid_longitude": "108.1279",
                        "centroid_latitude": "25.1527",
                        "points": "",
                        "state": 3,
                        "name": "Marathon",
                        "id": 1167
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sat May 20 2017 03:27:56 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sat Dec 31 2016 00:30:45 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea7fb9c1cf62973725",
                        "centroid_longitude": "26.0607",
                        "centroid_latitude": "80.0193",
                        "points": "",
                        "state": 2,
                        "name": "Polk",
                        "id": 1255
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sat Jul 05 2014 13:47:19 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Wed Mar 20 2013 13:19:58 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 4,
                        "name": "Minnesota",
                        "id": 1147
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "afirnstahl",
                    "modified_date": "Thu Mar 20 2014 01:04:01 GMT+0000 (UTC)",
                    "created_by": "afirnstahl",
                    "created_date": "Thu Dec 31 2015 23:59:25 GMT+0000 (UTC)",
                    "priority": 3,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Schistosomiasis",
                    "diagnosis": 3,
                    "id": 1052
                },
                "modified_by": "sspencer",
                "modified_date": "Thu Sep 08 2016 18:37:42 GMT+0000 (UTC)",
                "created_by": "sspencer",
                "created_date": "Mon Jun 18 2012 04:21:54 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "Potential Legal",
                "event_status_string": "New Event Record",
                "event_status": 1,
                "epi_staff": "Ramona Daugherty",
                "affected_count": 32,
                "end_date": "Sat Apr 01 2017 21:02:20 GMT+0000 (UTC)",
                "start_date": "Sun Jul 28 2013 17:19:20 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Aquoavo",
                "event_type_string": "Morbidity / Mortality",
                "event_type": 2,
                "id": 2
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Aug 10 2013 22:54:23 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Tue Mar 03 2015 17:34:12 GMT+0000 (UTC)",
                        "tsn": 1,
                        "subspecies_latin_name": "minim",
                        "species_latin_name": "exercitation",
                        "genus_name": "non",
                        "sub_family_name": "mollit",
                        "family_name": "nulla",
                        "order_name": "ut",
                        "class_name": "ad",
                        "name": "Brown Pelican",
                        "id": 1461
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sun Apr 17 2016 15:42:23 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Fri Aug 21 2015 06:35:27 GMT+0000 (UTC)",
                        "tsn": 3,
                        "subspecies_latin_name": "nisi",
                        "species_latin_name": "officia",
                        "genus_name": "incididunt",
                        "sub_family_name": "deserunt",
                        "family_name": "sint",
                        "order_name": "fugiat",
                        "class_name": "qui",
                        "name": "Mallard",
                        "id": 1479
                    }
                ],
                "counties": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sun Jul 24 2016 08:45:27 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Wed Oct 01 2014 00:23:24 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eaa6e69da1ea71623b",
                        "centroid_longitude": "-51.7691",
                        "centroid_latitude": "25.6521",
                        "points": "",
                        "state": 4,
                        "name": "Marathon",
                        "id": 1308
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Tue Jan 02 2018 21:18:09 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue Mar 04 2014 08:31:12 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea643ac1e575bb7d33",
                        "centroid_longitude": "-89.7397",
                        "centroid_latitude": "7.075",
                        "points": "",
                        "state": 1,
                        "name": "Polk",
                        "id": 1287
                    }
                ],
                "states": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Apr 13 2013 06:06:30 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun Jan 29 2012 07:22:15 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 5,
                        "name": "Wisconsin",
                        "id": 1386
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "jpstokdyk",
                    "modified_date": "Sat Sep 15 2012 23:12:36 GMT+0000 (UTC)",
                    "created_by": "afirnstahl",
                    "created_date": "Thu Jan 10 2013 12:17:50 GMT+0000 (UTC)",
                    "priority": 1,
                    "major": true,
                    "confirmed": true,
                    "diagnosis_string": "Aspergillosis",
                    "diagnosis": 5,
                    "id": 1117
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Tue Jul 25 2017 05:54:33 GMT+0000 (UTC)",
                "created_by": "afirnstahl",
                "created_date": "Thu Apr 17 2014 17:22:29 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "Potential Legal",
                "event_status_string": "Supplemental Report Needed",
                "event_status": 2,
                "epi_staff": "Haynes Boone",
                "affected_count": 34,
                "end_date": "Mon Jan 09 2012 19:41:32 GMT+0000 (UTC)",
                "start_date": "Thu May 07 2015 17:41:28 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Liquicom",
                "event_type_string": "Surveillance",
                "event_type": 1,
                "id": 3
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Thu Nov 06 2014 09:32:10 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Tue Aug 15 2017 08:56:53 GMT+0000 (UTC)",
                        "tsn": 2,
                        "subspecies_latin_name": "nulla",
                        "species_latin_name": "ex",
                        "genus_name": "irure",
                        "sub_family_name": "deserunt",
                        "family_name": "excepteur",
                        "order_name": "mollit",
                        "class_name": "nulla",
                        "name": "Mallard",
                        "id": 1159
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri Sep 28 2012 02:17:46 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Fri Mar 23 2012 11:49:08 GMT+0000 (UTC)",
                        "tsn": 1,
                        "subspecies_latin_name": "veniam",
                        "species_latin_name": "do",
                        "genus_name": "eu",
                        "sub_family_name": "nisi",
                        "family_name": "sint",
                        "order_name": "excepteur",
                        "class_name": "Lorem",
                        "name": "Mallard",
                        "id": 1359
                    }
                ],
                "counties": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Wed May 23 2012 19:54:33 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Mon Aug 29 2016 00:32:15 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea4ee847df464ece1f",
                        "centroid_longitude": "141.0777",
                        "centroid_latitude": "15.6374",
                        "points": "",
                        "state": 4,
                        "name": "Dane",
                        "id": 1132
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sun Jan 27 2013 17:22:02 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Thu Dec 19 2013 02:46:51 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea069ace98889872e6",
                        "centroid_longitude": "-84.1766",
                        "centroid_latitude": "71.9306",
                        "points": "",
                        "state": 1,
                        "name": "Marquette",
                        "id": 1367
                    }
                ],
                "states": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Fri Feb 01 2013 18:02:34 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Fri Feb 26 2016 12:44:19 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 4,
                        "name": "Michigan",
                        "id": 1005
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "sspencer",
                    "modified_date": "Thu Mar 08 2012 10:58:39 GMT+0000 (UTC)",
                    "created_by": "jpstokdyk",
                    "created_date": "Mon Jan 09 2012 18:30:16 GMT+0000 (UTC)",
                    "priority": 3,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Schistosomiasis",
                    "diagnosis": 4,
                    "id": 1283
                },
                "modified_by": "sspencer",
                "modified_date": "Wed Jun 11 2014 19:10:41 GMT+0000 (UTC)",
                "created_by": "jpstokdyk",
                "created_date": "Sat Jan 30 2016 08:06:51 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "Legal - Case Closed",
                "event_status_string": "Supplemental Report Needed",
                "event_status": 1,
                "epi_staff": "Enid Osborn",
                "affected_count": 37,
                "end_date": "Thu May 21 2015 15:13:25 GMT+0000 (UTC)",
                "start_date": "Sat Mar 17 2012 08:54:05 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Insectus",
                "event_type_string": "Surveillance",
                "event_type": 2,
                "id": 4
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sun Dec 23 2012 14:49:13 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Sun Mar 16 2014 22:15:42 GMT+0000 (UTC)",
                        "tsn": 3,
                        "subspecies_latin_name": "amet",
                        "species_latin_name": "nostrud",
                        "genus_name": "Lorem",
                        "sub_family_name": "eiusmod",
                        "family_name": "Lorem",
                        "order_name": "dolor",
                        "class_name": "ipsum",
                        "name": "Brown-headed Cowbird",
                        "id": 1241
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Thu Oct 09 2014 11:48:47 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sat Aug 06 2016 11:14:40 GMT+0000 (UTC)",
                        "tsn": 5,
                        "subspecies_latin_name": "eiusmod",
                        "species_latin_name": "et",
                        "genus_name": "quis",
                        "sub_family_name": "sint",
                        "family_name": "cupidatat",
                        "order_name": "culpa",
                        "class_name": "dolore",
                        "name": "Mallard",
                        "id": 1482
                    }
                ],
                "counties": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Wed Oct 18 2017 11:22:01 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Thu Mar 09 2017 06:13:23 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ead5b3a9aed0d30909",
                        "centroid_longitude": "53.9689",
                        "centroid_latitude": "53.9503",
                        "points": "",
                        "state": 1,
                        "name": "Marathon",
                        "id": 1447
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Sep 26 2015 13:09:55 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Thu Dec 15 2016 08:13:47 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea6648d2d188a75071",
                        "centroid_longitude": "107.2742",
                        "centroid_latitude": "18.3067",
                        "points": "",
                        "state": 2,
                        "name": "Hennepin",
                        "id": 1256
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Fri Aug 24 2012 18:45:42 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Mon Dec 15 2014 06:50:57 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea97218a4d951dbf52",
                        "centroid_longitude": "74.4148",
                        "centroid_latitude": "51.0848",
                        "points": "",
                        "state": 1,
                        "name": "Marathon",
                        "id": 1274
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Thu Feb 04 2016 19:52:41 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Tue Jan 31 2012 04:24:40 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eaa7ba6d14aed47e14",
                        "centroid_longitude": "-81.1469",
                        "centroid_latitude": "61.7298",
                        "points": "",
                        "state": 3,
                        "name": "Marquette",
                        "id": 1404
                    }
                ],
                "states": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Fri Nov 30 2012 21:21:34 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Mon Sep 18 2017 14:49:43 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 3,
                        "name": "Michigan",
                        "id": 1080
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri Jun 03 2016 20:27:46 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Thu Oct 04 2012 15:19:44 GMT+0000 (UTC)",
                        "abbreviation": "MN",
                        "country": 2,
                        "name": "Michigan",
                        "id": 1329
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "jpstokdyk",
                    "modified_date": "Sun Jan 22 2012 21:11:53 GMT+0000 (UTC)",
                    "created_by": "jpstokdyk",
                    "created_date": "Tue Jan 24 2017 13:03:59 GMT+0000 (UTC)",
                    "priority": 1,
                    "major": true,
                    "confirmed": true,
                    "diagnosis_string": "Avian Cholera",
                    "diagnosis": 1,
                    "id": 1480
                },
                "modified_by": "afirnstahl",
                "modified_date": "Sun Apr 14 2013 10:25:49 GMT+0000 (UTC)",
                "created_by": "jpstokdyk",
                "created_date": "Sun Jul 10 2016 23:32:42 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "Legal - Case Open",
                "event_status_string": "Final Report Needed",
                "event_status": 1,
                "epi_staff": "Eaton Francis",
                "affected_count": 33,
                "end_date": "Sun Mar 16 2014 22:54:51 GMT+0000 (UTC)",
                "start_date": "Mon Dec 30 2013 06:59:47 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Artiq",
                "event_type_string": "Surveillance",
                "event_type": 1,
                "id": 5
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Tue Aug 06 2013 19:27:04 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Thu Nov 07 2013 01:50:31 GMT+0000 (UTC)",
                        "tsn": 1,
                        "subspecies_latin_name": "proident",
                        "species_latin_name": "laborum",
                        "genus_name": "consequat",
                        "sub_family_name": "ipsum",
                        "family_name": "labore",
                        "order_name": "est",
                        "class_name": "quis",
                        "name": "Brown Pelican",
                        "id": 1321
                    }
                ],
                "counties": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Thu May 29 2014 15:55:58 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sat Mar 23 2013 11:57:52 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea05bcbf133cbee163",
                        "centroid_longitude": "3.9546",
                        "centroid_latitude": "8.5334",
                        "points": "",
                        "state": 4,
                        "name": "Marathon",
                        "id": 1400
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Mon Sep 28 2015 13:19:05 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Mon Nov 13 2017 15:24:16 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ea91960cf0fca8708f",
                        "centroid_longitude": "35.4833",
                        "centroid_latitude": "57.9531",
                        "points": "",
                        "state": 5,
                        "name": "Hennepin",
                        "id": 1123
                    }
                ],
                "states": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Thu Jul 31 2014 12:19:14 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun Apr 14 2013 23:08:03 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 2,
                        "name": "Minnesota",
                        "id": 1185
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "afirnstahl",
                    "modified_date": "Sat Mar 11 2017 09:16:14 GMT+0000 (UTC)",
                    "created_by": "afirnstahl",
                    "created_date": "Sat May 27 2017 18:53:07 GMT+0000 (UTC)",
                    "priority": 2,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Open",
                    "diagnosis": 1,
                    "id": 1270
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Thu May 04 2017 09:21:20 GMT+0000 (UTC)",
                "created_by": "jpstokdyk",
                "created_date": "Wed Apr 05 2017 04:58:41 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "Legal - Case Closed",
                "event_status_string": "Field and Diagnostics Ongoing",
                "event_status": 3,
                "epi_staff": "Gretchen Warren",
                "affected_count": 35,
                "end_date": "Thu Jul 25 2013 06:28:06 GMT+0000 (UTC)",
                "start_date": "Sun Feb 12 2017 08:42:37 GMT+0000 (UTC)",
                "complete": true,
                "event_reference": " Megall",
                "event_type_string": "Surveillance",
                "event_type": 2,
                "id": 6
            },
            {
                "species": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Tue Apr 10 2012 23:50:28 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Mon Aug 22 2016 12:46:30 GMT+0000 (UTC)",
                        "tsn": 4,
                        "subspecies_latin_name": "id",
                        "species_latin_name": "non",
                        "genus_name": "enim",
                        "sub_family_name": "commodo",
                        "family_name": "consectetur",
                        "order_name": "eu",
                        "class_name": "ea",
                        "name": "Mallard",
                        "id": 1374
                    }
                ],
                "counties": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Tue Jan 17 2017 23:35:20 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Wed Apr 03 2013 12:02:12 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebcaac10650c7fac72",
                        "centroid_longitude": "118.0927",
                        "centroid_latitude": "46.7851",
                        "points": "",
                        "state": 3,
                        "name": "Marathon",
                        "id": 1487
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri Sep 12 2014 05:14:19 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun Aug 24 2014 04:19:45 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb763a4f305de72742",
                        "centroid_longitude": "150.0824",
                        "centroid_latitude": "72.6819",
                        "points": "",
                        "state": 3,
                        "name": "Marquette",
                        "id": 1186
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Fri Jan 26 2018 13:34:51 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sun Jun 22 2014 23:29:26 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebf8c8a2bef09c89cb",
                        "centroid_longitude": "-113.7049",
                        "centroid_latitude": "37.9602",
                        "points": "",
                        "state": 4,
                        "name": "Marquette",
                        "id": 1058
                    }
                ],
                "states": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Wed Feb 04 2015 20:19:29 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Thu Jun 26 2014 12:34:06 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 4,
                        "name": "Minnesota",
                        "id": 1339
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "sspencer",
                    "modified_date": "Mon Jul 16 2012 21:50:09 GMT+0000 (UTC)",
                    "created_by": "jpstokdyk",
                    "created_date": "Tue Nov 07 2017 02:58:19 GMT+0000 (UTC)",
                    "priority": 1,
                    "major": false,
                    "confirmed": false,
                    "diagnosis_string": "Open",
                    "diagnosis": 2,
                    "id": 1351
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Tue May 12 2015 02:08:42 GMT+0000 (UTC)",
                "created_by": "afirnstahl",
                "created_date": "Thu Aug 04 2016 11:53:09 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "Potential Legal",
                "event_status_string": "Supplemental Report Needed",
                "event_status": 4,
                "epi_staff": "Richards Morris",
                "affected_count": 37,
                "end_date": "Wed May 03 2017 16:25:54 GMT+0000 (UTC)",
                "start_date": "Sun Nov 20 2016 15:48:42 GMT+0000 (UTC)",
                "complete": true,
                "event_reference": " Autograte",
                "event_type_string": "Morbidity / Mortality",
                "event_type": 1,
                "id": 7
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Thu May 03 2012 03:50:52 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue May 02 2017 16:25:10 GMT+0000 (UTC)",
                        "tsn": 2,
                        "subspecies_latin_name": "velit",
                        "species_latin_name": "minim",
                        "genus_name": "tempor",
                        "sub_family_name": "officia",
                        "family_name": "consectetur",
                        "order_name": "nostrud",
                        "class_name": "ipsum",
                        "name": "Gopher Frog",
                        "id": 1442
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Jun 22 2013 05:42:10 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sat Sep 20 2014 11:26:49 GMT+0000 (UTC)",
                        "tsn": 2,
                        "subspecies_latin_name": "est",
                        "species_latin_name": "exercitation",
                        "genus_name": "sint",
                        "sub_family_name": "pariatur",
                        "family_name": "non",
                        "order_name": "anim",
                        "class_name": "culpa",
                        "name": "Gopher Frog",
                        "id": 1048
                    }
                ],
                "counties": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Mon Jun 05 2017 12:58:20 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Sun Sep 13 2015 04:15:48 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebc83c29d891016957",
                        "centroid_longitude": "164.316",
                        "centroid_latitude": "32.9408",
                        "points": "",
                        "state": 2,
                        "name": "Marquette",
                        "id": 1126
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Thu Feb 09 2017 16:56:26 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Mon Nov 16 2015 18:37:38 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebf168246f8577af77",
                        "centroid_longitude": "-114.971",
                        "centroid_latitude": "86.09",
                        "points": "",
                        "state": 5,
                        "name": "Marquette",
                        "id": 1065
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sun Aug 04 2013 04:51:42 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Mon Nov 04 2013 09:40:48 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb30e3655140d822b9",
                        "centroid_longitude": "-33.0813",
                        "centroid_latitude": "33.1552",
                        "points": "",
                        "state": 1,
                        "name": "Marathon",
                        "id": 1392
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Wed Aug 03 2016 06:07:02 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Wed Apr 16 2014 08:02:57 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 2,
                        "name": "Minnesota",
                        "id": 1203
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "sspencer",
                    "modified_date": "Mon Aug 17 2015 07:09:20 GMT+0000 (UTC)",
                    "created_by": "jpstokdyk",
                    "created_date": "Mon Nov 12 2012 02:06:09 GMT+0000 (UTC)",
                    "priority": 2,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Avian Cholera",
                    "diagnosis": 5,
                    "id": 1114
                },
                "modified_by": "sspencer",
                "modified_date": "Sun Apr 26 2015 00:35:02 GMT+0000 (UTC)",
                "created_by": "sspencer",
                "created_date": "Thu Jun 26 2014 15:46:06 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "Legal - Case Open",
                "event_status_string": "Final Report Needed",
                "event_status": 6,
                "epi_staff": "Twila Vasquez",
                "affected_count": 21,
                "end_date": "Tue Sep 19 2017 09:21:06 GMT+0000 (UTC)",
                "start_date": "Mon May 15 2017 17:45:49 GMT+0000 (UTC)",
                "complete": true,
                "event_reference": " Photobin",
                "event_type_string": "Surveillance",
                "event_type": 1,
                "id": 8
            },
            {
                "species": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sat Apr 18 2015 19:26:03 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Fri Mar 09 2012 10:12:54 GMT+0000 (UTC)",
                        "tsn": 5,
                        "subspecies_latin_name": "et",
                        "species_latin_name": "consectetur",
                        "genus_name": "aliqua",
                        "sub_family_name": "dolor",
                        "family_name": "adipisicing",
                        "order_name": "adipisicing",
                        "class_name": "labore",
                        "name": "Common Loon",
                        "id": 1291
                    }
                ],
                "counties": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Wed Oct 14 2015 11:24:30 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Mon Jul 31 2017 17:39:45 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb1f4dd86fb6d91c0e",
                        "centroid_longitude": "11.7165",
                        "centroid_latitude": "41.8089",
                        "points": "",
                        "state": 1,
                        "name": "Marquette",
                        "id": 1433
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sun Sep 04 2016 21:23:05 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Fri Jun 06 2014 12:09:32 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb610e21f0bd92040e",
                        "centroid_longitude": "-18.9949",
                        "centroid_latitude": "33.9279",
                        "points": "",
                        "state": 2,
                        "name": "Dane",
                        "id": 1157
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Thu Apr 14 2016 11:04:16 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue Jul 23 2013 00:07:16 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 1,
                        "name": "Michigan",
                        "id": 1010
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Mon Oct 07 2013 02:04:12 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue Jul 16 2013 03:37:31 GMT+0000 (UTC)",
                        "abbreviation": "MN",
                        "country": 3,
                        "name": "Minnesota",
                        "id": 1094
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "sspencer",
                    "modified_date": "Mon Jun 19 2017 20:39:40 GMT+0000 (UTC)",
                    "created_by": "jpstokdyk",
                    "created_date": "Tue May 06 2014 01:37:57 GMT+0000 (UTC)",
                    "priority": 1,
                    "major": true,
                    "confirmed": true,
                    "diagnosis_string": "Avian Cholera",
                    "diagnosis": 3,
                    "id": 1098
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Thu Feb 14 2013 20:17:31 GMT+0000 (UTC)",
                "created_by": "jpstokdyk",
                "created_date": "Thu Mar 01 2012 15:59:19 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "Potential Legal",
                "event_status_string": "Field and Diagnostics Ongoing",
                "event_status": 2,
                "epi_staff": "Bridget Perry",
                "affected_count": 20,
                "end_date": "Fri Aug 19 2016 22:19:24 GMT+0000 (UTC)",
                "start_date": "Sun Jun 18 2017 19:40:58 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Micronaut",
                "event_type_string": "Surveillance",
                "event_type": 1,
                "id": 9
            },
            {
                "species": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sun Jan 21 2018 06:17:45 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sat Apr 20 2013 17:25:31 GMT+0000 (UTC)",
                        "tsn": 5,
                        "subspecies_latin_name": "voluptate",
                        "species_latin_name": "sit",
                        "genus_name": "et",
                        "sub_family_name": "exercitation",
                        "family_name": "magna",
                        "order_name": "sunt",
                        "class_name": "voluptate",
                        "name": "Brown-headed Cowbird",
                        "id": 1099
                    }
                ],
                "counties": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sat Feb 04 2017 21:34:33 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Tue Jul 07 2015 18:21:35 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebbfde3a15a90e42a2",
                        "centroid_longitude": "22.5223",
                        "centroid_latitude": "9.9019",
                        "points": "",
                        "state": 5,
                        "name": "Marathon",
                        "id": 1021
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sun Oct 23 2016 02:00:08 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sat Jun 14 2014 17:22:05 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb89af41118b06fc83",
                        "centroid_longitude": "-91.7657",
                        "centroid_latitude": "10.9097",
                        "points": "",
                        "state": 5,
                        "name": "Polk",
                        "id": 1462
                    }
                ],
                "states": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Mon Aug 31 2015 05:00:36 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Mon Jun 09 2014 10:54:15 GMT+0000 (UTC)",
                        "abbreviation": "MN",
                        "country": 1,
                        "name": "Minnesota",
                        "id": 1338
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Fri Jun 30 2017 21:58:42 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Thu Aug 13 2015 22:09:01 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 2,
                        "name": "Michigan",
                        "id": 1107
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "afirnstahl",
                    "modified_date": "Sat Aug 27 2016 01:30:33 GMT+0000 (UTC)",
                    "created_by": "afirnstahl",
                    "created_date": "Mon Oct 13 2014 21:23:03 GMT+0000 (UTC)",
                    "priority": 3,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Open",
                    "diagnosis": 2,
                    "id": 1149
                },
                "modified_by": "afirnstahl",
                "modified_date": "Fri Nov 08 2013 16:34:54 GMT+0000 (UTC)",
                "created_by": "sspencer",
                "created_date": "Thu Sep 26 2013 06:06:04 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "N/A",
                "event_status_string": "Final Report Needed",
                "event_status": 2,
                "epi_staff": "Hensley Knowles",
                "affected_count": 22,
                "end_date": "Fri Nov 21 2014 19:18:41 GMT+0000 (UTC)",
                "start_date": "Fri Apr 21 2017 08:17:26 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Multron",
                "event_type_string": "Morbidity / Mortality",
                "event_type": 1,
                "id": 10
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Aug 20 2016 23:14:19 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue Dec 02 2014 14:10:55 GMT+0000 (UTC)",
                        "tsn": 5,
                        "subspecies_latin_name": "eu",
                        "species_latin_name": "duis",
                        "genus_name": "ut",
                        "sub_family_name": "est",
                        "family_name": "sint",
                        "order_name": "velit",
                        "class_name": "mollit",
                        "name": "Common Loon",
                        "id": 1040
                    }
                ],
                "counties": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Thu Jun 18 2015 07:35:23 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Thu Mar 19 2015 03:48:48 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebf7af2efb56c0ebd7",
                        "centroid_longitude": "-151.1596",
                        "centroid_latitude": "37.9995",
                        "points": "",
                        "state": 1,
                        "name": "Dane",
                        "id": 1440
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Fri Nov 25 2016 02:27:25 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sat Mar 29 2014 08:09:01 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebf6e2246798438d41",
                        "centroid_longitude": "-30.3883",
                        "centroid_latitude": "62.9671",
                        "points": "",
                        "state": 2,
                        "name": "Marquette",
                        "id": 1088
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Tue Apr 21 2015 19:34:40 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Fri Dec 02 2016 05:42:21 GMT+0000 (UTC)",
                        "abbreviation": "MN",
                        "country": 2,
                        "name": "Minnesota",
                        "id": 1055
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "jpstokdyk",
                    "modified_date": "Wed Feb 07 2018 02:56:47 GMT+0000 (UTC)",
                    "created_by": "sspencer",
                    "created_date": "Fri Nov 27 2015 19:02:47 GMT+0000 (UTC)",
                    "priority": 1,
                    "major": false,
                    "confirmed": false,
                    "diagnosis_string": "Schistosomiasis",
                    "diagnosis": 2,
                    "id": 1470
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Sun Dec 08 2013 16:21:06 GMT+0000 (UTC)",
                "created_by": "afirnstahl",
                "created_date": "Mon Jan 15 2018 18:25:43 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "Legal - Case Open",
                "event_status_string": "Supplemental Report Needed",
                "event_status": 1,
                "epi_staff": "Kane Dixon",
                "affected_count": 38,
                "end_date": "Wed Feb 18 2015 16:04:30 GMT+0000 (UTC)",
                "start_date": "Thu Nov 08 2018 20:38:45 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Nikuda",
                "event_type_string": "Surveillance",
                "event_type": 2,
                "id": 11
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Thu Mar 26 2015 19:56:49 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Tue Jul 08 2014 02:34:41 GMT+0000 (UTC)",
                        "tsn": 3,
                        "subspecies_latin_name": "labore",
                        "species_latin_name": "commodo",
                        "genus_name": "sit",
                        "sub_family_name": "nisi",
                        "family_name": "ex",
                        "order_name": "ex",
                        "class_name": "ea",
                        "name": "Brown-headed Cowbird",
                        "id": 1401
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Aug 06 2016 04:14:56 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Mon Mar 24 2014 12:48:37 GMT+0000 (UTC)",
                        "tsn": 1,
                        "subspecies_latin_name": "consequat",
                        "species_latin_name": "occaecat",
                        "genus_name": "labore",
                        "sub_family_name": "proident",
                        "family_name": "do",
                        "order_name": "aliquip",
                        "class_name": "velit",
                        "name": "Mallard",
                        "id": 1435
                    }
                ],
                "counties": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Tue Oct 22 2013 03:28:39 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Sat Sep 30 2017 19:47:43 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebdccd380ab1778e8f",
                        "centroid_longitude": "105.8633",
                        "centroid_latitude": "31.91",
                        "points": "",
                        "state": 1,
                        "name": "Marathon",
                        "id": 1153
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Thu Feb 15 2018 07:57:46 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Wed Feb 03 2016 08:42:44 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebb92fce80e55a2072",
                        "centroid_longitude": "-116.7029",
                        "centroid_latitude": "32.9755",
                        "points": "",
                        "state": 2,
                        "name": "Dane",
                        "id": 1465
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Fri Feb 05 2016 01:25:00 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun Jul 13 2014 15:52:46 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb75c499ec13d14f26",
                        "centroid_longitude": "83.8296",
                        "centroid_latitude": "44.9808",
                        "points": "",
                        "state": 3,
                        "name": "Polk",
                        "id": 1391
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sun Apr 28 2013 08:15:10 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Thu Nov 21 2013 20:25:27 GMT+0000 (UTC)",
                        "abbreviation": "MN",
                        "country": 1,
                        "name": "Michigan",
                        "id": 1107
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "jpstokdyk",
                    "modified_date": "Wed Apr 05 2017 13:37:01 GMT+0000 (UTC)",
                    "created_by": "sspencer",
                    "created_date": "Fri Oct 27 2017 03:52:17 GMT+0000 (UTC)",
                    "priority": 3,
                    "major": true,
                    "confirmed": true,
                    "diagnosis_string": "Open",
                    "diagnosis": 5,
                    "id": 1175
                },
                "modified_by": "afirnstahl",
                "modified_date": "Tue Oct 24 2017 11:06:49 GMT+0000 (UTC)",
                "created_by": "sspencer",
                "created_date": "Sun Sep 28 2014 12:56:46 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "N/A",
                "event_status_string": "New Event Record",
                "event_status": 2,
                "epi_staff": "Lottie Dale",
                "affected_count": 35,
                "end_date": "Mon Oct 27 2014 16:30:52 GMT+0000 (UTC)",
                "start_date": "Fri Jun 26 2015 08:19:08 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Proflex",
                "event_type_string": "Surveillance",
                "event_type": 2,
                "id": 12
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Wed Sep 05 2012 14:56:09 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Tue May 26 2015 15:18:38 GMT+0000 (UTC)",
                        "tsn": 5,
                        "subspecies_latin_name": "commodo",
                        "species_latin_name": "nostrud",
                        "genus_name": "proident",
                        "sub_family_name": "enim",
                        "family_name": "aliquip",
                        "order_name": "amet",
                        "class_name": "sit",
                        "name": "Snow Goose",
                        "id": 1197
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Thu Nov 06 2014 17:22:01 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Wed Feb 28 2018 13:37:30 GMT+0000 (UTC)",
                        "tsn": 2,
                        "subspecies_latin_name": "ad",
                        "species_latin_name": "nisi",
                        "genus_name": "deserunt",
                        "sub_family_name": "in",
                        "family_name": "cupidatat",
                        "order_name": "do",
                        "class_name": "anim",
                        "name": "Common Loon",
                        "id": 1423
                    }
                ],
                "counties": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Fri Feb 19 2016 10:21:13 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Wed Sep 18 2013 09:17:13 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebd378993bf9244c73",
                        "centroid_longitude": "-161.1264",
                        "centroid_latitude": "29.7643",
                        "points": "",
                        "state": 2,
                        "name": "Marquette",
                        "id": 1153
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Mon Oct 12 2015 08:21:00 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Mon Oct 28 2013 03:17:21 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb4fedd759a19a36e2",
                        "centroid_longitude": "86.7595",
                        "centroid_latitude": "19.3546",
                        "points": "",
                        "state": 5,
                        "name": "Marquette",
                        "id": 1145
                    }
                ],
                "states": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Mon May 18 2015 17:12:37 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sat May 19 2012 19:35:41 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 1,
                        "name": "Michigan",
                        "id": 1160
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Mon Oct 09 2017 19:07:29 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Mon Nov 20 2017 20:31:17 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 2,
                        "name": "Wisconsin",
                        "id": 1438
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "sspencer",
                    "modified_date": "Tue Apr 30 2013 09:00:42 GMT+0000 (UTC)",
                    "created_by": "afirnstahl",
                    "created_date": "Sat Apr 05 2014 11:47:55 GMT+0000 (UTC)",
                    "priority": 3,
                    "major": true,
                    "confirmed": true,
                    "diagnosis_string": "Aspergillosis",
                    "diagnosis": 4,
                    "id": 1291
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Thu Feb 12 2015 15:44:18 GMT+0000 (UTC)",
                "created_by": "afirnstahl",
                "created_date": "Fri Apr 13 2012 12:32:48 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "N/A",
                "event_status_string": "Completed by Owner",
                "event_status": 5,
                "epi_staff": "Erna Parrish",
                "affected_count": 26,
                "end_date": "Mon Nov 19 2012 09:12:22 GMT+0000 (UTC)",
                "start_date": "Thu Mar 08 2018 09:34:22 GMT+0000 (UTC)",
                "complete": true,
                "event_reference": " Amtas",
                "event_type_string": "Morbidity / Mortality",
                "event_type": 2,
                "id": 13
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Mon Mar 12 2018 01:35:24 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Tue Dec 23 2014 02:01:36 GMT+0000 (UTC)",
                        "tsn": 4,
                        "subspecies_latin_name": "in",
                        "species_latin_name": "deserunt",
                        "genus_name": "duis",
                        "sub_family_name": "Lorem",
                        "family_name": "proident",
                        "order_name": "cupidatat",
                        "class_name": "sint",
                        "name": "Snow Goose",
                        "id": 1296
                    }
                ],
                "counties": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri Feb 01 2013 09:56:03 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sat Apr 06 2013 18:58:22 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb0558dc61b623f45d",
                        "centroid_longitude": "28.4989",
                        "centroid_latitude": "3.0622",
                        "points": "",
                        "state": 2,
                        "name": "Hennepin",
                        "id": 1402
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sun Sep 24 2017 09:20:03 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sat Dec 17 2016 07:02:09 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb421aca582bb0b22c",
                        "centroid_longitude": "40.2435",
                        "centroid_latitude": "46.3991",
                        "points": "",
                        "state": 5,
                        "name": "Marquette",
                        "id": 1479
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Mon Oct 23 2017 22:28:47 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Thu Feb 04 2016 14:04:28 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 5,
                        "name": "Wisconsin",
                        "id": 1274
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "jpstokdyk",
                    "modified_date": "Mon Nov 17 2014 17:39:01 GMT+0000 (UTC)",
                    "created_by": "sspencer",
                    "created_date": "Tue Sep 22 2015 04:49:45 GMT+0000 (UTC)",
                    "priority": 1,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Avian Cholera",
                    "diagnosis": 3,
                    "id": 1211
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Tue Sep 16 2014 00:11:22 GMT+0000 (UTC)",
                "created_by": "jpstokdyk",
                "created_date": "Tue Dec 18 2012 02:58:08 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "Legal - Case Open",
                "event_status_string": "Final Report Needed",
                "event_status": 5,
                "epi_staff": "Lula Roberts",
                "affected_count": 36,
                "end_date": "Wed Aug 30 2017 01:42:32 GMT+0000 (UTC)",
                "start_date": "Sat Jun 09 2012 04:02:19 GMT+0000 (UTC)",
                "complete": true,
                "event_reference": " Sequitur",
                "event_type_string": "Morbidity / Mortality",
                "event_type": 1,
                "id": 14
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Tue Nov 04 2014 01:18:35 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Thu Aug 08 2013 20:14:45 GMT+0000 (UTC)",
                        "tsn": 1,
                        "subspecies_latin_name": "laborum",
                        "species_latin_name": "sunt",
                        "genus_name": "laboris",
                        "sub_family_name": "nisi",
                        "family_name": "dolor",
                        "order_name": "commodo",
                        "class_name": "commodo",
                        "name": "Common Loon",
                        "id": 1365
                    }
                ],
                "counties": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Fri Aug 14 2015 02:51:06 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Wed Dec 25 2013 06:12:28 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb701a0670a3b10044",
                        "centroid_longitude": "96.8335",
                        "centroid_latitude": "37.831",
                        "points": "",
                        "state": 1,
                        "name": "Marathon",
                        "id": 1435
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Sep 15 2012 11:55:08 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sun Mar 13 2016 13:39:32 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebded18f82cc5beb14",
                        "centroid_longitude": "138.7077",
                        "centroid_latitude": "12.2924",
                        "points": "",
                        "state": 3,
                        "name": "Hennepin",
                        "id": 1165
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sat Jul 09 2016 16:58:51 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Fri Feb 13 2015 14:24:41 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebe978208fc05266db",
                        "centroid_longitude": "-54.2848",
                        "centroid_latitude": "8.1384",
                        "points": "",
                        "state": 1,
                        "name": "Dane",
                        "id": 1089
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri Sep 15 2017 06:32:15 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Thu May 07 2015 19:26:36 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebfc562ae2db19cac3",
                        "centroid_longitude": "-43.9821",
                        "centroid_latitude": "4.7695",
                        "points": "",
                        "state": 1,
                        "name": "Marquette",
                        "id": 1068
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri May 09 2014 23:30:09 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sat Feb 14 2015 04:32:38 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 5,
                        "name": "Wisconsin",
                        "id": 1089
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Thu Jan 30 2014 15:08:06 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sun May 12 2013 22:36:05 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 5,
                        "name": "Wisconsin",
                        "id": 1323
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "jpstokdyk",
                    "modified_date": "Thu Jul 26 2012 07:49:12 GMT+0000 (UTC)",
                    "created_by": "jpstokdyk",
                    "created_date": "Mon Sep 05 2016 11:14:01 GMT+0000 (UTC)",
                    "priority": 2,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Aspergillosis",
                    "diagnosis": 4,
                    "id": 1027
                },
                "modified_by": "sspencer",
                "modified_date": "Sun Dec 06 2015 23:51:08 GMT+0000 (UTC)",
                "created_by": "jpstokdyk",
                "created_date": "Sat Oct 03 2015 21:15:17 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "N/A",
                "event_status_string": "Field and Diagnostics Ongoing",
                "event_status": 2,
                "epi_staff": "Effie Burke",
                "affected_count": 25,
                "end_date": "Mon Sep 22 2014 05:29:06 GMT+0000 (UTC)",
                "start_date": "Wed Jun 12 2013 22:23:31 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Momentia",
                "event_type_string": "Surveillance",
                "event_type": 2,
                "id": 15
            },
            {
                "species": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sat Oct 06 2012 07:27:56 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Sun Sep 01 2013 00:55:39 GMT+0000 (UTC)",
                        "tsn": 2,
                        "subspecies_latin_name": "id",
                        "species_latin_name": "excepteur",
                        "genus_name": "duis",
                        "sub_family_name": "ut",
                        "family_name": "eu",
                        "order_name": "do",
                        "class_name": "culpa",
                        "name": "Brown Pelican",
                        "id": 1442
                    }
                ],
                "counties": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Tue Oct 17 2017 01:33:22 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Tue Aug 01 2017 18:00:55 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb19af912eac006f45",
                        "centroid_longitude": "124.1108",
                        "centroid_latitude": "49.7099",
                        "points": "",
                        "state": 5,
                        "name": "Dane",
                        "id": 1279
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Tue Mar 15 2016 05:02:41 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Wed Jul 05 2017 06:12:45 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb24f0ca1d51214d1b",
                        "centroid_longitude": "-36.9291",
                        "centroid_latitude": "63.8734",
                        "points": "",
                        "state": 1,
                        "name": "Hennepin",
                        "id": 1418
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Nov 30 2013 22:05:29 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Sat Oct 18 2014 08:19:04 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb080767ab3980fdd2",
                        "centroid_longitude": "-83.3676",
                        "centroid_latitude": "70.4777",
                        "points": "",
                        "state": 1,
                        "name": "Hennepin",
                        "id": 1090
                    }
                ],
                "states": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Tue Apr 15 2014 09:08:49 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Sun Jun 22 2014 02:07:31 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 4,
                        "name": "Minnesota",
                        "id": 1160
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Mon Aug 04 2014 06:04:20 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Thu May 17 2012 13:14:14 GMT+0000 (UTC)",
                        "abbreviation": "MN",
                        "country": 5,
                        "name": "Michigan",
                        "id": 1175
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "jpstokdyk",
                    "modified_date": "Sun Nov 19 2017 19:43:21 GMT+0000 (UTC)",
                    "created_by": "sspencer",
                    "created_date": "Sat Jun 29 2013 11:59:05 GMT+0000 (UTC)",
                    "priority": 1,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Avian Cholera",
                    "diagnosis": 3,
                    "id": 1002
                },
                "modified_by": "afirnstahl",
                "modified_date": "Sun Oct 04 2015 17:09:53 GMT+0000 (UTC)",
                "created_by": "jpstokdyk",
                "created_date": "Mon Jan 16 2017 01:08:01 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "Legal - Case Closed",
                "event_status_string": "Completed by Owner",
                "event_status": 4,
                "epi_staff": "Shelley Brown",
                "affected_count": 24,
                "end_date": "Sat Feb 08 2014 17:45:54 GMT+0000 (UTC)",
                "start_date": "Tue Aug 16 2016 02:29:03 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Stockpost",
                "event_type_string": "Surveillance",
                "event_type": 1,
                "id": 16
            },
            {
                "species": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Tue Jul 08 2014 04:32:11 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Mon Jun 15 2015 02:46:45 GMT+0000 (UTC)",
                        "tsn": 4,
                        "subspecies_latin_name": "ullamco",
                        "species_latin_name": "anim",
                        "genus_name": "ex",
                        "sub_family_name": "esse",
                        "family_name": "proident",
                        "order_name": "laboris",
                        "class_name": "enim",
                        "name": "Brown-headed Cowbird",
                        "id": 1171
                    }
                ],
                "counties": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sat May 04 2013 12:20:00 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Mon May 15 2017 04:14:14 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb11c1deed76fb93e2",
                        "centroid_longitude": "-76.2515",
                        "centroid_latitude": "71.5462",
                        "points": "",
                        "state": 3,
                        "name": "Hennepin",
                        "id": 1167
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sat Jan 14 2012 20:49:26 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue Mar 21 2017 06:01:38 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb3be10707a893ad6e",
                        "centroid_longitude": "37.5068",
                        "centroid_latitude": "53.3182",
                        "points": "",
                        "state": 5,
                        "name": "Polk",
                        "id": 1183
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Sat Mar 10 2012 00:23:55 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Tue Jan 02 2018 19:23:24 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb60b2c893a0bc1d88",
                        "centroid_longitude": "11.1109",
                        "centroid_latitude": "32.6827",
                        "points": "",
                        "state": 2,
                        "name": "Marquette",
                        "id": 1170
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Tue Jan 20 2015 09:47:06 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Thu Apr 06 2017 11:23:34 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 1,
                        "name": "Wisconsin",
                        "id": 1145
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "sspencer",
                    "modified_date": "Mon Jan 21 2013 17:32:50 GMT+0000 (UTC)",
                    "created_by": "afirnstahl",
                    "created_date": "Fri Aug 19 2016 19:58:12 GMT+0000 (UTC)",
                    "priority": 3,
                    "major": true,
                    "confirmed": true,
                    "diagnosis_string": "Schistosomiasis",
                    "diagnosis": 1,
                    "id": 1304
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Mon Aug 29 2016 21:32:46 GMT+0000 (UTC)",
                "created_by": "afirnstahl",
                "created_date": "Thu Aug 01 2013 04:12:03 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": 12456,
                "legal_status": "Legal - Case Closed",
                "event_status_string": "Field and Diagnostics Ongoing",
                "event_status": 5,
                "epi_staff": "Lillian Vega",
                "affected_count": 39,
                "end_date": "Sun Nov 19 2017 23:26:37 GMT+0000 (UTC)",
                "start_date": "Thu Mar 01 2018 21:20:10 GMT+0000 (UTC)",
                "complete": false,
                "event_reference": " Limozen",
                "event_type_string": "Morbidity / Mortality",
                "event_type": 1,
                "id": 17
            },
            {
                "species": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Wed Jan 04 2012 20:52:46 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Sat Jul 09 2016 19:25:48 GMT+0000 (UTC)",
                        "tsn": 5,
                        "subspecies_latin_name": "esse",
                        "species_latin_name": "velit",
                        "genus_name": "qui",
                        "sub_family_name": "aliqua",
                        "family_name": "duis",
                        "order_name": "dolor",
                        "class_name": "voluptate",
                        "name": "Brown Pelican",
                        "id": 1086
                    }
                ],
                "counties": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Mon May 15 2017 17:52:27 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Thu Nov 19 2015 00:59:30 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebab3912f36c8add27",
                        "centroid_longitude": "28.0804",
                        "centroid_latitude": "23.2408",
                        "points": "",
                        "state": 1,
                        "name": "Hennepin",
                        "id": 1285
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Wed Jan 31 2018 01:05:50 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Thu Dec 12 2013 13:10:39 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb6d9d9f76699b0ffb",
                        "centroid_longitude": "-144.6889",
                        "centroid_latitude": "35.5656",
                        "points": "",
                        "state": 3,
                        "name": "Dane",
                        "id": 1450
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Nov 17 2012 01:02:12 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sun Jul 22 2012 00:49:42 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebfeeddabf44e5dc6b",
                        "centroid_longitude": "-136.4798",
                        "centroid_latitude": "41.0135",
                        "points": "",
                        "state": 1,
                        "name": "Polk",
                        "id": 1244
                    }
                ],
                "states": [
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sun Jan 29 2017 09:54:26 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue Mar 10 2015 21:33:11 GMT+0000 (UTC)",
                        "abbreviation": "WI",
                        "country": 3,
                        "name": "Michigan",
                        "id": 1443
                    },
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Fri Dec 11 2015 12:40:54 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Wed Jun 27 2012 14:59:50 GMT+0000 (UTC)",
                        "abbreviation": "MN",
                        "country": 5,
                        "name": "Michigan",
                        "id": 1440
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "afirnstahl",
                    "modified_date": "Sun Jun 24 2012 11:03:50 GMT+0000 (UTC)",
                    "created_by": "jpstokdyk",
                    "created_date": "Fri Jul 11 2014 04:22:48 GMT+0000 (UTC)",
                    "priority": 1,
                    "major": true,
                    "confirmed": false,
                    "diagnosis_string": "Schistosomiasis",
                    "diagnosis": 1,
                    "id": 1053
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Wed Jan 27 2016 05:46:50 GMT+0000 (UTC)",
                "created_by": "afirnstahl",
                "created_date": "Thu Jan 12 2017 03:50:48 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "Legal - Case Open",
                "event_status_string": "New Event Record",
                "event_status": 3,
                "epi_staff": "Amparo Savage",
                "affected_count": 22,
                "end_date": "Wed May 06 2015 00:58:55 GMT+0000 (UTC)",
                "start_date": "Wed Oct 18 2017 04:53:53 GMT+0000 (UTC)",
                "complete": true,
                "event_reference": " Dentrex",
                "event_type_string": "Surveillance",
                "event_type": 2,
                "id": 18
            },
            {
                "species": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Sun Apr 30 2017 20:19:08 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Thu Mar 10 2016 18:29:21 GMT+0000 (UTC)",
                        "tsn": 5,
                        "subspecies_latin_name": "consequat",
                        "species_latin_name": "dolor",
                        "genus_name": "est",
                        "sub_family_name": "mollit",
                        "family_name": "ad",
                        "order_name": "qui",
                        "class_name": "enim",
                        "name": "Gopher Frog",
                        "id": 1394
                    }
                ],
                "counties": [
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Wed Oct 26 2016 04:32:43 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Tue Apr 26 2016 19:45:35 GMT+0000 (UTC)",
                        "fips_code": "5abbf4ebd3e8f1c8953cc620",
                        "centroid_longitude": "31.5279",
                        "centroid_latitude": "47.5473",
                        "points": "",
                        "state": 3,
                        "name": "Dane",
                        "id": 1016
                    },
                    {
                        "modified_by": "afirnstahl",
                        "modified_date": "Fri Feb 08 2013 08:43:40 GMT+0000 (UTC)",
                        "created_by": "jpstokdyk",
                        "created_date": "Sun Jan 29 2012 08:56:24 GMT+0000 (UTC)",
                        "fips_code": "5abbf4eb9c690e35a061dafe",
                        "centroid_longitude": "-18.2804",
                        "centroid_latitude": "11.0591",
                        "points": "",
                        "state": 2,
                        "name": "Marathon",
                        "id": 1365
                    }
                ],
                "states": [
                    {
                        "modified_by": "sspencer",
                        "modified_date": "Wed Aug 05 2015 04:09:44 GMT+0000 (UTC)",
                        "created_by": "afirnstahl",
                        "created_date": "Fri Sep 15 2017 14:18:16 GMT+0000 (UTC)",
                        "abbreviation": "MN",
                        "country": 1,
                        "name": "Wisconsin",
                        "id": 1018
                    },
                    {
                        "modified_by": "jpstokdyk",
                        "modified_date": "Sat Oct 08 2016 17:22:20 GMT+0000 (UTC)",
                        "created_by": "sspencer",
                        "created_date": "Sun Feb 23 2014 09:40:03 GMT+0000 (UTC)",
                        "abbreviation": "MI",
                        "country": 3,
                        "name": "Wisconsin",
                        "id": 1214
                    }
                ],
                "event_diagnosis": {
                    "modified_by": "afirnstahl",
                    "modified_date": "Sat Mar 05 2016 17:05:39 GMT+0000 (UTC)",
                    "created_by": "afirnstahl",
                    "created_date": "Mon Sep 03 2012 01:11:51 GMT+0000 (UTC)",
                    "priority": 3,
                    "major": false,
                    "confirmed": true,
                    "diagnosis_string": "Open",
                    "diagnosis": 2,
                    "id": 1102
                },
                "modified_by": "jpstokdyk",
                "modified_date": "Thu Sep 13 2012 05:03:27 GMT+0000 (UTC)",
                "created_by": "afirnstahl",
                "created_date": "Wed Apr 20 2016 03:19:27 GMT+0000 (UTC)",
                "superevent": "",
                "legal_number": null,
                "legal_status": "N/A",
                "event_status_string": "Field and Diagnostics Ongoing",
                "event_status": 4,
                "epi_staff": "Ewing Winters",
                "affected_count": 34,
                "end_date": "Fri Jan 23 2015 14:24:54 GMT+0000 (UTC)",
                "start_date": "Wed Apr 19 2017 01:14:37 GMT+0000 (UTC)",
                "complete": true,
                "event_reference": " Waterbaby",
                "event_type_string": "Morbidity / Mortality",
                "event_type": 1,
                "id": 19
            }
        ];
    }
}

import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

import { DisplayQuery } from '@interfaces/display-query';

import { APP_UTILITIES } from '@app/app.utilities';


@Injectable()
export class APP_SETTINGS {

    private static _environment = 'development';
    // tslint:disable-next-line:max-line-length
    // private static API_ROOT: string = APP_SETTINGS._environment === 'production' ? 'https://whispersbeta.wim.usgs.gov/test/whispersservices/' : 'https://whispersdev.wim.usgs.gov/whispersservices/';

    // default env is development
    public static get API_ROOT() {
        return environment.api_root;
    }

    public static get BANNER_WARNING() {
        return environment.banner_content;
    }

    public static get BANNER_TEXT_COLOR() {
        return environment.banner_text_color;
    }

    public static set environment(env: string) { this._environment = env; }
    public static get API_USERNAME(): string { return 'admin'; }
    public static get API_PASSWORD(): string { return 'whispersadmin'; }

    public static get IS_LOGGEDIN(): boolean { return (!!sessionStorage.getItem('username') && !!sessionStorage.getItem('password')); }

    public static get APP_URL(): string { return 'https://test.wim.usgs.gov/whispersdev'; }

    public static get WHISPERS_METADATA_URL(): string { return 'https://www.usgs.gov/centers/nwhc/science/whispers'; }

    public static get DEFAULT_COUNTRY(): string { return 'USA'; }

    public static get VERSION() {
        return environment.version;
    }

    public static get UNDET_PENDING_DIAGNOSES() {
        return [
            {
                'diagnosis': 469,
                'diagnosis_string': 'Undetermined',
            },
            {
                'diagnosis': 104,
                'diagnosis_string': 'Pending',
            }
        ];
    }

    public static get EVENT_COMPLETE_DIAGNOSIS_UNKNOWN() {
        return {
            'diagnosis': 469,
            'diagnosis_string': 'Undetermined',
        }
    }

    public static get EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN() {
        return {
            'diagnosis': 104,
            'diagnosis_string': 'Pending',
        }
    }

    public static get SPECIAL_COMMENT_TYPES() {
        return [
            {
                'id': 1,
                'name': 'Site Description',
            },
            {
                'id': 2,
                'name': 'History',
            },
            {
                'id': 3,
                'name': 'Environmental factors',
            },
            {
                'id': 4,
                'name': 'Clinical signs',
            },
            {
                'id': 8,
                'name': 'NWHC',
            },
            {
                'id': 11,
                'name': 'Event Group',
            }
        ];
    }

    public static get AUTH_URL(): string { return this.API_ROOT + 'auth/'; }
    public static get EVENTS_URL(): string { return this.API_ROOT + 'events/'; }
    public static get EVENT_DETAILS_URL(): string { return this.API_ROOT + 'eventdetails/'; }
    public static get EVENTS_SUMMARIES_URL(): string { return this.API_ROOT + 'eventsummaries/'; }
    public static get STAFF_URL(): string { return this.API_ROOT + 'staff/'; }
    public static get EVENT_TYPES_URL(): string { return this.API_ROOT + 'eventtypes/'; }
    public static get EVENT_STATUSES_URL(): string { return this.API_ROOT + 'eventstatuses/'; }
    public static get EVENT_ABSTRACTS_URL(): string { return this.API_ROOT + 'eventabstracts/'; }
    public static get EVENT_CASES_URL(): string { return this.API_ROOT + 'eventcases/'; }
    public static get EVENT_LABSITES_URL(): string { return this.API_ROOT + 'eventlabsites/'; }
    public static get EVENT_ORGANIZATIONS_URL(): string { return this.API_ROOT + 'eventorganizations/'; }
    public static get EVENT_CONTACTS_URL(): string { return this.API_ROOT + 'eventcontacts/'; }
    public static get EVENT_LOCATION_CONTACTS_URL(): string { return this.API_ROOT + 'eventlocationcontacts/'; }
    public static get EVENT_LOCATIONS_URL(): string { return this.API_ROOT + 'eventlocations/'; }
    public static get COUNTRIES_URL(): string { return this.API_ROOT + 'countries/'; }
    public static get ADMINISTRATIVE_LEVEL_ONES_URL(): string { return this.API_ROOT + 'administrativelevelones/'; }
    public static get ADMINISTRATIVE_LEVEL_TWOS_URL(): string { return this.API_ROOT + 'administrativeleveltwos/'; }
    public static get LAND_OWNERSHIPS_URL(): string { return this.API_ROOT + 'landownerships/'; }
    public static get LEGAL_STATUS_URL(): string { return this.API_ROOT + 'legalstatuses/'; }
    public static get LOCATION_SPECIES_URL(): string { return this.API_ROOT + 'locationspecies/'; }
    public static get SPECIES_URL(): string { return this.API_ROOT + 'species/'; }
    public static get AGE_BIASES_URL(): string { return this.API_ROOT + 'agebiases/'; }
    public static get SEX_BIASES_URL(): string { return this.API_ROOT + 'sexbiases/'; }
    public static get DIAGNOSES_URL(): string { return this.API_ROOT + 'diagnoses/'; }
    public static get DIAGNOSIS_TYPES_URL(): string { return this.API_ROOT + 'diagnosistypes/'; }
    public static get DIAGNOSIS_BASES_URL(): string { return this.API_ROOT + 'diagnosisbases/'; }
    public static get DIAGNOSIS_CAUSES_URL(): string { return this.API_ROOT + 'diagnosiscauses/'; }
    public static get EVENT_DIAGNOSES_URL(): string { return this.API_ROOT + 'eventdiagnoses/'; }
    public static get LOCATION_SPECIES_DIAGNOSIS_URL(): string { return this.API_ROOT + 'speciesdiagnoses/'; }
    public static get PERMISSIONS_URL(): string { return this.API_ROOT + 'permissions/'; }
    public static get PERMISSION_TYPES_URL(): string { return this.API_ROOT + 'permissionstypes'; }
    public static get FLYWAYS_URL(): string { return this.API_ROOT + 'flyways/'; }
    public static get COMMENTS_URL(): string { return this.API_ROOT + 'comments/'; }
    public static get ARTIFACTS_URL(): string { return this.API_ROOT + 'artifacts/'; }
    public static get USERS_URL(): string { return this.API_ROOT + 'users/'; }
    public static get ROLES_URL(): string { return this.API_ROOT + 'roles/'; }
    public static get ORGANIZATIONS_URL(): string { return this.API_ROOT + 'organizations/'; }
    public static get CONTACTS_URL(): string { return this.API_ROOT + 'contacts/'; }
    public static get CONTACT_TYPES_URL(): string { return this.API_ROOT + 'contacttypes/'; }
    public static get COMMENT_TYPES_URL(): string { return this.API_ROOT + 'commenttypes/'; }
    public static get GROUPS_URL(): string { return this.API_ROOT + 'groups/'; }
    public static get CIRCLES_URL(): string { return this.API_ROOT + 'circles/'; }
    public static get SEARCH_URL(): string { return this.API_ROOT + 'searches/'; }
    public static get SERVICE_REQUEST_URL(): string { return this.API_ROOT + 'servicerequests/'; }
    public static get SERVICE_REQUEST_TYPES_URL(): string { return this.API_ROOT + 'servicerequesttypes/'; }
    public static get SERVICE_REQUEST_RESPONSES_URL(): string { return this.API_ROOT + 'servicerequestresponses/'; }

    public static get EVENT_GROUPS_URL(): string { return this.API_ROOT + 'eventgroups/'; }
    public static get EVENT_EVENT_GROUPS_URL(): string { return this.API_ROOT + 'eventeventgroups/'; }
    public static get EVENT_GROUP_CATEGORIES_URL(): string { return this.API_ROOT + 'eventgroupcategories/'; }

    public static get GO_USA_GOV_SHORTEN_URL(): string { return 'https://go.usa.gov/api/shorten.json'; }
    public static get GO_USA_GOV_USER(): string { return 'bdraper'; }
    public static get GO_USA_GOV_API_KEY(): string { return 'c9f06b2f3be4a9f764a4421df159a2e0'; }


    public static get MIN_JSON_HEADERS() { return new Headers({ 'Accept': 'application/json' }); }
    public static get JSON_HEADERS() { return new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }); }

    // tslint:disable-next-line:max-line-length
    public static get GO_USA_GOV_JSON_HEADERS() { return new Headers({}); }

    // line below is for headers stored in local storage. todo: revisit and implement this
    // public static get AUTH_HEADERS() { return new Headers({ 'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password'))}) }

    /*public static get AUTH_HEADERS() { return new Headers({ 'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD) }); }
    public static get MIN_AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD),
            'Accept': 'application/json'
        }
        );
    }
    public static get AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD),
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }
        );
    }*/

    public static get AUTH_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password)
        });
    }

    public static get MIN_AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    public static get AUTH_JSON_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    public static get HTTP_CLIENT_MIN_AUTH_JSON_HEADERS() {
        return new HttpHeaders({
            'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
            'Accept': 'application/json'
        });
    }

    public static get MIN_AUTH_TEXT_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
            'Content-Type': 'text/plain', 'Accept': 'application/json'
        });
    }

    public static get AUTH_REQUEST_HEADERS() {
        return new Headers({
            'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password)
            // ,'X-Requested-With': 'XMLHttpRequest'
        });
    }

    // default search query for initial load of home page (may eventually come from some other source)
    public static get DEFAULT_SEARCH_QUERY() {
        return {
            'event_type': [],
            'diagnosis': [],
            'diagnosis_type': [],
            'species': [],
            'administrative_level_one': [],
            'administrative_level_two': [],
            'affected_count': null,
            'affected_count_operator': '',
            'start_date': APP_UTILITIES.getDaysPreviousDate,
            'end_date': APP_UTILITIES.getTodayDate,
            'diagnosis_type_includes_all': false,
            'diagnosis_includes_all': false,
            'species_includes_all': false,
            'administrative_level_one_includes_all': false,
            'administrative_level_two_includes_all': false,
            'and_params': [],
            // 'complete': false
        };
    }

    // default display query (display verison of search query above) for initial load of home page
    public static get DEFAULT_DISPLAY_QUERY(): DisplayQuery {
        return {
            'event_type': [],
            'diagnosis': [],
            'diagnosis_type': [],
            'species': [],
            'administrative_level_one': [],
            'administrative_level_two': [],
            'affected_count': null,
            'affected_count_operator': '',
            'start_date': APP_UTILITIES.getDaysPreviousDate,
            'end_date': APP_UTILITIES.getTodayDate,
            'diagnosis_type_includes_all': false,
            'diagnosis_includes_all': false,
            'species_includes_all': false,
            'administrative_level_one_includes_all': false,
            'administrative_level_two_includes_all': false,
            'and_params': [],
            // 'complete': false
        };
    }

}
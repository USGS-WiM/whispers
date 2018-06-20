import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { environment } from 'environments/environment';


@Injectable()
export class APP_SETTINGS {

    private static _environment: string = 'development';
    private static _API_ENDPOINT: string = APP_SETTINGS._environment === 'production' ? 'https://whispersdev.wim.usgs.gov/whispersservices/' : 'https://whispersdev.wim.usgs.gov/whispersservices/';
    public static set environment(env: string) { this._environment = env; }
    public static get API_USERNAME(): string { return 'admin'; }
    public static get API_PASSWORD(): string { return 'whispersadmin'; }

    public static get DEFAULT_COUNTRY(): string { return 'USA'; }

    public static get VERSION() {
        return environment.version;
    }

    public static get AUTH_URL(): string { return this._API_ENDPOINT + 'auth/'; }
    public static get EVENTS_URL(): string { return this._API_ENDPOINT + 'events/'; }
    public static get STAFF_URL(): string { return this._API_ENDPOINT + 'epistaff/'; }
    public static get EVENT_TYPES_URL(): string { return this._API_ENDPOINT + 'eventtypes/'; }
    public static get EVENT_STATUSES_URL(): string { return this._API_ENDPOINT + 'eventstatuses/'; }
    public static get EVENT_ABSTRACTS_URL(): string { return this._API_ENDPOINT + 'eventabstracts/'; }
    public static get EVENT_CASES_URL(): string { return this._API_ENDPOINT + 'eventcases/'; }
    public static get EVENT_LABSITES_URL(): string { return this._API_ENDPOINT + 'eventlabsites/'; }
    public static get EVENT_ORGANIZATIONS_URL(): string { return this._API_ENDPOINT + 'eventorganizations/'; }
    public static get EVENT_CONTACTS_URL(): string { return this._API_ENDPOINT + 'eventcontacts/'; }
    public static get EVENT_LOCATIONS_URL(): string { return this._API_ENDPOINT + 'eventlocations/'; }
    public static get COUNTRIES_URL(): string { return this._API_ENDPOINT + 'countries/'; }
    public static get ADMINISTRATIVE_LEVEL_ONES_URL(): string { return this._API_ENDPOINT + 'administrativelevelones/'; }
    public static get ADMINISTRATIVE_LEVEL_TWOS_URL(): string { return this._API_ENDPOINT + 'administrativeleveltwos/'; }
    public static get LAND_OWNERSHIPS_URL(): string { return this._API_ENDPOINT + 'landownerships/'; }
    public static get LEGAL_STATUS_URL(): string { return this._API_ENDPOINT + 'legalstatuses/'; }
    public static get LOCATION_SPECIES_URL(): string { return this._API_ENDPOINT + 'locationspecies/'; }
    public static get SPECIES_URL(): string { return this._API_ENDPOINT + 'species/'; }
    public static get AGE_BIASES_URL(): string { return this._API_ENDPOINT + 'agebiases/'; }
    public static get SEX_BIASES_URL(): string { return this._API_ENDPOINT + 'sexbiases/'; }
    public static get DIAGNOSES_URL(): string { return this._API_ENDPOINT + 'diagnoses/'; }
    public static get DIAGNOSIS_TYPES_URL(): string { return this._API_ENDPOINT + 'diagnosistypes/'; }
    public static get EVENT_DIAGNOSES_URL(): string { return this._API_ENDPOINT + 'eventdiagnoses/'; }
    public static get SPECIES_DIAGNOSIS_URL(): string { return this._API_ENDPOINT + 'speciesdiagnosis/'; }
    public static get PERMISSIONS_URL(): string { return this._API_ENDPOINT + 'permissions/'; }
    public static get PERMISSION_TYPES_URL(): string { return this._API_ENDPOINT + 'permissionstypes'; }
    public static get COMMENTS_URL(): string { return this._API_ENDPOINT + 'comments/'; }
    public static get ARTIFACTS_URL(): string { return this._API_ENDPOINT + 'artifacts/'; }
    public static get USERS_URL(): string { return this._API_ENDPOINT + 'users/'; }
    public static get ROLES_URL(): string { return this._API_ENDPOINT + 'roles/'; }
    public static get ORGANIZATIONS_URL(): string { return this._API_ENDPOINT + 'organizations/'; }
    public static get CONTACTS_URL(): string { return this._API_ENDPOINT + 'contacts/'; }
    public static get CONTACT_TYPES_URL(): string { return this._API_ENDPOINT + 'contacttypes/'; }
    public static get COMMENT_TYPES_URL(): string { return this._API_ENDPOINT + 'commenttypes/'; }
    public static get GROUPS_URL(): string { return this._API_ENDPOINT + 'groups/'; }


    public static get MIN_JSON_HEADERS() { return new Headers({ 'Accept': 'application/json' }) }
    public static get JSON_HEADERS() { return new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }) }
    // line below is for headers stored in local storage. todo: revisit and implement this
    // public static get AUTH_HEADERS() { return new Headers({ 'Authorization': 'Basic ' + btoa(sessionStorage.getItem('username') + ':' + sessionStorage.getItem('password'))}) }

    public static get AUTH_HEADERS() { return new Headers({ 'Authorization': 'Basic ' + btoa(this.API_USERNAME + ':' + this.API_PASSWORD) }); }
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
    }

}
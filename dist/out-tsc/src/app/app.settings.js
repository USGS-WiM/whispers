"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/common/http");
var environment_1 = require("environments/environment");
var app_utilities_1 = require("@app/app.utilities");
var APP_SETTINGS = /** @class */ (function () {
    function APP_SETTINGS() {
    }
    Object.defineProperty(APP_SETTINGS, "API_ROOT", {
        // tslint:disable-next-line:max-line-length
        // private static API_ROOT: string = APP_SETTINGS._environment === 'production' ? 'https://whispersbeta.wim.usgs.gov/test/whispersservices/' : 'https://whispersdev.wim.usgs.gov/whispersservices/';
        // default env is development
        get: function () {
            return environment_1.environment.api_root;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "environment", {
        // public static get BANNER_WARNING() {
        //     return environment.banner_content;
        // }
        // public static get BANNER_TEXT_COLOR() {
        //     return environment.banner_text_color;
        // }
        set: function (env) { this._environment = env; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "API_USERNAME", {
        get: function () { return 'admin'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "API_PASSWORD", {
        get: function () { return 'whispersadmin'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "IS_LOGGEDIN", {
        get: function () { return (!!sessionStorage.getItem('username') && !!sessionStorage.getItem('password')); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "APP_URL", {
        get: function () { return 'https://test.wim.usgs.gov/whispersdev'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "WHISPERS_METADATA_URL", {
        get: function () { return 'https://www.usgs.gov/centers/nwhc/science/whispers'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "DEFAULT_COUNTRY", {
        get: function () { return 'USA'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "VERSION", {
        get: function () {
            return environment_1.environment.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "UNDET_PENDING_DIAGNOSES", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_COMPLETE_DIAGNOSIS_UNKNOWN", {
        get: function () {
            return {
                'diagnosis': 469,
                'diagnosis_string': 'Undetermined',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_INCOMPLETE_DIAGNOSIS_UNKNOWN", {
        get: function () {
            return {
                'diagnosis': 104,
                'diagnosis_string': 'Pending',
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "SPECIAL_COMMENT_TYPES", {
        get: function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "AUTH_URL", {
        get: function () { return this.API_ROOT + 'auth/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENTS_URL", {
        get: function () { return this.API_ROOT + 'events/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_DETAILS_URL", {
        get: function () { return this.API_ROOT + 'eventdetails/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENTS_SUMMARIES_URL", {
        get: function () { return this.API_ROOT + 'eventsummaries/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "STAFF_URL", {
        get: function () { return this.API_ROOT + 'staff/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_TYPES_URL", {
        get: function () { return this.API_ROOT + 'eventtypes/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_STATUSES_URL", {
        get: function () { return this.API_ROOT + 'eventstatuses/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_ABSTRACTS_URL", {
        get: function () { return this.API_ROOT + 'eventabstracts/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_CASES_URL", {
        get: function () { return this.API_ROOT + 'eventcases/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_LABSITES_URL", {
        get: function () { return this.API_ROOT + 'eventlabsites/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_ORGANIZATIONS_URL", {
        get: function () { return this.API_ROOT + 'eventorganizations/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_CONTACTS_URL", {
        get: function () { return this.API_ROOT + 'eventcontacts/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_LOCATION_CONTACTS_URL", {
        get: function () { return this.API_ROOT + 'eventlocationcontacts/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_LOCATIONS_URL", {
        get: function () { return this.API_ROOT + 'eventlocations/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "COUNTRIES_URL", {
        get: function () { return this.API_ROOT + 'countries/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "ADMINISTRATIVE_LEVEL_ONES_URL", {
        get: function () { return this.API_ROOT + 'administrativelevelones/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "ADMINISTRATIVE_LEVEL_TWOS_URL", {
        get: function () { return this.API_ROOT + 'administrativeleveltwos/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "LAND_OWNERSHIPS_URL", {
        get: function () { return this.API_ROOT + 'landownerships/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "LEGAL_STATUS_URL", {
        get: function () { return this.API_ROOT + 'legalstatuses/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "LOCATION_SPECIES_URL", {
        get: function () { return this.API_ROOT + 'locationspecies/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "SPECIES_URL", {
        get: function () { return this.API_ROOT + 'species/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "AGE_BIASES_URL", {
        get: function () { return this.API_ROOT + 'agebiases/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "SEX_BIASES_URL", {
        get: function () { return this.API_ROOT + 'sexbiases/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "DIAGNOSES_URL", {
        get: function () { return this.API_ROOT + 'diagnoses/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "DIAGNOSIS_TYPES_URL", {
        get: function () { return this.API_ROOT + 'diagnosistypes/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "DIAGNOSIS_BASES_URL", {
        get: function () { return this.API_ROOT + 'diagnosisbases/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "DIAGNOSIS_CAUSES_URL", {
        get: function () { return this.API_ROOT + 'diagnosiscauses/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_DIAGNOSES_URL", {
        get: function () { return this.API_ROOT + 'eventdiagnoses/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "LOCATION_SPECIES_DIAGNOSIS_URL", {
        get: function () { return this.API_ROOT + 'speciesdiagnoses/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "PERMISSIONS_URL", {
        get: function () { return this.API_ROOT + 'permissions/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "PERMISSION_TYPES_URL", {
        get: function () { return this.API_ROOT + 'permissionstypes'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "FLYWAYS_URL", {
        get: function () { return this.API_ROOT + 'flyways/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "COMMENTS_URL", {
        get: function () { return this.API_ROOT + 'comments/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "ARTIFACTS_URL", {
        get: function () { return this.API_ROOT + 'artifacts/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "USERS_URL", {
        get: function () { return this.API_ROOT + 'users/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "ROLES_URL", {
        get: function () { return this.API_ROOT + 'roles/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "ORGANIZATIONS_URL", {
        get: function () { return this.API_ROOT + 'organizations/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "CONTACTS_URL", {
        get: function () { return this.API_ROOT + 'contacts/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "CONTACT_TYPES_URL", {
        get: function () { return this.API_ROOT + 'contacttypes/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "COMMENT_TYPES_URL", {
        get: function () { return this.API_ROOT + 'commenttypes/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "GROUPS_URL", {
        get: function () { return this.API_ROOT + 'groups/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "CIRCLES_URL", {
        get: function () { return this.API_ROOT + 'circles/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "SEARCH_URL", {
        get: function () { return this.API_ROOT + 'searches/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "SERVICE_REQUEST_URL", {
        get: function () { return this.API_ROOT + 'servicerequests/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "SERVICE_REQUEST_TYPES_URL", {
        get: function () { return this.API_ROOT + 'servicerequesttypes/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "SERVICE_REQUEST_RESPONSES_URL", {
        get: function () { return this.API_ROOT + 'servicerequestresponses/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_GROUPS_URL", {
        get: function () { return this.API_ROOT + 'eventgroups/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_EVENT_GROUPS_URL", {
        get: function () { return this.API_ROOT + 'eventeventgroups/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "EVENT_GROUP_CATEGORIES_URL", {
        get: function () { return this.API_ROOT + 'eventgroupcategories/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "NOTIFICATIONS_URL", {
        get: function () { return this.API_ROOT + 'notifications/'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "GO_USA_GOV_SHORTEN_URL", {
        get: function () { return 'https://go.usa.gov/api/shorten.json'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "GO_USA_GOV_USER", {
        get: function () { return 'bdraper'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "GO_USA_GOV_API_KEY", {
        get: function () { return 'c9f06b2f3be4a9f764a4421df159a2e0'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "MIN_JSON_HEADERS", {
        get: function () { return new http_1.Headers({ 'Accept': 'application/json' }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "JSON_HEADERS", {
        get: function () { return new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' }); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "GO_USA_GOV_JSON_HEADERS", {
        // tslint:disable-next-line:max-line-length
        get: function () { return new http_1.Headers({}); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "AUTH_HEADERS", {
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
        get: function () {
            return new http_1.Headers({
                'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password)
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "MIN_AUTH_JSON_HEADERS", {
        get: function () {
            return new http_1.Headers({
                'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "AUTH_JSON_HEADERS", {
        get: function () {
            return new http_1.Headers({
                'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "HTTP_CLIENT_MIN_AUTH_JSON_HEADERS", {
        get: function () {
            return new http_2.HttpHeaders({
                'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
                'Accept': 'application/json'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "MIN_AUTH_TEXT_HEADERS", {
        get: function () {
            return new http_1.Headers({
                'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
                'Content-Type': 'text/plain',
                'Accept': 'application/json'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "HTTP_CLIENT_MIN_AUTH_TEXT_HEADERS", {
        get: function () {
            return new http_2.HttpHeaders({
                'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password),
                'Content-Type': 'text/plain',
                'Accept': 'application/json'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "AUTH_REQUEST_HEADERS", {
        get: function () {
            return new http_1.Headers({
                'Authorization': 'Basic ' + btoa(sessionStorage.username + ':' + sessionStorage.password)
                // ,'X-Requested-With': 'XMLHttpRequest'
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "DEFAULT_SEARCH_QUERY", {
        // default search query for initial load of home page (may eventually come from some other source)
        get: function () {
            return {
                'event_type': [],
                'diagnosis': [],
                'diagnosis_type': [],
                'species': [],
                'administrative_level_one': [],
                'administrative_level_two': [],
                'affected_count': null,
                'affected_count_operator': '',
                'start_date': app_utilities_1.APP_UTILITIES.getDaysPreviousDate,
                'end_date': app_utilities_1.APP_UTILITIES.getTodayDate,
                'diagnosis_type_includes_all': false,
                'diagnosis_includes_all': false,
                'species_includes_all': false,
                'administrative_level_one_includes_all': false,
                'administrative_level_two_includes_all': false,
                'and_params': [],
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(APP_SETTINGS, "DEFAULT_DISPLAY_QUERY", {
        // default display query (display verison of search query above) for initial load of home page
        get: function () {
            return {
                'event_type': [],
                'diagnosis': [],
                'diagnosis_type': [],
                'species': [],
                'administrative_level_one': [],
                'administrative_level_two': [],
                'affected_count': null,
                'affected_count_operator': '',
                'start_date': app_utilities_1.APP_UTILITIES.getDaysPreviousDate,
                'end_date': app_utilities_1.APP_UTILITIES.getTodayDate,
                'diagnosis_type_includes_all': false,
                'diagnosis_includes_all': false,
                'species_includes_all': false,
                'administrative_level_one_includes_all': false,
                'administrative_level_two_includes_all': false,
                'and_params': [],
            };
        },
        enumerable: true,
        configurable: true
    });
    APP_SETTINGS._environment = 'development';
    APP_SETTINGS = __decorate([
        core_1.Injectable()
    ], APP_SETTINGS);
    return APP_SETTINGS;
}());
exports.APP_SETTINGS = APP_SETTINGS;
//# sourceMappingURL=app.settings.js.map
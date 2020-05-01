import { Injectable } from '@angular/core';
import { SearchQuery } from '@app/interfaces/search-query';
import { DisplayQuery } from '@interfaces/display-query';

import { APP_SETTINGS } from '@app/app.settings';

export interface Notification {
    id: number;
    user: string;
    source: string;
    event: number;
    read: boolean;
    link: string;
    message: string;
    created_date: string;
    created_by: string;
    modified_date: string;
    modified_by: string;
}

@Injectable()
export class APP_UTILITIES {

    public static get TODAY(): any {
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        const t = new Date(new Date().toDateString());
        return t;
    }

    // converts date string for use in date pickers (compensates for UTC)
    public static timeZoneAdjust(dateString): any {
        const dateStringMidnight = dateString + 'T00:00:00';
        const convertedDate = new Date(dateStringMidnight);
        return convertedDate;
    }

    // e.g. 2020-01-01
    public static get getTodayDate(): any {
        let today_string = '';
        const today = new Date();
        const dd = today.getDate();
        let dd_string = '';
        const mm = today.getMonth() + 1; // January is 0!
        let mm_string = '';
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd_string = '0' + dd;
        } else {
            dd_string = dd.toString();
        }

        if (mm < 10) {
            mm_string = '0' + mm;
        } else {
            mm_string = mm.toString();
        }
        today_string = yyyy + '-' + mm_string + '-' + dd_string;
        return today_string;
    }

    // e.g. 01/01/2020 12:00 AM
    public static get getDateTime(): any {
        let today_string = '';
        const today = new Date();
        const dd = today.getDate();
        let dd_string = '';
        const mm = today.getMonth() + 1; // January is 0!
        let mm_string = '';
        const yyyy = today.getFullYear();
        let hr = today.getHours();
        let hr_string = '';
        const min = today.getMinutes();
        let min_string = '';

        const ampm = hr >= 12 ? 'PM' : 'AM';

        // the hour '0' should be '12'
        if (hr === 0) {
            hr_string = '12';
        } else {
            hr = hr % 12; // using mod 12 to calculate time for 12hr clock
            hr_string = hr.toString();
        }

        // adding zero if necessary
        if (min < 10) {
            min_string = '0' + min;
        } else {
            min_string = min.toString();
        }

        // adding zero if necessary
        if (dd < 10) {
            dd_string = '0' + dd;
        } else {
            dd_string = dd.toString();
        }

        // adding zero if necessary
        if (mm < 10) {
            mm_string = '0' + mm;
        } else {
            mm_string = mm.toString();
        }
        // formatting the date
        today_string = mm_string + '/' + dd_string + '/' + yyyy + ' ' + hr_string + ':' + min_string + ' ' + ampm;
        return today_string;
    }

    // e.g. Jan 01, 2020 12:00 AM
    public static get getReportDateTime(): any {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let today_string = '';
        const today = new Date();
        const dd = today.getDate();
        let dd_string = '';
        const mm = today.getMonth() + 1; // January is 0!
        let mm_string = '';
        const yyyy = today.getFullYear();
        let hr = today.getHours();
        let hr_string = '';
        const min = today.getMinutes();
        let min_string = '';

        const ampm = hr >= 12 ? 'PM' : 'AM';

        // the hour '0' should be '12'
        if (hr === 0) {
            hr_string = '12';
        } else {
            hr = hr % 12; // using mod 12 to calculate time for 12hr clock
            hr_string = hr.toString();
        }

        // adding zero if necessary
        if (min < 10) {
            min_string = '0' + min;
        } else {
            min_string = min.toString();
        }

        // adding zero if necessary
        if (dd < 10) {
            dd_string = '0' + dd;
        } else {
            dd_string = dd.toString();
        }

        // adding zero if necessary
        if (mm < 10) {
            mm_string = '0' + mm;
        } else {
            mm_string = mm.toString();
        }

        // formatting the date
        today_string = monthNames[today.getMonth()] + ' ' + dd_string + ', ' + yyyy + ' ' + hr_string + ':' + min_string + ' ' + ampm;
        return today_string;
    }

    // e.g. 20200101
    public static get getFileNameDate() {
        let today_string = '';
        const today = new Date();
        const dd = today.getDate();
        let dd_string = '';
        const mm = today.getMonth() + 1; // January is 0!
        let mm_string = '';
        const yyyy = today.getFullYear();

        if (dd < 10) {
            dd_string = '0' + dd;
        } else {
            dd_string = dd.toString();
        }

        if (mm < 10) {
            mm_string = '0' + mm;
        } else {
            mm_string = mm.toString();
        }
        today_string = yyyy + mm_string  + dd_string;
        return today_string;
    }

    public static formatEventDates(date): any {

        let date_string;
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        let input_date = date;

        // getting date elements
        const d = input_date.substr(8, 2);
        let m = input_date.substr(5, 2);
        const y = input_date.substr(0, 4);

        m = Number(m);
        m = m - 1;

        input_date = new Date(y, m, d);

        date_string = monthNames[m] + ' ' + d + ', ' + y;
        return date_string;
    }

    public static get getDaysPreviousDate(): any {
        const daysPrevious = 28;
        let previousDate_string = '';
        const previousDate = new Date();
        previousDate.setDate(previousDate.getDate() - daysPrevious);
        const dd = previousDate.getDate();
        let dd_string = '';
        const mm = previousDate.getMonth() + 1; // January is 0!
        let mm_string = '';
        const yyyy = previousDate.getFullYear();

        if (dd < 10) {
            dd_string = '0' + dd;
        } else {
            dd_string = dd.toString();
        }

        if (mm < 10) {
            mm_string = '0' + mm;
        } else {
            mm_string = mm.toString();
        }
        previousDate_string = yyyy + '-' + mm_string + '-' + dd_string;
        return previousDate_string;
    }

    public static get TIME(): string { return new Date().toISOString().substr(14, 22); }

    public static get DEFAULT_COUNTRY_ID(): string {

        // TODO: improve this function to actually lookup the default country id
        // using the default country abbreviation string from APP_SETTINGS.
        // doing this quick and dirty to make quick progress now.
        return '30';
    }

    public static checkDuplicateInObject(propertyName, inputArray): boolean {
        let seenDuplicate = false;
        const testObject = {};

        inputArray.map(function (item) {
            const itemPropertyName = item[propertyName];
            if (itemPropertyName in testObject) {
                testObject[itemPropertyName].duplicate = true;
                item.duplicate = true;
                seenDuplicate = true;
            } else {
                testObject[itemPropertyName] = item;
                delete item.duplicate;
            }
        });
        return seenDuplicate;
    }

    public static parseSearch(search): any {

        const parsedSearch: SearchQuery = {
            id: null,
            name: '',
            event_type: null,
            diagnosis: null,
            diagnosis_type: null,
            species: null,
            administrative_level_one: null,
            administrative_level_two: null,
            affected_count: null,
            affected_count_operator: '',
            start_date: '',
            end_date: '',
            diagnosis_type_includes_all: false,
            diagnosis_includes_all: false,
            species_includes_all: false,
            administrative_level_one_includes_all: false,
            administrative_level_two_includes_all: false,
            and_params: [],
            complete: null
        };

        parsedSearch.id = search.id;
        parsedSearch.name = search.name;

        if (search.data.start_date) {
            parsedSearch.start_date = search.data.start_date;
        }
        if (search.data.end_date) {
            parsedSearch.end_date = search.data.end_date;
        }
        if (search.data.affected_count) {
            parsedSearch.affected_count = search.data.affected_count;
        }
        if (search.data.complete) {
            parsedSearch.complete = search.data.complete;
        }
        if (search.data.affected_count_operator) {
            parsedSearch.affected_count_operator = search.data.affected_count_operator;
        }
        if (search.data.event_type) {
            parsedSearch.event_type = JSON.parse('[' + search.data.event_type + ']');
        }
        if (search.data.diagnosis_type) {
            parsedSearch.diagnosis_type = JSON.parse('[' + search.data.diagnosis_type + ']');
        }
        if (search.data.diagnosis) {
            parsedSearch.diagnosis = JSON.parse('[' + search.data.diagnosis + ']');
        }
        if (search.data.species) {
            parsedSearch.species = JSON.parse('[' + search.data.species + ']');
        }
        if (search.data.administrative_level_one) {
            parsedSearch.administrative_level_one = JSON.parse('[' + search.data.administrative_level_one + ']');
        }
        if (search.data.administrative_level_two) {
            parsedSearch.administrative_level_two = JSON.parse('[' + search.data.administrative_level_two + ']');
        }

        if (search.data.and_params) {
            if (search.data.and_params.includes('diagnosis_type')) {
                parsedSearch.diagnosis_type_includes_all = true;
            }
            if (search.data.and_params.includes('diagnosis')) {
                parsedSearch.diagnosis_includes_all = true;
            }
            if (search.data.and_params.includes('species')) {
                parsedSearch.species_includes_all = true;
            }
            if (search.data.and_params.includes('administrative_level_one')) {
                parsedSearch.administrative_level_one_includes_all = true;
            }
            if (search.data.and_params.includes('administrative_level_two')) {
                parsedSearch.administrative_level_two_includes_all = true;
            }
        }
        return parsedSearch;
    }
}

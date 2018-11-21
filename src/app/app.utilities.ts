import { Injectable } from '@angular/core';
import { SearchQuery } from '@app/interfaces/search-query';

import { APP_SETTINGS } from '@app/app.settings';

@Injectable()
export class APP_UTILITIES {

    public static get TODAY(): any { 
        const now = new Date();
        const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() ));
        const t = new Date(new Date().toDateString());
        return t;

    }

    public static get getTodayDate(): any {
        var today_string = "";
        var today = new Date();
        var dd = today.getDate();
        var dd_string = "";
        var mm = today.getMonth()+1; //January is 0!
        var mm_string = "";
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd_string='0'+dd;
        } else {
            dd_string=dd.toString();
        }

        if(mm<10) {
            mm_string='0'+mm
        } else { 
            mm_string=mm.toString();
        }

        today_string = yyyy+'-'+mm_string+'-'+dd_string;

        return today_string;
    }

    public static get getDaysPreviousDate(): any {
        var daysPrevious = 28;
        var previousDate_string = "";
        var previousDate = new Date();
        previousDate.setDate(previousDate.getDate() - daysPrevious);
        var dd = previousDate.getDate();
        var dd_string = "";
        var mm = previousDate.getMonth()+1; //January is 0!
        var mm_string = "";
        var yyyy = previousDate.getFullYear();

        if(dd<10) {
            dd_string='0'+dd;
        } else {
            dd_string=dd.toString();
        }

        if(mm<10) {
            mm_string='0'+mm
        } else { 
            mm_string=mm.toString();
        }

        previousDate_string = yyyy+'-'+mm_string+'-'+dd_string;

        return previousDate_string;
    }

    public static get TIME(): string { return new Date().toISOString().substr(14, 22); }

    public static get DEFAULT_COUNTRY_ID(): string {

        // TODO: improve this function to actually lookup the default country id 
        // using the default country abbreviation string from APP_SETTINGS.
        // doing this quick and dirty to make quick progress now.
        return '30';
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
            complete: false
        };

        parsedSearch.id = search.id;
        parsedSearch.name = search.name;


        // TODO: may need to add logic for adding complete to the search
        if (search.data.start_date) {
            parsedSearch.start_date =  search.data.start_date;
        }
        if (search.data.end_date) {
            parsedSearch.end_date = search.data.end_date;
        }
        if (search.data.affected_count) {
            parsedSearch.affected_count = search.data.affected_count;
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

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FIELD_HELP_TEXT = /** @class */ (function () {
    function FIELD_HELP_TEXT() {
    }
    Object.defineProperty(FIELD_HELP_TEXT, "userEventRefTooltip", {
        // Tooltip config template:
        // public static get Tooltip(): string { return ''; }
        // The characters \n\n can be used to add a breakline to the tooltip
        // EVENT DETAILS & OTHER INFO
        get: function () { return 'User-designated name or number for an event.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventVisibilityTooltip", {
        get: function () { return 'Indicates whether event is visible to the public or not. \n\n See metadata for details.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editEventVisibilityTooltip", {
        get: function () { return 'Indicates whether event is visible to the public or not.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "contactOrganizationTooltip", {
        get: function () { return 'Organization(s) to display to general public for them to contact regarding general inquiries about the event. \n\n If correct organization is not in dropdown, request a new option via the dashboard.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editContactOrganizationTooltip", {
        get: function () { return 'Organization(s) to contact regarding general inquiries about the event.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventTypeTooltip", {
        get: function () { return 'Mortality/Morbidity: Noteworthy occurrence of one or more sick or dead animals clustered in space and time. \n\n  Surveillance: Positive detections of a pathogen during active surveillance of healthy live animals. \n\n If both (e.g., went to cave to swab live bats and also found dead bats), create two separate events. \n\n See metadata for details.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editEventTypeTooltip", {
        get: function () { return 'Mortality/Morbidity: Noteworthy occurrence of one or more sick or dead animals clustered in space and time. \n\n  Surveillance: Positive detections of a pathogen during active surveillance of healthy live animals.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "recordStatusTooltip", {
        get: function () { return '"Complete" if 1.) the event has ended,  2.) diagnostic tests are finalized, and  3.) all information is updated in WHISPers. Otherwise, "Incomplete". \n  See metadata for details.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editRecordStatusTooltip", {
        get: function () { return '"Complete" if 1.) the event has ended,  2.) diagnostic tests are finalized, and  3.) all information is updated in WHISPers. Otherwise, "Incomplete".'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventIDTooltip", {
        get: function () { return 'System-generated unique identifier for an event.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventStartDateTooltip", {
        get: function () { return 'Beginning date of the event (considering all locations).'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventEndDateTooltip", {
        get: function () { return 'Ending date of the event (considering all locations).'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "numberAffectedTooltip", {
        get: function () { return 'Total number affected in event. A count of sick plus dead animals for a morbidity/mortality event and a count of positives for a surveillance event.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "flywayTooltip", {
        get: function () { return 'United States Fish and Wildlife Service administrative Flyway at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "nwhcCarcassSubApprovalTooltip", {
        get: function () { return 'For USGS National Wildlife Health Center (NWHC) to fill out after a diagnostic service request has been received. \n\nOptions are: "Yes" - service request has been approved; "No" - service request has not been approved; "Maybe" - service request might be approved but NWHC needs more information via comments.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "permissionSourceTooltip", {
        get: function () { return 'Your connection to this event. \n\n Options are: "user" - you created this event; "organization" - someone in your organization created this event; "collaborator" - you were invited to be a read or write collaborator on this event. If blank, then someone outside of your organization created this event and you have not been invited to be a collaborator.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "associatedEventsTooltip", {
        get: function () { return 'Events that are biologically equivalent and were grouped together by wildlife disease specialists at the USGS National Wildlife Health Center.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "commentSourceTooltip", {
        get: function () { return 'Comment timeline is a compilation of comments entered in various sections of the event record; the source identifies from where the comment originated.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "locationsTooltip", {
        // WIM wrote locationsTooltip (not in hover text spreadsheet)
        get: function () { return 'Displayed as County (or equivalent), State (or equivalent), Country - where values are available'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "locationStartDateTooltip", {
        // END EVENT INFO
        // EVENT LOCATION
        get: function () { return 'Estimated beginning date of the event at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "locationEndDateTooltip", {
        get: function () { return 'Estimated ending date of the event at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "locationNameTooltip", {
        get: function () { return 'Describes location within a county (e.g., town or lake name) that represents a distinct spatial cluster of animal observations. \n\n  Can use GNIS standardized location name instead of, or in addition to, this free text name. \n\n  See metadata for details.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editLocationNameTooltip", {
        get: function () { return 'Describes location within a county (e.g., town or lake name) that represents a distinct spatial cluster of animal observations. \n\n  Can use GNIS standardized location name instead of, or in addition to, this free text name.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "standardizedLocationNameTooltip", {
        get: function () { return 'Standardized location names (e.g., National Wildlife Refuge system names) based on the Geographic Names Information System (GNIS).  \n\n  Note: the GNIS search tool looks up names starting with the first letter. \n\n  Can use free text location name instead of, or in addition to this GNIS standardized location name. \n\n  See metadata for details.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editStandardizedLocationNameTooltip", {
        get: function () { return 'Standardized location names (e.g., National Wildlife Refuge system names) based on the Geographic Names Information System (GNIS).  \n\n  Note: the GNIS search tool looks up names starting with the first letter. \n\n  Can use free text location name instead of, or in addition to this GNIS standardized location name.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "countryTooltip", {
        get: function () { return 'Country of location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "stateTooltip", {
        get: function () { return 'State of location (or equivalent, such as provinces or territories in Canada).'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "countyTooltip", {
        get: function () { return 'County of location (or equivalent, such as parish or borough in the United States). \n\n If event encompasses multiple counties, create separate locations for each.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editCountyTooltip", {
        get: function () { return 'County of location (or equivalent, such as parish or borough in the United States).'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "landOwnershipTooltip", {
        get: function () { return 'Entity that owns the land at this location. \n\n Options are: "Federal/National" - owned by the federal or national government of a country; "State/Province" - owned by the state or equivalent; "County or equivalent" - owned by the county or equivalent; "Municipal" - owned by a local entity such as a city or township; "Tribal/Native Peoples" - tribal land or land held by native peoples; "Private" - private property; "Other" - a type of land ownership not covered by the other options in the drop down list for this field; "Unknown" - the ownership of the land is unknown.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editLandOwnershipTooltip", {
        get: function () { return 'Entity that owns the land at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "latitudeTooltip", {
        get: function () { return 'Latitude of location in decimal degrees WGS84.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "longitudeTooltip", {
        get: function () { return 'Longitude of location in decimal degrees WGS84. \n\n Note: use negative sign for locations in North America.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "speciesTooltip", {
        get: function () { return 'Species affected at this location. \n\n Can select "unidentified" categories of animals. \n\n If correct species is not in dropdown, request a new option via the dashboard.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editSpeciesTooltip", {
        get: function () { return 'Species affected at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "generalTableSpeciesTooltip", {
        get: function () { return 'Species affected in event.'; } // displayed on home/events tab in dashboard/your events tab in dashboard
        ,
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "populationTooltip", {
        get: function () { return 'Estimate of the maximum number of this species at this location, including live, sick, and dead.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "ageBiasTooltip", {
        get: function () { return 'Age bias in the species affected at this location. \n\n Options are: "No noticeable bias" - age bias was assessed but no bias detected; "Unknown" - age bias not assessed; "Mostly young" - most animals affected were young; "Mostly adults" - most animals affected were adults.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editAgeBiasTooltip", {
        get: function () { return 'Age bias in the species affected at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "sexBiasTooltip", {
        get: function () { return 'Sex bias in the species affected at this location. \n\n Options are: "No noticeable bias" - sex bias was assessed but no bias detected; "Unknown" - sex bias not assessed; "Mostly Male" - most animals affected were male; "Mostly Female" - most animals affected were female.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editSexBiasTooltip", {
        get: function () { return 'Sex bias in the species affected at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "captiveTooltip", {
        get: function () { return 'Describes if species affected at this location are captive or not. \n\n Options are: "Wild and/or free-ranging" or "Captive >72 hours". Include zoo animals, domestic animals, and wildlife that have been in rehabilitation for >72 hours as captive.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editCaptiveTooltip", {
        get: function () { return 'Describes if species affected at this location are captive or not.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "knownDeadTooltip", {
        get: function () { return 'Exact minimum count of the cumulative number of dead animals (not including euthanized) at this location over the length of the event. \n\n Include euthanized with sick. If 0 observed, enter 0. \n\n See metadata for details.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editKnownDeadTooltip", {
        get: function () { return 'Exact minimum count of the cumulative number of dead animals (not including euthanized) at this location over the length of the event.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "estimatedDeadTooltip", {
        get: function () { return 'Best guess of the maximum number of animals that died (include any known dead animals) at this location over the length of the event. \n\n Include euthanized with sick. \n\n See metadata for details'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editEstimatedDeadTooltip", {
        get: function () { return 'Best guess of the maximum number of animals that died (include any known dead animals) at this location over the length of the event.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "knownSickTooltip", {
        get: function () { return 'Exact minimum count of animals exhibiting clinical signs of illness at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured. \n\n Include euthanized with sick. If 0 observed, enter 0.\n\n See metadata for details.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editKnownSickTooltip", {
        get: function () { return 'Exact minimum count of animals exhibiting clinical signs of illness at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "estimatedSickTooltip", {
        get: function () { return 'Best guess of the maximum number of animals that might be showing clinical signs (include any known sick animals) at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured. \n\n Include euthanized with sick. \n\n See metadata for details.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editEstimatedSickTooltip", {
        get: function () { return 'Best guess of the maximum number of animals that might be showing clinical signs (include any known sick animals) at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "locationCommentTooltip", {
        get: function () { return 'Observations of landscape and animals at this location to aid interpretation of data and to potentially guide cause of death determination and management actions.\n\n Text in at least one of the main comment categories is required. "Additional Comment" text is optional.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editLocationCommentTooltip", {
        get: function () { return 'Observations or communications relevant to this location that aid interpretation of the data.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "locationCommentTypeTooltip", {
        get: function () { return 'Flags comment as belonging to a certain category. \n\n See metadata for details on options.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "contactPersonTooltip", {
        get: function () { return 'People from organization\'s address book to potentially contact throughout the course of this event because they might have relevant information about this location.\n\n Select from previously entered contact ("Add Contact") or enter a new person into address book ("Create New Contact").'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "contactTypeTooltip", {
        get: function () { return 'Contact person\'s role at this location. \n\n Options are: "Field" - this person might have information about what is going on in the field; "Diagnosis" - this person might have information about the diagnostics; "Media" - this person is a media/news/outreach professional; "Private" - this person is not affiliated with an agency (e.g., private citizen).'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventDiagnosisTooltip", {
        // END EVENT LOCATION
        // EVENT DIAGNOSIS
        get: function () { return 'The overall main reason(s) for illness and/or death across all locations and species and thus the major cause(s) of the event, or a diagnosis deemed significant enough to list at the event level for situational awareness. \n\n Options presented are those diagnoses entered at the species level. \n\n If nothing else selected for event diagnosis by user, defaults to "Pending" for "Incomplete" events or "Undetermined" for "Complete" events.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editEventDiagnosisTooltip", {
        get: function () { return 'The overall main reason(s) for illness and/or death across all locations and species and thus the major cause(s) of the event, or a diagnosis deemed significant enough to list at the event level for situational awareness.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventCommentTooltip", {
        // END EVENT DIAGNOSIS
        // EVENT COMMENT
        get: function () { return 'Observations or communications relevant to the entire event that aid interpretation of the data.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventCommentTypeTooltip", {
        get: function () { return 'Flags comment as belonging to a certain category. \n\n Options are: "Field Update" - observation from the field as the event is ongoing; "Management" - disease management actions considered or performed; "Epidemiological" - epidemiological context or patterns; "Diagnostic" - laboratory diagnostic updates; "Other" - any other comments that do not fit within one of the other categories in this list.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "serviceRequestFullTooltip", {
        // END EVENT COMMENT
        // SERVICE REQUEST - There is the full text and then broken out options
        get: function () { return 'Options are: "No services needed at this time" - user wants to enter an event but does not need consultative or diagnostic services from USGS National Wildlife Health Center (NWHC); "Request diagnostic and consultative services" - user has specimens that they want to submit to NWHC for diagnostic evaluation; "Request consultative services ONLY" - user does not have specimens to submit to NWHC but would like advice on disease management, personal protective gear, etc.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "serviceRequestNoServicesTooltip", {
        get: function () { return 'User wants to enter an event but does not need consultative or diagnostic services from USGS National Wildlife Health Center (NWHC)'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "serviceRequestRequestDiaAndConsultTooltip", {
        get: function () { return 'User has specimens that they want to submit to NWHC for diagnostic evaluation'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "serviceRequestRequestDiaServicesOnlyTooltip", {
        get: function () { return 'User does not have specimens to submit to NWHC but would like advice on disease management, personal protective gear, etc.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "serviceRequestCommentTooltip", {
        get: function () { return 'User and USGS National Wildlife Health Center provide comments related to diagnostic and/or consultative service request.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "collaboratorsAddIndividualTooltip", {
        // END SERVICE REQUEST
        // COLLABORATORS
        get: function () { return 'Natural Resource Management Professionals to collaborate with on this event. \n\n Individuals users can be invited to have "read only access" or "read and write access." \n\n Select from previously entered contact ("Get Email Address from Contacts") or enter an email as free text to search for a WHISPers user. If email address is not associated with an authorized WHISPers user account, potential collaborator must create WHISPers login before they can collaborate.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "collaboratorsAddCircleTooltip", {
        get: function () { return 'Predefined group of Natural Resource Management Professionals to collaborate with on this event. \n\n User circles can be invited to have "read only access" or "read and write access." \n\n Options are based on individuals grouped into circles via the "Circles" tab in the dashboard.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "speciesDiagnosisTooltip", {
        // END COLLABORATORS
        // SPECIES DIAGNOSIS
        get: function () { return 'To determine what diagnoses to provide in WHISPers for situational awareness, consider the following criteria: 1.) Diagnosis has been determined by a wildlife professional to be an ultimate (or underlying) cause of death or morbidity in at least one specimen examined from this location  2.) Any reportable disease listed by OIE or USDA  3.) those diagnoses deemed significant by the user or organization. \n\n Can select "Undetermined" if assessed and no diagnosis determined, or can leave blank. \n\n If correct diagnosis is not in dropdown, request a new option via the dashboard.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editSpeciesDiagnosisTooltip", {
        get: function () { return '1.) Diagnosis has been determined by a wildlife professional to be an ultimate (or underlying) cause of death or morbidity in at least one specimen examined from this location  2.) Any reportable disease listed by OIE or USDA  or  3.) those diagnoses deemed significant by the user or organization.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "speciesDiagnosisSuspectTooltip", {
        get: function () { return 'Indicates if species diagnosis is suspect or not.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "basisOfDiagnosisTooltip", {
        get: function () { return 'Indicates how species diagnosis was determined. \n\n Options are: "Circumstances such as site history, physical evidence, and/or clinical signs" - corresponds to least evidence for diagnosis; "Necropsy conducted by a wildlife health professional" - corresponds to mid-level evidence for diagnosis; "Necropsy and/or ancillary tests performed at a diagnostic laboratory" - corresponds to most evidence for diagnosis; "Unknown" - lack information to select another option.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "significanceOfDiagnosisForSpeciesTooltip", {
        get: function () { return 'Indicates whether diagnosis was a "Cause of Death", "Cause of Sickness", "Incidental Finding", or of "Unknown" significance for this species at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "numberAssessedTooltip", {
        get: function () { return 'Number of individual specimens laboratory tested or examined for a specific etiology. For morbidity/mortality events, specimens will be individual animals. For surveillance events, specimens might reflect individual animals and/or environmental samples. \n\n Across diagnoses, numbers are nonadditive.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "numberWithDiagnosisTooltip", {
        get: function () { return 'Number of individual specimens with the selected diagnosis (can be a suspect diagnosis). For morbidity/mortality events, specimens will be individual animals. For surveillance events, specimens might reflect individual animals and/or environmental samples. \n\n Across diagnoses, numbers are nonadditive.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "labTooltip", {
        // END SPECIES DIAGNOSIS
        // LAB
        get: function () { return 'Laboratory(ies) providing the diagnoses for this species at this location. \n\n If correct laboratory is not in dropdown, request a new option via the dashboard.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "editLabTooltip", {
        get: function () { return 'Laboratory(ies) providing the diagnoses for this species at this location.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "firstNameTooltip", {
        // END LAB
        // CONTACT INFO
        get: function () { return 'Can use full first name or nickname.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "lastNameTooltip", {
        get: function () { return 'Surname.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "emailAddressTooltip", {
        get: function () { return 'Email address, preferably work account.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "phoneNumberTooltip", {
        get: function () { return 'Phone number, preferably work number. '; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "titleTooltip", {
        get: function () { return 'Prefix to their name; e.g., Dr., Mrs., Special Agent.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "positionTooltip", {
        get: function () { return 'Job position; e.g., refuge manager, virology lab technician.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "organizationTooltip", {
        get: function () { return 'Organization where contact works. \n\n If correct organization is not in dropdown, request a new option via the dashboard or enter free text in the "Company/Business/Affiliation" field.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "affiliationTooltip", {
        get: function () { return 'Contact\'s company or other affiliation, if not part of one of the organizations listed in the "Organization" field.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regUsernameTooltip", {
        // END CONTACT INFO
        // REGISTRATION
        get: function () { return 'Login username.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regFirstNameTooltip", {
        get: function () { return 'Can use full first name or nickname.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regLastNameTooltip", {
        get: function () { return 'Surname.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regemailAddressTooltip", {
        get: function () { return 'Email address, preferably work account for Natural Resources Management Professionals.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regPasswordTooltip", {
        get: function () { return 'Password must be at least 12 characters long and contain at least one:\n\nLowercase letter (a, b, c, ..., z) \n\n Number (0, 1, 2, ..., 3) \n\n Symbol (!, #, @, etc.)'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regTermsOfUseTooltip", {
        get: function () { return 'Natural Resource Management Professionals are required to check this box acknowledging the terms of use before becoming authorized WHISPers users.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regOrganizationTooltip", {
        get: function () { return 'Organization where user works. \n\n If correct organization is not in dropdown, enter free text in the "Comment" field.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regRoleTooltip", {
        get: function () { return 'Role being requested by registering user. \n\n Options are: "User" - can submit data, edit self-created data, and view non-public data within own organization; "Manager" - anything a "User" can do, plus can edit any data within own organization; "Administrator" - anything a "Manager" can do, plus can validate and delete users and user info within own organization.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "regCommentTooltip", {
        get: function () { return 'Any additional comment or explanation to accompany the registration request.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "itemTypeToRequestTooltip", {
        // END REGISTRATION
        // DASHBOARD
        get: function () { return 'WHISPers dropdown pick list that needs new addition.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "newRequestDetailsTooltip", {
        get: function () { return 'What is being requested; e.g., "add northern cricket frog (Acris crepitans)" to species list or "add chytriodimycosis caused by Batrachochytrium salamandrivorans" to diagnosis list.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventGroupIDTooltip", {
        get: function () { return 'Unique identifier for an event group.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "circleNameTooltip", {
        get: function () { return 'Short name for the user circle.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "circleDiscriptionTooltip", {
        get: function () { return 'Description of the user circle.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "numberOfLocationsDefinition", {
        // END DASHBOARD
        // PDF Defnitions
        get: function () { return 'Number of locations (e.g., town or lake) that each represents a distinct spatial cluster of animal observations within a county.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "numberOfSpeciesDefinition", {
        get: function () { return 'Total number of species affected.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "speciesMostAffectedDefinition", {
        get: function () { return 'Top species affected based on sick and dead numbers reported.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventVisibility", {
        get: function () { return 'Indicates whether event is visible to the public or not.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "startEndDatesDefinition", {
        get: function () { return 'Beginning date of the event (considering all locations). Ending date of the event (considering all locations).'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "associatedEventDefinition", {
        get: function () { return 'Events that are biologically equivalent and were grouped together by wildlife disease specialists at the USGS National Wildlife Health Center.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "commentSourceDefinition", {
        get: function () { return 'Comment timeline is a compilation of comments entered in various sections of the event record; the source identifies from where the comment originated.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "numAnimalsAffected", {
        get: function () { return 'Total number affected. A count of sick plus dead animals for a morbidity/mortality event.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "numOfEvents", {
        get: function () { return 'Number of WHISPers events.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "mostFrequentEvtDiag", {
        get: function () { return 'Top event diagnosis or diagnoses based on the number of events with that diagnosis reported.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "avgEventTimeSpan", {
        get: function () { return 'Mean number of days between start and end dates across all events. If no end date provided for an event, date of report generation was used.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "eventWithMostAffected", {
        get: function () { return 'WHISPers event(s) with the highest number of animals affected.'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FIELD_HELP_TEXT, "longestRunningEvent", {
        get: function () { return 'WHISPers event(s) with the longest time span in days. If no end date provided for an event, date of report generation was used.'; },
        enumerable: true,
        configurable: true
    });
    FIELD_HELP_TEXT = __decorate([
        core_1.Injectable()
    ], FIELD_HELP_TEXT);
    return FIELD_HELP_TEXT;
}());
exports.FIELD_HELP_TEXT = FIELD_HELP_TEXT;
//# sourceMappingURL=app.field-help-text.js.map
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class FIELD_HELP_TEXT {
// The characters \n\n can be used to add a breakline to the tooltip

// EVENT DETAILS & OTHER INFO
public static get userEventRefTooltip(): string { return 'User-designated name or number for an event.'; }

public static get eventVisibilityTooltip(): string { return 'Indicates whether event is visible to the public or not. \n\n See metadata for details.'; }
public static get editEventVisibilityTooltip(): string { return 'Indicates whether event is visible to the public or not.'; }

public static get contactOrganizationTooltip(): string { return 'Organization(s) to display to general public for them to contact regarding general inquiries about the event. \n\n If correct organization is not in dropdown, request a new option via the dashboard.'; }
public static get editContactOrganizationTooltip(): string { return 'Organization(s) to contact regarding general inquiries about the event.'; }

public static get eventTypeTooltip(): string { return 'Mortality/Morbidity: Noteworthy occurrence of one or more sick or dead animals clustered in space and time. \n\n  Surveillance: Positive detections of a pathogen during active surveillance of healthy live animals. \n\n If both (e.g., went to cave to swab live bats and also found dead bats), create two separate events. \n\n See metadata for details.'; }
public static get editEventTypeTooltip(): string { return 'Mortality/Morbidity: Noteworthy occurrence of one or more sick or dead animals clustered in space and time. \n\n  Surveillance: Positive detections of a pathogen during active surveillance of healthy live animals.'; }

public static get recordStatusTooltip(): string { return '"Complete" if 1.) the event has ended,  2.) diagnostic tests are finalized, and  3.) all information is updated in WHISPers. Otherwise, "Incomplete". \n\n  See metadata for details.'; }
public static get editRecordStatusTooltip(): string { return '"Complete" if 1.) the event has ended,  2.) diagnostic tests are finalized, and  3.) all information is updated in WHISPers. Otherwise, "Incomplete".'; }

public static get eventIDTooltip(): string { return 'System-generated unique identifier for an event.'; }

public static get eventStartDateTooltip(): string { return 'Beginning date of the event (considering all locations).'; }
public static get eventEndDateTooltip(): string { return 'Ending date of the event (considering all locations).'; }

public static get numberAffectedTooltip(): string { return 'Total number affected in event. A count of sick plus dead animals for a morbidity/mortality event and a count of positives for a surveillance event.'; }

public static get flywayTooltip(): string { return 'United States Fish and Wildlife Service administrative Flyway at this location.'; }
public static get nwhcCarcassSubApprovalTooltip(): string { return 'For USGS National Wildlife Health Center (NWHC) to fill out after a diagnostic service request has been received. \n\nOptions are: "Yes" - service request has been approved; "No" - service request has not been approved; "Maybe" - service request might be approved but NWHC needs more information via comments.'; }
// WIM wrote locationsTooltip (not in hover text spreadsheet)
public static get locationsTooltip(): string { return 'Displayed as County (or equivalent), State (or equivalent), Country - where values are available'; }
// END EVENT INFO

// EVENT LOCATION
public static get locationStartDateTooltip(): string { return 'Estimated beginning date of the event at this location.'; }
public static get locationEndDateTooltip(): string { return 'Estimated ending date of the event at this location.'; }

public static get locationNameTooltip(): string { return 'Describes location within a county (e.g., town or lake name) that represents a distinct spatial cluster of animal observations. \n\n  Can use GNIS standardized location name instead of, or in addition to, this free text name. \n\n  See metadata for details.'; }
public static get editLocationNameTooltip(): string { return 'Describes location within a county (e.g., town or lake name) that represents a distinct spatial cluster of animal observations. \n\n  Can use GNIS standardized location name instead of, or in addition to, this free text name.'; }

public static get standardizedLocationNameTooltip(): string { return 'Standardized location names (e.g., National Wildlife Refuge system names) based on the Geographic Names Information System (GNIS).  \n\n  Note: the GNIS search tool looks up names starting with the first letter. \n\n  Can use free text location name instead of, or in addition to this GNIS standardized location name. \n\n  See metadata for details.'; }
public static get editStandardizedLocationNameTooltip(): string { return 'Standardized location names (e.g., National Wildlife Refuge system names) based on the Geographic Names Information System (GNIS).  \n\n  Note: the GNIS search tool looks up names starting with the first letter. \n\n  Can use free text location name instead of, or in addition to this GNIS standardized location name.'; }

public static get countryTooltip(): string { return 'Country of location.'; }

public static get stateTooltip(): string { return 'State of location (or equivalent, such as provinces or territories in Canada).'; }

public static get countyTooltip(): string { return 'County of location (or equivalent, such as parish or borough in the United States). \n\n If event encompasses multiple counties, create separate locations for each.'; }
public static get editCountyTooltip(): string { return 'County of location (or equivalent, such as parish or borough in the United States).'; }

public static get landOwnershipTooltip(): string { return 'Entity that owns the land at this location. \n\n Options are: "Federal/National" - owned by the federal or national government of a country; "State/Province" - owned by the state or equivalent; "County or equivalent" - owned by the county or equivalent; "Municipal" - owned by a local entity such as a city or township; "Tribal/Native Peoples" - tribal land or land held by native peoples; "Private" - private property; "Other" - a type of land ownership not covered by the other options in the drop down list for this field; "Unknown" - the ownership of the land is unknown.'; }
public static get editLandOwnershipTooltip(): string { return 'Entity that owns the land at this location.'; }

public static get latitudeTooltip(): string { return 'Latitude of location in decimal degrees WGS84.'; }
public static get longitudeTooltip(): string { return 'Longitude of location in decimal degrees WGS84. \n\n Note: use negative sign for locations in North America.'; }

public static get speciesTooltip(): string { return 'Species affected at this location. \n\n Can select "unidentified" categories of animals. \n\n If correct species is not in dropdown, request a new option via the dashboard.'; }
public static get editSpeciesTooltip(): string { return 'Species affected at this location.'; }

public static get populationTooltip(): string { return 'Estimate of the maximum number of this species at this location, including live, sick, and dead.'; }

public static get ageBiasTooltip(): string { return 'Age bias in the species affected at this location. \n\n Options are: "No noticeable bias" - age bias was assessed but no bias detected; "Unknown" - age bias not assessed; "Mostly young" - most animals affected were young; "Mostly adults" - most animals affected were adults.'; }
public static get editAgeBiasTooltip(): string { return 'Age bias in the species affected at this location.'; }

public static get sexBiasTooltip(): string { return 'Sex bias in the species affected at this location. \n\n Options are: "No noticeable bias" - sex bias was assessed but no bias detected; "Unknown" - sex bias not assessed; "Mostly Male" - most animals affected were male; "Mostly Female" - most animals affected were female.'; }
public static get editSexBiasTooltip(): string { return 'Sex bias in the species affected at this location.'; }

public static get captiveTooltip(): string { return 'Describes if species affected at this location are captive or not. \n\n Options are: "Wild and/or free-ranging" or "Captive >72 hours". Include zoo animals, domestic animals, and wildlife that have been in rehabilitation for >72 hours as captive.'; }
public static get editCaptiveTooltip(): string { return 'Describes if species affected at this location are captive or not.'; }

public static get knownDeadTooltip(): string { return 'Exact minimum count of the cumulative number of dead animals (not including euthanized) at this location over the length of the event. \n\n Include euthanized with sick. If 0 observed, enter 0. \n\n See metadata for details.'; }
public static get editKnownDeadTooltip(): string { return 'Exact minimum count of the cumulative number of dead animals (not including euthanized) at this location over the length of the event.'; }

public static get estimatedDeadTooltip(): string { return 'Best guess of the maximum number of animals that died (include any known dead animals) at this location over the length of the event. \n\n Include euthanized with sick. \n\n See metadata for details'; }
public static get editEstimatedDeadTooltip(): string { return 'Best guess of the maximum number of animals that died (include any known dead animals) at this location over the length of the event.'; }

public static get knownSickTooltip(): string { return 'Exact minimum count of animals exhibiting clinical signs of illness at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured. \n\n Include euthanized with sick. If 0 observed, enter 0.\n\n See metadata for details.'; }
public static get editKnownSickTooltip(): string { return 'Exact minimum count of animals exhibiting clinical signs of illness at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured.'; }

public static get estimatedSickTooltip(): string { return 'Best guess of the maximum number of animals that might be showing clinical signs (include any known sick animals) at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured. \n\n Include euthanized with sick. \n\n See metadata for details.'; }
public static get editEstimatedSickTooltip(): string { return 'Best guess of the maximum number of animals that might be showing clinical signs (include any known sick animals) at the point in time that the observation was made at this location. If site visited repeatedly, use number remaining sick/injured plus number recovered from being sick/injured.'; }

public static get locationCommentTooltip(): string { return 'Observations of landscape and animals at this location to aid interpretation of data and to potentially guide cause of death determination and management actions.\n\n Text in at least one of the main comment categories is required. "Additional Comment" text is optional.'; }
public static get editLocationCommentTooltip(): string { return 'Observations or communications relevant to this location that aid interpretation of the data.'; }
public static get locationCommentTypeTooltip(): string { return 'Flags comment as belonging to a certain category. \n\n See metadata for details on options.'; }

public static get contactPersonTooltip(): string { return 'People from organization\'s address book to potentially contact throughout the course of this event because they might have relevant information about this location.\n\n Select from previously entered contact ("Add Contact") or enter a new person into address book ("Create New Contact").'; }
public static get contactTypeTooltip(): string { return 'Contact person\'s role at this location. \n\n Options are: "Field" - this person might have information about what is going on in the field; "Diagnosis" - this person might have information about the diagnostics; "Media" - this person is a media/news/outreach professional; "Private" - this person is not affiliated with an agency (e.g., private citizen).'; }
// END EVENT LOCATION

// EVENT DIAGNOSIS
public static get eventDiagnosisTooltip(): string { return 'The overall main reason(s) for illness and/or death across all locations and species and thus the major cause(s) of the event, or a diagnosis deemed significant enough to list at the event level for situational awareness. \n\n Options presented are those diagnoses entered at the species level. \n\n If nothing else selected for event diagnosis by user, defaults to "Pending" for "Incomplete" events or "Undetermined" for "Complete" events.'; }
public static get editEventDiagnosisTooltip(): string { return 'The overall main reason(s) for illness and/or death across all locations and species and thus the major cause(s) of the event, or a diagnosis deemed significant enough to list at the event level for situational awareness.'; }
// END EVENT DIAGNOSIS

// EVENT COMMENT
public static get eventCommentTooltip(): string { return 'Observations or communications relevant to the entire event that aid interpretation of the data.'; }
public static get eventCommentTypeTooltip(): string { return 'Flags comment as belonging to a certain category. \n\n Options are: "Field Update" - observation from the field as the event is ongoing; "Management" - disease management actions considered or performed; "Epidemiological" - epidemiological context or patterns; "Diagnostic" - laboratory diagnostic updates; "Other" - any other comments that do not fit within one of the other categories in this list.'; }
// END EVENT COMMENT

// SERVICE REQUEST - There is the full text and then broken out options
public static get serviceRequestFullTooltip(): string { return 'Options are: "No services needed at this time" - user wants to enter an event but does not need consultative or diagnostic services from USGS National Wildlife Health Center (NWHC); "Request diagnostic and consultative services" - user has specimens that they want to submit to NWHC for diagnostic evaluation; "Request consultative services ONLY" - user does not have specimens to submit to NWHC but would like advice on disease management, personal protective gear, etc.'; }
public static get serviceRequestNoServicesTooltip(): string { return 'User wants to enter an event but does not need consultative or diagnostic services from USGS National Wildlife Health Center (NWHC)'; }
public static get serviceRequestRequestDiaAndConsultTooltip(): string { return 'User has specimens that they want to submit to NWHC for diagnostic evaluation'; }
public static get serviceRequestRequestDiaServicesOnlyTooltip(): string { return 'User does not have specimens to submit to NWHC but would like advice on disease management, personal protective gear, etc.'; }

public static get serviceRequestCommentTooltip(): string { return 'User and USGS National Wildlife Health Center provide comments related to diagnostic and/or consultative service request.'; }
// END SERVICE REQUEST

// COLLABORATORS
public static get collaboratorsAddIndividualTooltip(): string { return 'Natural Resource Management Professionals to collaborate with on this event. \n\n Individuals users can be invited to have "read only access" or "read and write access." \n\n Select from previously entered contact ("Get Email Address from Contacts") or enter an email as free text to search for a WHISPers user. If email address is not associated with an authorized WHISPers user account, potential collaborator must create WHISPers login before they can collaborate.'; }
public static get collaboratorsAddCircleTooltip(): string { return 'Predefined group of Natural Resource Management Professionals to collaborate with on this event. \n\n User circles can be invited to have "read only access" or "read and write access." \n\n Options are based on individuals grouped into circles via the "Circles" tab in the dashboard.'; }
// END COLLABORATORS

// SPECIES DIAGNOSIS
public static get speciesDiagnosisTooltip(): string { return 'To determine what diagnoses to provide in WHISPers for situational awareness, consider the following criteria: 1.) Diagnosis has been determined by a wildlife professional to be an ultimate (or underlying) cause of death or morbidity in at least one specimen examined from this location  2.) Any reportable disease listed by OIE or USDA  3.) those diagnoses deemed significant by the user or organization. \n\n Can select "Undetermined" if assessed and no diagnosis determined, or can leave blank. \n\n If correct diagnosis is not in dropdown, request a new option via the dashboard.'; }
public static get editSpeciesDiagnosisTooltip(): string { return '1.) Diagnosis has been determined by a wildlife professional to be an ultimate (or underlying) cause of death or morbidity in at least one specimen examined from this location  2.) Any reportable disease listed by OIE or USDA  or  3.) those diagnoses deemed significant by the user or organization.'; }

public static get speciesDiagnosisSuspectTooltip(): string { return 'Indicates if species diagnosis is suspect or not.'; }
public static get basisOfDiagnosisTooltip(): string { return 'Indicates how species diagnosis was determined. \n\n Options are: "Circumstances such as site history, physical evidence, and/or clinical signs" - corresponds to least evidence for diagnosis; "Necropsy conducted by a wildlife health professional" - corresponds to mid-level evidence for diagnosis; "Necropsy and/or ancillary tests performed at a diagnostic laboratory" - corresponds to most evidence for diagnosis; "Unknown" - lack information to select another option.'; }
public static get significanceOfDiagnosisForSpeciesTooltip(): string { return 'Indicates whether diagnosis was a "Cause of Death", "Cause of Sickness", "Incidental Finding", or of "Unknown" significance for this species at this location.'; }
public static get numberAssessedTooltip(): string { return 'Number of individual specimens laboratory tested or examined for a specific etiology. For morbidity/mortality events, specimens will be individual animals. For surveillance events, specimens might reflect individual animals and/or environmental samples. \n\n Across diagnoses, numbers are nonadditive.'; }
public static get numberWithDiagnosisTooltip(): string { return 'Number of individual specimens with the selected diagnosis (can be a suspect diagnosis). For morbidity/mortality events, specimens will be individual animals. For surveillance events, specimens might reflect individual animals and/or environmental samples. \n\n Across diagnoses, numbers are nonadditive.'; }
// END SPECIES DIAGNOSIS

// LAB
public static get labTooltip(): string { return 'Laboratory(ies) providing the diagnoses for this species at this location. \n\n If correct laboratory is not in dropdown, request a new option via the dashboard.'; }
public static get editLabTooltip(): string { return 'Laboratory(ies) providing the diagnoses for this species at this location.'; }
// END LAB

// CONTACT INFO
public static get firstNameTooltip(): string { return 'Can use full first name or nickname.'; }
public static get lastNameTooltip(): string { return 'Surname.'; }
public static get emailAddressTooltip(): string { return 'Email address, preferably work account.'; }
public static get phoneNumberTooltip(): string { return 'Phone number, preferably work number. '; }
public static get titleTooltip(): string { return 'Prefix to their name; e.g., Dr., Mrs., Special Agent.'; }
public static get positionTooltip(): string { return 'Job position; e.g., refuge manager, virology lab technician.'; }
public static get organizationTooltip(): string { return 'Organization where contact works. \n\n If correct organization is not in dropdown, request a new option via the dashboard or enter free text in the "Company/Business/Affiliation" field.'; }
public static get affiliationTooltip(): string { return 'Contact\'s company or other affiliation, if not part of one of the organizations listed in the "Organization" field.'; }
// END CONTACT INFO

// REGISTRATION
public static get regUsernameTooltip(): string { return 'Login username.'; }
public static get regFirstNameTooltip(): string { return 'Can use full first name or nickname.'; }
public static get regLastNameTooltip(): string { return 'Surname.'; }
public static get regemailAddressTooltip(): string { return 'Email address, preferably work account for Natural Resources Management Professionals.'; }
public static get regPasswordTooltip(): string { return 'Password must be at least 12 characters long and contain at least one:\n\nLowercase letter (a, b, c, ..., z) \n\n Number (0, 1, 2, ..., 3) \n\n Symbol (!, #, @, etc.)'; }
public static get regTermsOfUseTooltip(): string { return 'Natural Resource Management Professionals are required to check this box acknowledging the terms of use before becoming authorized WHISPers users.'; }
public static get regOrganizationTooltip(): string { return 'Organization where user works. \n\n If correct organization is not in dropdown, enter free text in the "Comment" field.'; }
public static get regRoleTooltip(): string { return 'Role being requested by registering user. \n\n Options are: "User" - can submit data, edit self-created data, and view non-public data within own organization; "Manager" - anything a "User" can do, plus can edit any data within own organization; "Administrator" - anything a "Manager" can do, plus can validate and delete users and user info within own organization.'; }
public static get regCommentTooltip(): string { return 'Any additional comment or explanation to accompany the registration request.'; }
// END REGISTRATION

// DASHBOARD
public static get itemTypeToRequestTooltip(): string { return 'WHISPers dropdown pick list that needs new addition.'; }
public static get newRequestDetailsTooltip(): string { return 'What is being requested; e.g., "add northern cricket frog (Acris crepitans)" to species list or "add chytriodimycosis caused by Batrachochytrium salamandrivorans" to diagnosis list.'; }
public static get eventGroupIDTooltip(): string { return 'Unique identifier for an event group.'; }
public static get circleNameTooltip(): string { return 'Short name for the user circle.'; }
public static get circleDiscriptionTooltip(): string { return 'Description of the user circle.'; }
// END DASHBOARD
}

// Tooltip config template:
// public static get Tooltip(): string { return ''; }

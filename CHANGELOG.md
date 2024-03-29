# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased](https://github.com/USGS-WiM/whispers/tree/dev)

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

## [2.18.1](https://github.com/USGS-WiM/whispers/releases/tag/v2.18.1)

### Changed

- added link to NWHC diagnostic case submission guidelines and updated text in the service request dialog
- changed handling of the role name display - eliminated query of role table in favor of role_string from server auth response

## [2.18.0](https://github.com/USGS-WiM/whispers/releases/tag/v2.18.0)

### Added

- added disabling of Add/Remove collaborator for complete events (issue #1291)
- added automatic inclusion of Event Owner in the Alert Collaborators Component collaborators list (issue #1292)
- added redirect to home after event submission (issue #1293)

### Changed

- updated text in the Edit User component (issue #1289)
- lengthened select dropdowns and added tooltips on Custom Notification component (issue #1290)

### Fixed

- fixed bug on Circles Component where initial load sized table length to 10 despite pagination selection (issue #1267)

## [2.17.0](https://github.com/USGS-WiM/whispers/releases/tag/v2.17.0)

### Added

- adds autocomplete functionality to the CircleChooseComponent so user can type to search options for selection (issue #1268)
- adds a check against the user deleting the sole location species from an event location (#1238)
- adds a new validation on the speciesDiagnosisForm of the EditSpeciesDiagnosisComponent to prevent 0 diagnosis count or tested count (issue #1262)
- adds end date validation to Event Submission, Add Event Location, and Edit Event Location which prevents selection of a date in the future (issue #1294)

### Changed

- changes text for Request to Collaborate (issue #1280)

### Fixed

- fixes a missing call to updateCirclesResultsCount that was causing Circles pagination to malfunction (issue #1267)
- fixes a bug with the Species Details list on Event Details page duplicating species when navigating between Associated Events (issue #713)
- fixes a bug with display of event icons/markers on map, popup, and event table on the home page (issue #1269)

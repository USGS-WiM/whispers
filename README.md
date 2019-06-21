![USGS](USGS_ID_black.png) ![WIM](wimlogo.png)

# whispers
WHISPers v2

This is the web client codebase for version 2 of  Wildlife Health Information Sharing Partnership event reporting system. WHISPers allows users to enter, discover, amd explore wildlife mortality data submitted by partners across North America and verified by trained biologists.

This project was built with [Angular](https://angular.io/) and generated with [Angular CLI](https://github.com/angular/angular-cli)

#### Installation
*Prerequisite*: Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation).

```bash
git clone https://github.com/USGS-WiM/whispers.git
cd whispers

# install the project's dependencies
npm install

```

## Environments
The two main environments are configured by environment files found at `/src/enviroments/`. The API / web services root URL for each environment is stored in these files. Default environment is development at `environment.ts`, used by the development server (see below). Production environment at `environment.prod.ts`, used by the production build (see below).

## Development server

Run `ng serve` for a dev server with live reload. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. This will use the development environment configuration.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Production Build

Run `ng build --prod --base-href [relative path to web server root]` to build the project. The build artifacts will be stored in the `dist/` directory. This will use the production environment configuration.

## Authors

* **[Blake Draper](https://github.com/BlakeDraper)**  - *Lead Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)
Mapping](https://wim.usgs.gov/)

* **[Nick Estes](https://github.com/njestes)**  - *Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)
Mapping](https://wim.usgs.gov/)

* **[Lauren Privette](https://github.com/lprivette)**  - *Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)
Mapping](https://wim.usgs.gov/)

See also the list of [contributors](../../graphs/contributors) who participated in this project.

## License

This software is in the Public Domain. See the [LICENSE.md](LICENSE.md) file for details

## Suggested Citation
In the spirit of open source, please cite any re-use of the source code stored in this repository. Below is the suggested citation:

`This project contains code produced by the Web Informatics and Mapping (WIM) team at the United States Geological Survey (USGS). As a work of the United States Government, this project is in the public domain within the United States. https://wim.usgs.gov`


## About WIM
* This project authored by the [USGS WIM team](https://wim.usgs.gov)
* WIM is a team of developers and technologists who build and manage tools, software, web services, and databases to support USGS science and other federal government cooperators.
* WIM is a part of the [Upper Midwest Water Science Center](https://www.usgs.gov/centers/wisconsin-water-science-center).



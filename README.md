![USGS](USGS_ID_black.png) ![WIM](wimlogo.png)

  

  

# whispers

  

WHISPers v2

  

  

This is the web client codebase for version 2 of Wildlife Health Information Sharing Partnership event reporting system. WHISPers allows users to enter, discover, and explore wildlife mortality data submitted by partners across North America and verified by trained biologists.

  

This project was built with [Angular](https://angular.io/) and generated with [Angular CLI](https://github.com/angular/angular-cli). It also relies on [Leaflet](https://leafletjs.com), [OpenStreetMap](https://www.openstreetmap.org/), [NgxMatSelectSearch](https://github.com/bithost-gmbh/ngx-mat-select-search) and the [USGS Search API](https://github.com/usgs/search_api).

  

  

### Installation

  

*Prerequisite*: Please install Angular-CLI by following [these instructions](https://github.com/angular/angular-cli#installation).

  

`git clone https://github.com/USGS-WiM/whispers.git`

  

`cd whispers`

  

  

####  install the project's dependencies

  

`npm install`

Note: It is best to run `npm install` at least three times as it often takes several runs to successfully install all dependencies. 

  

## Environments

  

The three main environments are configured by environment files found at `/src/enviroments/`. The API / web services root URL for each environment is stored in these files. Default environment is development at `environment.ts`, used by the development server (see below).  Test environment at `environment.test.ts` is used by the test build (see below). Production environment at `environment.prod.ts`is used by the production build (see below).

 
  

### Development server for active development

  


Run `ng serve` for a dev server with live reload. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. This will use the development environment configuration (environment.ts).

## Documentation

The [Compodoc](https://compodoc.app/) documentation tool is used to generate static documenation of the WHISPers app. 

Run `npm run compodoc` to generate and run the documentation server. Navigate to `http://127.0.0.1:8080`.

## Angular code scaffolding

The Angular CLI offers a generate tool that makes the creation of some common component types a little easier.

Run `ng generate component component-name` to generate a new component. You can also use `ng generate`  `directive`|`pipe`|`service`|`class`|`guard`|`interface`|`enum`|`module`.

  

## Distribution build for test and production

  
When publishing the WHISPers app on the server for either the test phase or the final publishing to production level, a developer must run the Angular CLI build script to create a minimized, optimized package for server distribution. WHISPers has two build configurations: test and production. 

#### Test

To be used when a new release version is ready for cooperator review but not yet ready for production. 

Run `ng build --configuration=test --base-href [relative path to web server root]` to build the project. The build artifacts will be stored in the `dist/` directory. This will use the test environment configuration.

### Production

To be used when a release version has passed the testing phase by receiving approval for promotion by the cooperator. 
  

Run `ng build --prod --base-href [relative path to web server root]` to build the project. The build artifacts will be stored in the `dist/` directory. This will use the production environment configuration.

  
Note: the main differences between these two configurations are 1) the API root (prod services/database vs test services/database) and 2) the inclusion of Google Analytics for the production configuration. 


## Collaborative Development Process

#### Merging changes into the WHISPers codebase

WIM has established a collaborative development process that aims to ensure the integrity of the release process through stepwise and peer-reviewed code merges passing through a pipeline of protected branches.

#### The branches

-  **dev** is the branch where all developers merge all individual issue or feature branches.
-  **test** is reserved for code that represents a version that is in test phase. The current state of the test branch is published to the test server for review by testers. 
-  **master** is reserved for fully vetted code for tested and approved features that represents a version that is in production, i.e. published and live for active users.

 #### Steps to contribute
 1.  clone the repository. This should automatically include the `master` branch.
 2.  create dev branch locally: `git checkout -b dev`
 3. pull and merge current dev branch : `git pull origin dev`
 4. create a branch for your work, checking out from `dev`. It is strongly suggested that the branch name be the repository issue number that you are working on: `git checkout -b [branch name]` 
              
       ***__Do work__***

 5. it is recommended you commit and push changes to the branch at least nightly for safekeeping: `git push origin [branch name]`
 6. when work on your feature or bug is complete, commit changes and then **sync your local feature branch with the remote dev branch**: `git pull origin dev`. This is an important step because the remote dev branch may have been changed while you were working on your local feature branch. This will auto-merge unless you have conflicts. Resolve the conflicts manually if they exist.
 7. push your feature branch, now synced with remote dev branch (see step 6 above) to the remote feature branch: `git push origin [branch name]`. Note this is exactly the same command as step 5. This step is for when you have completed the feature/fix, and pulled/merged the remote dev branch. 
 8. In Github, create a Pull Request from your feature branch to the **`dev` branch**. Your peers will review your changes, and comment, and/or approve and merge. You may also be asked to make a change. When all is well, your feature branch will be merged with `dev` and the feature branch deleted. 

After going to `dev` and possibly combined with other commits, the work will be packaged as part of a release tag and distribution build and merged with `test` and published to the test server. 
  

## Authors

    

*  **[Blake Draper](https://github.com/BlakeDraper)** - *Lead Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)

  
*  **[Lauren Privette](https://github.com/lprivette)** - *Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/) 
  

*  **[Nick Estes](https://github.com/njestes)** - *Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)


*  **[Mitch Samuels](https://github.com/mitchas)** - *Designer/Developer* - [USGS Web Informatics & Mapping](https://wim.usgs.gov/)

  
  

See also the list of [contributors](../../graphs/contributors) who participated in this project.

  

  

## License

  

  

This software is in the Public Domain. See the [LICENSE.md](LICENSE.md) file for details

  

  

## Suggested Citation

  

In the spirit of open source, please cite any re-use of the source code stored in this repository. Below is the suggested citation:

  

  

`This project contains code produced by the Web Informatics and Mapping (WIM) team at the United States Geological Survey (USGS). As a work of the United States Government, this project is in the public domain within the United States. https://wim.usgs.gov`

  
  

## Acknowledgments

  

-  [Angular](https://angular.io/)

-  [Leaflet](https://leafletjs.com)

-  [OpenStreetMap](https://www.openstreetmap.org/)

-  [NgxMatSelectSearch](https://github.com/bithost-gmbh/ngx-mat-select-search)

-  [USGS Search API](https://github.com/usgs/search_api) and the [Geospatial Science + Cyber Innovation Branch](https://webapps.usgs.gov/) of The USGS Texas Water Science Center

  
  

## About WIM

  

* This project authored by the [USGS WIM team](https://wim.usgs.gov)

  

* WIM is a team of developers and technologists who build and manage tools, software, web services, and databases to support USGS science and other federal government cooperators.

  

* WIM is a part of the [Upper Midwest Water Science Center](https://www.usgs.gov/centers/wisconsin-water-science-center).

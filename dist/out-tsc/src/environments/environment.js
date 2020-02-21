"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
exports.environment = {
    production: false,
    hmr: false,
    version: require('../../package.json').version,
    api_root: 'https://whispersdev.wim.usgs.gov/whispersservices/',
    // api_root: 'https://whispers.usgs.gov/whispersservices/',
    banner_content: 'This website is under development and CONTAINS FICTICIOUS DATA. ',
    banner_text_color: '#FFFF00'
};
//# sourceMappingURL=environment.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
var environment_1 = require("./environments/environment");
var hmr_1 = require("./hmr");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
var bootstrap = function () { return platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule); };
if (environment_1.environment.hmr) {
    if (module['hot']) {
        hmr_1.hmrBootstrap(module, bootstrap);
    }
    else {
        console.error('HMR is not enabled for webpack-dev-server!');
        console.log('Are you using the --hmr flag for ng serve?');
    }
}
else {
    bootstrap().catch(function (err) { return console.log(err); });
}
//# sourceMappingURL=main.js.map
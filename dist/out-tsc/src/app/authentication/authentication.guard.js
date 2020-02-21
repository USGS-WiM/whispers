"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_settings_1 = require("../app.settings");
var AuthenticationGuard = /** @class */ (function () {
    function AuthenticationGuard() {
    }
    AuthenticationGuard.prototype.canActivate = function () {
        return app_settings_1.APP_SETTINGS.IS_LOGGEDIN;
    };
    return AuthenticationGuard;
}());
exports.AuthenticationGuard = AuthenticationGuard;
//# sourceMappingURL=authentication.guard.js.map
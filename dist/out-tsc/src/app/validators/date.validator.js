"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DateValidators = /** @class */ (function () {
    function DateValidators() {
    }
    DateValidators.dateLessThan = function (dateField1, dateField2, validatorField) {
        return function (c) {
            var date1 = c.get(dateField1).value;
            var date2 = c.get(dateField2).value;
            if ((date1 !== null && date2 !== null) && date1 > date2) {
                return validatorField;
            }
            return null;
        };
    };
    return DateValidators;
}());
exports.DateValidators = DateValidators;
//# sourceMappingURL=date.validator.js.map
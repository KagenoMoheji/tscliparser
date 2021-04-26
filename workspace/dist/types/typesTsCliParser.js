"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCommonOption = exports.isHelpOption = exports.isValueAdvanced = exports.isOptionAdvanced = void 0;
var isOptionAdvanced = function (arg) {
    return (arg !== null &&
        typeof arg === "object" &&
        typeof arg.short === "string");
};
exports.isOptionAdvanced = isOptionAdvanced;
var isValueAdvanced = function (arg) {
    return (arg !== null &&
        typeof arg === "object" &&
        typeof arg.location === "number");
};
exports.isValueAdvanced = isValueAdvanced;
var isHelpOption = function (arg) {
    return (arg !== null &&
        typeof arg === "object" &&
        typeof arg.usage === "string");
};
exports.isHelpOption = isHelpOption;
var isCommonOption = function (arg) {
    return (arg !== null &&
        typeof arg === "object" &&
        (exports.isOptionAdvanced(arg.advanced) || exports.isValueAdvanced(arg.advanced)));
};
exports.isCommonOption = isCommonOption;
//# sourceMappingURL=typesTsCliParser.js.map
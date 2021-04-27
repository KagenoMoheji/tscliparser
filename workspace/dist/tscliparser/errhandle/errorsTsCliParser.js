"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliParserArgError = exports.CliParserConstructorError = void 0;
var CliParserConstructorError = (function (_super) {
    __extends(CliParserConstructorError, _super);
    function CliParserConstructorError(e) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, e) || this;
        _this.name = _newTarget.name;
        return _this;
    }
    return CliParserConstructorError;
}(Error));
exports.CliParserConstructorError = CliParserConstructorError;
var CliParserArgError = (function (_super) {
    __extends(CliParserArgError, _super);
    function CliParserArgError(e) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, e) || this;
        _this.name = _newTarget.name;
        return _this;
    }
    return CliParserArgError;
}(Error));
exports.CliParserArgError = CliParserArgError;
//# sourceMappingURL=errorsTsCliParser.js.map
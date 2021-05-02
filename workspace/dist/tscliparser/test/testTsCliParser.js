"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTsCliParser = void 0;
var assert = __importStar(require("assert"));
var testTsCliParser = function (input, expect) {
    var args = input.cmd.split(" ");
    input.cliparser.parse(args);
    var _loop_1 = function (argName) {
        it("Each argument data should match.", function () {
            assert.strictEqual(input.cliparser.getParams()[argName].data, expect.params[argName]);
        });
    };
    for (var _i = 0, _a = Object.keys(expect.params); _i < _a.length; _i++) {
        var argName = _a[_i];
        _loop_1(argName);
    }
};
exports.testTsCliParser = testTsCliParser;
//# sourceMappingURL=testTsCliParser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliParser = void 0;
var typesTsCliParser_1 = require("~/types/typesTsCliParser");
var errorsTsCliParser_1 = require("~/errhandle/errorsTsCliParser");
var CliParser = (function () {
    function CliParser(defaultParams) {
        this.params = defaultParams;
        try {
            if (defaultParams.help.usage === "") {
                throw new errorsTsCliParser_1.CliParserConstructorError("CliParser cannot permit strictly to use this CLI because of invalid in constructor argument 'usage'.");
            }
            if (Object.keys(defaultParams).length !==
                new Set(Object.keys(defaultParams)).size) {
                throw new errorsTsCliParser_1.CliParserConstructorError("Found duplicated long argument names.");
            }
            if (this.getShortArgNames().length !==
                new Set(this.getShortArgNames()).size) {
                throw new errorsTsCliParser_1.CliParserConstructorError("Found duplicated short argument names.");
            }
        }
        catch (e) {
            console.error(e.name + ": " + e.message);
            process.exit(1);
        }
    }
    CliParser.prototype.getParams = function () {
        return this.params;
    };
    CliParser.prototype.getArgNames = function () {
        return Object.keys(this.params);
    };
    CliParser.prototype.getShortArgNames = function () {
        var shortArgNames = [];
        for (var _i = 0, _a = this.getArgNames(); _i < _a.length; _i++) {
            var argName = _a[_i];
            if (typesTsCliParser_1.isOptionAdvanced(this.params[argName].advanced)) {
                var shorArgName = this.params[argName].advanced.short;
                if (shorArgName !== "") {
                    shortArgNames.push(shorArgName);
                }
            }
        }
        return shortArgNames;
    };
    CliParser.prototype.getArgNameFromShortArgName = function (shortArgName) {
        for (var _i = 0, _a = this.getArgNames(); _i < _a.length; _i++) {
            var argName = _a[_i];
            if (typesTsCliParser_1.isOptionAdvanced(this.params[argName].advanced)) {
                if (shortArgName ===
                    this.params[argName]
                        .advanced.short) {
                    return [argName, ""];
                }
            }
        }
        return [
            "",
            "Not found argument from short argument '" + shortArgName + "'.",
        ];
    };
    CliParser.prototype.getHelp = function () {
        var description = "";
        if (this.params.help.description !== "") {
            description = this.params.help.description + "\n";
        }
        return "" + description + this.params.help.usage;
    };
    CliParser.prototype.updateValueData = function (location, data) {
        for (var _i = 0, _a = this.getArgNames(); _i < _a.length; _i++) {
            var argName = _a[_i];
            if (typesTsCliParser_1.isValueAdvanced(this.params[argName].advanced)) {
                if (location ===
                    this.params[argName]
                        .advanced.location) {
                    this.updateParamData(argName, data);
                    return [argName, ""];
                }
            }
        }
        return ["", "Location '" + location + "' is out of argument values."];
    };
    CliParser.prototype.updateParamData = function (argName, data) {
        try {
            switch (typeof this.params[argName].data) {
                case "string":
                    if (data.startsWith("-")) {
                        throw new errorsTsCliParser_1.CliParserArgError("Detected danger in consecutive arguments '" + argName + "' and '" + data + "'. If you want set strings start with '-', you should enclose the string with quotes(single or double).");
                    }
                    if (/('.*'|".*")/.test(data)) {
                        var result = data.match(/(?<=('|")).*?(?=('|"))/);
                        if (result) {
                            data = result[0];
                        }
                    }
                    this.params[argName].data = data;
                    break;
                case "boolean":
                    this.params[argName].data = !this.params[argName].data;
                    break;
                case "number":
                    if (isNaN(Number(data))) {
                        throw new TypeError();
                    }
                    this.params[argName].data = Number(data);
                    break;
                default:
                    throw new TypeError();
            }
        }
        catch (e) {
            if (e instanceof TypeError) {
                console.error(e.name + ": Invalid type in argument '" + argName + "'(expected " + typeof this
                    .params[argName]
                    .data + ", but " + typeof data + ").");
            }
            else {
                console.error(e.name + ": " + e.message);
            }
            process.exit(1);
        }
        return "";
    };
    CliParser.prototype.getInitialIsUpdatedRequreds = function () {
        var isUpdatedRequireds = {};
        for (var _i = 0, _a = this.getArgNames(); _i < _a.length; _i++) {
            var argName = _a[_i];
            if (typesTsCliParser_1.isHelpOption(this.params[argName])) {
                continue;
            }
            if (this.params[argName].advanced.required) {
                isUpdatedRequireds[argName] = false;
            }
        }
        return isUpdatedRequireds;
    };
    CliParser.prototype.parse = function (argv) {
        var argNames = this.getArgNames();
        var isUpdatedRequireds = this.getInitialIsUpdatedRequreds();
        var currentLocation = 1;
        try {
            for (var i = 2; i < argv.length; i++) {
                var arg = argv[i];
                var argName = "";
                if (arg.startsWith("--")) {
                    argName = arg.slice(2);
                    if (!argNames.includes(argName)) {
                        throw new errorsTsCliParser_1.CliParserArgError("CliParser cannot find argument '" + argName + "'.");
                    }
                }
                else if (arg.startsWith("-")) {
                    var _a = this.getArgNameFromShortArgName(arg.slice(1)), res = _a[0], err = _a[1];
                    argName = res;
                    if (err !== "") {
                        throw new errorsTsCliParser_1.CliParserArgError(err);
                    }
                }
                if (typesTsCliParser_1.isHelpOption(this.params[argName])) {
                    if (argName === "help") {
                        console.log(this.getHelp());
                        process.exit(0);
                    }
                    continue;
                }
                if (argName !== "") {
                    if (typeof this.params[argName].data !==
                        "boolean") {
                        this.updateParamData(argName, argv[++i]);
                    }
                    else {
                        this.updateParamData(argName, "");
                    }
                }
                else {
                    var _b = this.updateValueData(currentLocation++, arg), res = _b[0], err = _b[1];
                    argName = res;
                    if (err !== "") {
                        throw new errorsTsCliParser_1.CliParserArgError(err);
                    }
                }
                if (!typesTsCliParser_1.isHelpOption(this.params[argName])) {
                    if (this.params[argName].advanced.required) {
                        isUpdatedRequireds[argName] = true;
                    }
                }
            }
            var notUpdateRequiredArgNames = Object.keys(isUpdatedRequireds).filter(function (argName) {
                return !isUpdatedRequireds[argName];
            });
            if (notUpdateRequiredArgNames.length > 0) {
                throw new errorsTsCliParser_1.CliParserArgError("CliParser cannot find required arguments.(" + notUpdateRequiredArgNames
                    .map(function (argName) { return "'" + argName + "'"; })
                    .join(", ") + ")");
            }
            if (this.params.test.data) {
                process.stdout.write("\x1Bc");
                console.log(this.params);
                process.exit(0);
            }
        }
        catch (e) {
            console.error(e.name + ": " + e.message);
            process.exit(1);
        }
        return this;
    };
    return CliParser;
}());
exports.CliParser = CliParser;
//# sourceMappingURL=tscliparser.js.map
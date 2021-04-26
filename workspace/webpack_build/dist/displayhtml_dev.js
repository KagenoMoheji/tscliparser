/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./sample/main/displayHtml.ts":
/*!************************************!*\
  !*** ./sample/main/displayHtml.ts ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cliparser = void 0;
var tscliparser_1 = __webpack_require__(/*! ~~/src/tscliparser */ "./src/tscliparser.ts");
var http_1 = __importDefault(__webpack_require__(/*! http */ "http"));
var fs_1 = __importDefault(__webpack_require__(/*! fs */ "fs"));
exports.cliparser = new tscliparser_1.CliParser({
    host: {
        data: "127.0.0.1",
        advanced: {
            required: false,
            short: "h",
        },
    },
    port: {
        data: 8765,
        advanced: {
            required: false,
            short: "p",
        },
    },
    html: {
        data: "index.html",
        advanced: {
            required: true,
            location: 1,
        },
    },
    test: {
        data: false,
        advanced: {
            required: false,
            short: "",
        },
    },
    help: {
        usage: "[Usage] node displayHtml.js [-h|--host HOST] [-p|--port PORT] [--help] html\nOptions:\n-h|--host HOST: Host that will be used to start HTTP Server. (default: 127.0.0.1)\n-p|--port PORT: Port that will be used to start HTTP Server. (default: 8765)\n--help        : Display help.\nhtml          : HTML file you want to display with HTTP Server.",
        description: "This CLI shows the preview of HTML.",
    },
});
if (__webpack_require__.c[__webpack_require__.s] === module) {
    exports.cliparser.parse(process.argv);
    var cliParams_1 = exports.cliparser.getParams();
    var server = http_1.default.createServer(function (req, res) {
        res.writeHead(200, { "content-type": "text/html" });
        fs_1.default.createReadStream(cliParams_1.html.data).pipe(res);
    });
    server.listen(cliParams_1.port.data);
    console.log("'" + cliParams_1.html.data + "' is displayed on HTTP Server launched with " + cliParams_1.host.data + ":" + cliParams_1.port.data);
}


/***/ }),

/***/ "./src/errhandle/errorsTsCliParser.ts":
/*!********************************************!*\
  !*** ./src/errhandle/errorsTsCliParser.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports) {


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
Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "./src/tscliparser.ts":
/*!****************************!*\
  !*** ./src/tscliparser.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CliParser = void 0;
var typesTsCliParser_1 = __webpack_require__(/*! ~/types/typesTsCliParser */ "./src/types/typesTsCliParser.ts");
var errorsTsCliParser_1 = __webpack_require__(/*! ~/errhandle/errorsTsCliParser */ "./src/errhandle/errorsTsCliParser.ts");
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


/***/ }),

/***/ "./src/types/typesTsCliParser.ts":
/*!***************************************!*\
  !*** ./src/types/typesTsCliParser.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
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


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(__webpack_require__.s = "./sample/main/displayHtml.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90c2NsaXBhcnNlci8uL3NhbXBsZS9tYWluL2Rpc3BsYXlIdG1sLnRzIiwid2VicGFjazovL3RzY2xpcGFyc2VyLy4vc3JjL2VycmhhbmRsZS9lcnJvcnNUc0NsaVBhcnNlci50cyIsIndlYnBhY2s6Ly90c2NsaXBhcnNlci8uL3NyYy90c2NsaXBhcnNlci50cyIsIndlYnBhY2s6Ly90c2NsaXBhcnNlci8uL3NyYy90eXBlcy90eXBlc1RzQ2xpUGFyc2VyLnRzIiwid2VicGFjazovL3RzY2xpcGFyc2VyL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly90c2NsaXBhcnNlci9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly90c2NsaXBhcnNlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90c2NsaXBhcnNlci93ZWJwYWNrL3J1bnRpbWUvbm9kZSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL3RzY2xpcGFyc2VyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLDBGQUErQztBQUMvQyxzRUFBd0I7QUFDeEIsZ0VBQW9CO0FBMEJQLGlCQUFTLEdBQUcsSUFBSSx1QkFBUyxDQUFvQjtJQUN0RCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsV0FBVztRQUNqQixRQUFRLEVBQUU7WUFDTixRQUFRLEVBQUUsS0FBSztZQUNmLEtBQUssRUFBRSxHQUFHO1NBQ2I7S0FDSjtJQUNELElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxJQUFJO1FBQ1YsUUFBUSxFQUFFO1lBQ04sUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsR0FBRztTQUNiO0tBQ0o7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsWUFBWTtRQUNsQixRQUFRLEVBQUU7WUFDTixRQUFRLEVBQUUsSUFBSTtZQUNkLFFBQVEsRUFBRSxDQUFDO1NBQ2Q7S0FDSjtJQUNELElBQUksRUFBRTtRQUNG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QUMsd0JBQWdCLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHVCQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQ3BFLENBQUM7QUFDTixDQUFDLENBQUM7QUFOVyxzQkFBYyxrQkFNekI7Ozs7Ozs7Ozs7O0FDdkRGLGdDOzs7Ozs7Ozs7O0FDQUEsa0M7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEU7Ozs7O1VDSkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiZGlzdC9kaXNwbGF5aHRtbF9kZXYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENsaVBhcmFtcyxcbiAgICBPcHRpb25BZHZhbmNlZCxcbiAgICBWYWx1ZUFkdmFuY2VkLFxuICAgIEhlbHBPcHRpb24sXG59IGZyb20gXCJ+fi9zcmMvdHlwZXMvdHlwZXNUc0NsaVBhcnNlclwiO1xuaW1wb3J0IHsgQ2xpUGFyc2VyIH0gZnJvbSBcIn5+L3NyYy90c2NsaXBhcnNlclwiO1xuaW1wb3J0IGh0dHAgZnJvbSBcImh0dHBcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcblxuaW50ZXJmYWNlIFBhcmFtc0Rpc3BsYXlIdG1sIGV4dGVuZHMgQ2xpUGFyYW1zIHtcbiAgICBob3N0OiB7XG4gICAgICAgIGRhdGE6IHN0cmluZztcbiAgICAgICAgYWR2YW5jZWQ6IE9wdGlvbkFkdmFuY2VkO1xuICAgIH07XG4gICAgcG9ydDoge1xuICAgICAgICBkYXRhOiBudW1iZXI7XG4gICAgICAgIGFkdmFuY2VkOiBPcHRpb25BZHZhbmNlZDtcbiAgICB9O1xuICAgIGh0bWw6IHtcbiAgICAgICAgZGF0YTogc3RyaW5nO1xuICAgICAgICBhZHZhbmNlZDogVmFsdWVBZHZhbmNlZDtcbiAgICB9O1xuICAgIGhlbHA6IEhlbHBPcHRpb247XG4gICAgdGVzdDoge1xuICAgICAgICAvLyDmpJzoqLznlKhcbiAgICAgICAgZGF0YTogZmFsc2U7XG4gICAgICAgIGFkdmFuY2VkOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2U7XG4gICAgICAgICAgICBzaG9ydDogXCJcIjtcbiAgICAgICAgfTtcbiAgICB9O1xufVxuLy8gZGlzcGxheUh0bWwudGVzdC50c+eUqOOBq2V4cG9ydOOBl+OBpuOCi++8jlxuZXhwb3J0IGNvbnN0IGNsaXBhcnNlciA9IG5ldyBDbGlQYXJzZXI8UGFyYW1zRGlzcGxheUh0bWw+KHtcbiAgICBob3N0OiB7XG4gICAgICAgIGRhdGE6IFwiMTI3LjAuMC4xXCIsXG4gICAgICAgIGFkdmFuY2VkOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICBzaG9ydDogXCJoXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBwb3J0OiB7XG4gICAgICAgIGRhdGE6IDg3NjUsXG4gICAgICAgIGFkdmFuY2VkOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICBzaG9ydDogXCJwXCIsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBodG1sOiB7XG4gICAgICAgIGRhdGE6IFwiaW5kZXguaHRtbFwiLFxuICAgICAgICBhZHZhbmNlZDoge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICBsb2NhdGlvbjogMSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHRlc3Q6IHtcbiAgICAgICAgZGF0YTogZmFsc2UsXG4gICAgICAgIGFkdmFuY2VkOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogZmFsc2UsXG4gICAgICAgICAgICBzaG9ydDogXCJcIixcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGhlbHA6IHtcbiAgICAgICAgdXNhZ2U6IGBbVXNhZ2VdIG5vZGUgZGlzcGxheUh0bWwuanMgWy1ofC0taG9zdCBIT1NUXSBbLXB8LS1wb3J0IFBPUlRdIFstLWhlbHBdIGh0bWxcbk9wdGlvbnM6XG4taHwtLWhvc3QgSE9TVDogSG9zdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBzdGFydCBIVFRQIFNlcnZlci4gKGRlZmF1bHQ6IDEyNy4wLjAuMSlcbi1wfC0tcG9ydCBQT1JUOiBQb3J0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIHN0YXJ0IEhUVFAgU2VydmVyLiAoZGVmYXVsdDogODc2NSlcbi0taGVscCAgICAgICAgOiBEaXNwbGF5IGhlbHAuXG5odG1sICAgICAgICAgIDogSFRNTCBmaWxlIHlvdSB3YW50IHRvIGRpc3BsYXkgd2l0aCBIVFRQIFNlcnZlci5gLFxuICAgICAgICBkZXNjcmlwdGlvbjogXCJUaGlzIENMSSBzaG93cyB0aGUgcHJldmlldyBvZiBIVE1MLlwiLFxuICAgIH0sXG59KTtcblxuaWYgKHJlcXVpcmUubWFpbiA9PT0gbW9kdWxlKSB7XG4gICAgLy8gUHl0aG9u44Gn44GE44GGJ19fbmFtZV9fID09IFwiX19tYWluX19cIidcbiAgICAvLyDjgrPjg57jg7Pjg4njg6njgqTjg7PlvJXmlbDjgpLjg5Hjg7zjgrlcbiAgICBjbGlwYXJzZXIucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuICAgIC8vIEhUVFDjgrXjg7zjg5Dotbfli5Xjg7tIVE1M6KGo56S6XG4gICAgY29uc3QgY2xpUGFyYW1zOiBQYXJhbXNEaXNwbGF5SHRtbCA9IGNsaXBhcnNlci5nZXRQYXJhbXMoKTtcbiAgICBjb25zdCBzZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgXCJjb250ZW50LXR5cGVcIjogXCJ0ZXh0L2h0bWxcIiB9KTtcbiAgICAgICAgZnMuY3JlYXRlUmVhZFN0cmVhbShjbGlQYXJhbXMuaHRtbC5kYXRhKS5waXBlKHJlcyk7XG4gICAgfSk7XG4gICAgc2VydmVyLmxpc3RlbihjbGlQYXJhbXMucG9ydC5kYXRhKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYCcke2NsaVBhcmFtcy5odG1sLmRhdGF9JyBpcyBkaXNwbGF5ZWQgb24gSFRUUCBTZXJ2ZXIgbGF1bmNoZWQgd2l0aCAke2NsaVBhcmFtcy5ob3N0LmRhdGF9OiR7Y2xpUGFyYW1zLnBvcnQuZGF0YX1gXG4gICAgKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBDbGlQYXJzZXJDb25zdHJ1Y3RvckVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIC8qKlxuICAgICAqIENsaVBhcnNlcuOBruOCs+ODs+OCueODiOODqeOCr+OCv+W8leaVsOS+i+Wklu+8jlxuICAgICAqIGh0dHBzOi8vZnV0dXJlLWFyY2hpdGVjdC5naXRodWIuaW8vdHlwZXNjcmlwdC1ndWlkZS9leGNlcHRpb24uaHRtbCNpZDRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKGUpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuZXcudGFyZ2V0Lm5hbWU7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2xpUGFyc2VyQXJnRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgLyoqXG4gICAgICogQ2xpUGFyc2Vy44Gu44Kz44Oe44Oz44OJ44Op44Kk44Oz5byV5pWw5L6L5aSW77yOXG4gICAgICogaHR0cHM6Ly9mdXR1cmUtYXJjaGl0ZWN0LmdpdGh1Yi5pby90eXBlc2NyaXB0LWd1aWRlL2V4Y2VwdGlvbi5odG1sI2lkNFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGU/OiBzdHJpbmcpIHtcbiAgICAgICAgc3VwZXIoZSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5ldy50YXJnZXQubmFtZTtcbiAgICB9XG59XG4iLCIvLyBpbXBvcnQgcmVhZGxpbmUgZnJvbSBcInJlYWRsaW5lXCI7XG5pbXBvcnQge1xuICAgIENsaURhdGFUeXBlLFxuICAgIENvbW1vbk9wdGlvbixcbiAgICBPcHRpb25BZHZhbmNlZCxcbiAgICBWYWx1ZUFkdmFuY2VkLFxuICAgIGlzT3B0aW9uQWR2YW5jZWQsXG4gICAgaXNWYWx1ZUFkdmFuY2VkLFxuICAgIGlzSGVscE9wdGlvbixcbiAgICBDbGlQYXJhbXMsXG59IGZyb20gXCJ+L3R5cGVzL3R5cGVzVHNDbGlQYXJzZXJcIjtcbmltcG9ydCB7XG4gICAgQ2xpUGFyc2VyQ29uc3RydWN0b3JFcnJvcixcbiAgICBDbGlQYXJzZXJBcmdFcnJvcixcbn0gZnJvbSBcIn4vZXJyaGFuZGxlL2Vycm9yc1RzQ2xpUGFyc2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBDbGlQYXJzZXI8VCBleHRlbmRzIENsaVBhcmFtcz4ge1xuICAgIC8qKlxuICAgICAqICDjgJDkvb/nlKjkuIrjg6vjg7zjg6vjgJFcbiAgICAgKiAg4peP44K344On44O844OI44Kq44OX44K344On44Oz44GM5LiN6KaB44Gq5byV5pWw44Gr44GK44GE44Gmc2hvcnTjgq3jg7zjgavjga/nqbrmloflrZfjgpLmjIflrprjgZnjgbnjgZfvvI5cbiAgICAgKlxuICAgICAqICDjgrPjg57jg7Pjg4njg6njgqTjg7PlvJXmlbDjgpLlnotU44Gn5oyH5a6a44GX44Gm44GK44GP77yOXG4gICAgICogIC0gQXJnc1xuICAgICAqICAgICAgLSBkZWZhdWx0UGFyYW1zOlQgZXh0ZW5kcyBDbGlQYXJhbXM6XG4gICAgICovXG4gICAgcHJpdmF0ZSBwYXJhbXM6IFQ7XG4gICAgY29uc3RydWN0b3IoZGVmYXVsdFBhcmFtczogVCkge1xuICAgICAgICB0aGlzLnBhcmFtcyA9IGRlZmF1bHRQYXJhbXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoZGVmYXVsdFBhcmFtcy5oZWxwLnVzYWdlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IENsaVBhcnNlckNvbnN0cnVjdG9yRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiQ2xpUGFyc2VyIGNhbm5vdCBwZXJtaXQgc3RyaWN0bHkgdG8gdXNlIHRoaXMgQ0xJIGJlY2F1c2Ugb2YgaW52YWxpZCBpbiBjb25zdHJ1Y3RvciBhcmd1bWVudCAndXNhZ2UnLlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkZWZhdWx0UGFyYW1zKS5sZW5ndGggIT09XG4gICAgICAgICAgICAgICAgbmV3IFNldChPYmplY3Qua2V5cyhkZWZhdWx0UGFyYW1zKSkuc2l6ZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8g44Ot44Oz44Kw44Kq44OX44K344On44Oz44Gr6YeN6KSH44GM44GC44Gj44Gf5aC05ZCIXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IENsaVBhcnNlckNvbnN0cnVjdG9yRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiRm91bmQgZHVwbGljYXRlZCBsb25nIGFyZ3VtZW50IG5hbWVzLlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICB0aGlzLmdldFNob3J0QXJnTmFtZXMoKS5sZW5ndGggIT09XG4gICAgICAgICAgICAgICAgbmV3IFNldCh0aGlzLmdldFNob3J0QXJnTmFtZXMoKSkuc2l6ZVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8g44K344On44O844OI44Kq44OX44K344On44Oz44Gr6YeN6KSH44GM44GC44Gj44Gf5aC05ZCIXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IENsaVBhcnNlckNvbnN0cnVjdG9yRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiRm91bmQgZHVwbGljYXRlZCBzaG9ydCBhcmd1bWVudCBuYW1lcy5cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7ZS5uYW1lfTogJHtlLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYXJhbXMoKTogVCB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhcmFtcztcbiAgICB9XG5cbiAgICBnZXRBcmdOYW1lcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnBhcmFtcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRTaG9ydEFyZ05hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOOCt+ODp+ODvOODiOOCquODl+OCt+ODp+ODs+aMh+WumuOBquOBlyjnqbrmloflrZcp44KS6Zmk44GE44Gf44K344On44O844OI44Kq44OX44K344On44Oz44Gu5LiA6Kan44KS5Y+W5b6X44GZ44KL77yOXG4gICAgICAgICAqIC0gQXJnc1xuICAgICAgICAgKiAgICAgIC0gTm9uZVxuICAgICAgICAgKiAtIFJldHVybnNcbiAgICAgICAgICogICAgICAtIHNob3J0QXJnTmFtZXM6c3RyaW5nW106XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBzaG9ydEFyZ05hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGFyZ05hbWUgb2YgdGhpcy5nZXRBcmdOYW1lcygpKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXNPcHRpb25BZHZhbmNlZChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucGFyYW1zW2FyZ05hbWVdIGFzIENvbW1vbk9wdGlvbikuYWR2YW5jZWRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBWYWx1ZUFkdmFuY2Vk5Z6L44Gr44Kt44O8c2hvcnTjgYzlrZjlnKjjgZfjgarjgYTjga7jgafvvIxhc+OBp+Wei+e1nuOCiui+vOOBv+OBmeOCi+W/heimgeOBguOBo+OBn++8jlxuICAgICAgICAgICAgICAgIGNvbnN0IHNob3JBcmdOYW1lOiBzdHJpbmcgPSAoKHRoaXMucGFyYW1zW1xuICAgICAgICAgICAgICAgICAgICBhcmdOYW1lXG4gICAgICAgICAgICAgICAgXSBhcyBDb21tb25PcHRpb24pLmFkdmFuY2VkIGFzIE9wdGlvbkFkdmFuY2VkKS5zaG9ydDtcbiAgICAgICAgICAgICAgICBpZiAoc2hvckFyZ05hbWUgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRBcmdOYW1lcy5wdXNoKHNob3JBcmdOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNob3J0QXJnTmFtZXM7XG4gICAgfVxuXG4gICAgZ2V0QXJnTmFtZUZyb21TaG9ydEFyZ05hbWUoc2hvcnRBcmdOYW1lOiBzdHJpbmcpOiBbc3RyaW5nLCBzdHJpbmddIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIOOCt+ODp+ODvOODiOOCquODl+OCt+ODp+ODs+WQjeOBi+OCieODreODs+OCsOOCquODl+OCt+ODp+ODs+WQjeOCkuWPluW+l+OBmeOCi++8jlxuICAgICAgICAgKiAtIEFyZ3NcbiAgICAgICAgICogICAgICAtIHNob3J0QXJnTmFtZTpzdHJpbmc6IOOCt+ODp+ODvOODiOOCquODl+OCt+ODp+ODs+WQjVxuICAgICAgICAgKiAtIFJldHVybnNcbiAgICAgICAgICogICAgICAtIGFyZ05hbWU6c3RyaW5nOiDjgrfjg6fjg7zjg4jjgqrjg5bjgrfjg6fjg7PlkI3jgavlr77lv5zjgZnjgovjg63jg7PjgrDjgqrjg5fjgrfjg6fjg7PlkI3vvI5cbiAgICAgICAgICogICAgICAtIChlcnIpOnN0cmluZzog44Ko44Op44O85paH77yO44Ko44Op44O854Sh44GE5aC05ZCI44Gv56m65paH5a2X77yOXG4gICAgICAgICAqL1xuICAgICAgICBmb3IgKGNvbnN0IGFyZ05hbWUgb2YgdGhpcy5nZXRBcmdOYW1lcygpKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgaXNPcHRpb25BZHZhbmNlZChcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucGFyYW1zW2FyZ05hbWVdIGFzIENvbW1vbk9wdGlvbikuYWR2YW5jZWRcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBWYWx1ZUFkdmFuY2Vk5Z6L44Gr44Kt44O8c2hvcnTjgYzlrZjlnKjjgZfjgarjgYTjga7jgafvvIxhc+OBp+Wei+e1nuOCiui+vOOBv+OBmeOCi+W/heimgeOBguOBo+OBn++8jlxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgc2hvcnRBcmdOYW1lID09PVxuICAgICAgICAgICAgICAgICAgICAoKHRoaXMucGFyYW1zW2FyZ05hbWVdIGFzIENvbW1vbk9wdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZHZhbmNlZCBhcyBPcHRpb25BZHZhbmNlZCkuc2hvcnRcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFthcmdOYW1lLCBcIlwiXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiXCIsXG4gICAgICAgICAgICBgTm90IGZvdW5kIGFyZ3VtZW50IGZyb20gc2hvcnQgYXJndW1lbnQgJyR7c2hvcnRBcmdOYW1lfScuYCxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXRIZWxwKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IFwiXCI7XG4gICAgICAgIGlmICh0aGlzLnBhcmFtcy5oZWxwLmRlc2NyaXB0aW9uICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IGAke3RoaXMucGFyYW1zLmhlbHAuZGVzY3JpcHRpb259XFxuYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7ZGVzY3JpcHRpb259JHt0aGlzLnBhcmFtcy5oZWxwLnVzYWdlfWA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB1cGRhdGVWYWx1ZURhdGEoXG4gICAgICAgIGxvY2F0aW9uOiBudW1iZXIsXG4gICAgICAgIGRhdGE6IENsaURhdGFUeXBlXG4gICAgKTogW3N0cmluZywgc3RyaW5nXSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBWYWx1ZeOCv+OCpOODl+OBruOCs+ODnuODs+ODieODqeOCpOODs+W8leaVsOOBruWApOOCkuabtOaWsOOBmeOCi++8jlxuICAgICAgICAgKiAtIEFyZ3NcbiAgICAgICAgICogICAgICAtIGxvY2F0aW9uOm51bWJlcjogVmFsdWXjgqrjg5fjgrfjg6fjg7Pjga7kvY3nva7vvI5cbiAgICAgICAgICogICAgICAtIGRhdGE6Q2xpRGF0YVR5cGU6IFZhbHVl44Kq44OX44K344On44Oz44Gu44OH44O844K/77yOXG4gICAgICAgICAqIC0gUmV0dXJuc1xuICAgICAgICAgKiAgICAgIC0gYXJnTmFtZTpzdHJpbmc6IOagvOe0jeWFiOOBruODreODs+OCsOOCquODl+OCt+ODp+ODs+WQje+8jlxuICAgICAgICAgKiAgICAgIC0gKGVycik6c3RyaW5nOiDjgqjjg6njg7zmlofvvI7jgqjjg6njg7znhKHjgYTloLTlkIjjga/nqbrmloflrZfvvI5cbiAgICAgICAgICovXG4gICAgICAgIGZvciAoY29uc3QgYXJnTmFtZSBvZiB0aGlzLmdldEFyZ05hbWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBpc1ZhbHVlQWR2YW5jZWQoKHRoaXMucGFyYW1zW2FyZ05hbWVdIGFzIENvbW1vbk9wdGlvbikuYWR2YW5jZWQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBPcHRpb25BZHZhbmNlZOWei+OBq+OCreODvGxvY2F0aW9u44GM5a2Y5Zyo44GX44Gq44GE44Gu44Gn77yMYXPjgaflnovntZ7jgorovrzjgb/jgZnjgovlv4XopoHjgYLjgaPjgZ/vvI5cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uID09PVxuICAgICAgICAgICAgICAgICAgICAoKHRoaXMucGFyYW1zW2FyZ05hbWVdIGFzIENvbW1vbk9wdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZHZhbmNlZCBhcyBWYWx1ZUFkdmFuY2VkKS5sb2NhdGlvblxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtRGF0YShhcmdOYW1lLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFthcmdOYW1lLCBcIlwiXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcIlwiLCBgTG9jYXRpb24gJyR7bG9jYXRpb259JyBpcyBvdXQgb2YgYXJndW1lbnQgdmFsdWVzLmBdO1xuICAgIH1cblxuICAgIHByaXZhdGUgdXBkYXRlUGFyYW1EYXRhKGFyZ05hbWU6IHN0cmluZywgZGF0YTogQ2xpRGF0YVR5cGUpOiBzdHJpbmcge1xuICAgICAgICAvKipcbiAgICAgICAgICogdGhpcy5wYXJhbXNbYXJnTmFtZV0uZGF0YeOBruWei+OBq+W/nOOBmOOBpuWei+OCreODo+OCueODiOOBl+OBpuS7o+WFpeOBmeOCi++8jlxuICAgICAgICAgKlxuICAgICAgICAgKiAtIEFyZ3NcbiAgICAgICAgICogICAgICAtIGFyZ05hbWU6c3RyaW5nOiDjg63jg7PjgrDjgqrjg5fjgrfjg6fjg7PlkI3vvI5cbiAgICAgICAgICogICAgICAtIGRhdGE6Q2xpRGF0YVR5cGU6IOS7o+WFpeOBmeOCi+WApO+8jmFyZ05hbWXjga7lnovjgYxib29sZWFu44Gu5aC05ZCI44Gv5LiN6KaB77yOXG4gICAgICAgICAqIC0gUmV0dXJuc1xuICAgICAgICAgKiAgICAgIC0gKGVycik6c3RyaW5nOiDjgqjjg6njg7zmlofvvI7jgqjjg6njg7znhKHjgYTloLTlkIjjga/nqbrmloflrZfvvI5cbiAgICAgICAgICovXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiAodGhpcy5wYXJhbXNbYXJnTmFtZV0gYXMgQ29tbW9uT3B0aW9uKS5kYXRhKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgICAgICAgICAgICAgICBpZiAoKGRhdGEgYXMgc3RyaW5nKS5zdGFydHNXaXRoKFwiLVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RyaW5n5Z6L44GuT3B0aW9uYWzlvJXmlbDjga7nm7TlvozjgavliKXjga7lvJXmlbDlkI3jgYzmuKHjgZXjgozjgabjgYTjgovjgZPjgajjgpLmpJznn6XjgZfjgZ/jgonjgqjjg6njg7zvvI5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDbGlQYXJzZXJBcmdFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgRGV0ZWN0ZWQgZGFuZ2VyIGluIGNvbnNlY3V0aXZlIGFyZ3VtZW50cyAnJHthcmdOYW1lfScgYW5kICcke2RhdGF9Jy4gSWYgeW91IHdhbnQgc2V0IHN0cmluZ3Mgc3RhcnQgd2l0aCAnLScsIHlvdSBzaG91bGQgZW5jbG9zZSB0aGUgc3RyaW5nIHdpdGggcXVvdGVzKHNpbmdsZSBvciBkb3VibGUpLmBcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKC8oJy4qJ3xcIi4qXCIpLy50ZXN0KGRhdGEgYXMgc3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RyaW5n5Z6LT3B0aW9uYWzlvJXmlbDjga7jg4fjg7zjgr/jgYzjgq/jgqrjg7zjg4jjgaflm7Ljgb7jgozjgabjgYTjgZ/loLTlkIjjga/vvIzkuK3ouqvjgpLmipzjgY3lh7rjgZfjgabmoLzntI3vvI5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2phL2RvY3MvV2ViL0phdmFTY3JpcHQvR3VpZGUvUmVndWxhcl9FeHByZXNzaW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly93d3ctY3JlYXRvcnMuY29tL2FyY2hpdmVzLzU0NjJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogUmVnRXhwTWF0Y2hBcnJheSB8IG51bGwgPSAoZGF0YSBhcyBzdHJpbmcpLm1hdGNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8oPzw9KCd8XCIpKS4qPyg/PSgnfFwiKSkvXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSByZXN1bHRbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucGFyYW1zW2FyZ05hbWVdIGFzIENvbW1vbk9wdGlvbikuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICAgICAgICAgIC8vIGJvb2xlYW7jgqrjg5fjgrfjg6fjg7Pjga/vvIzmjIflrprjgZXjgozjgZ/loLTlkIjjgavjg4fjg5Xjgqnjg6vjg4jlgKTjgpLlj43ou6LjgZXjgZvjgovvvI5cbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucGFyYW1zW2FyZ05hbWVdIGFzIENvbW1vbk9wdGlvbikuZGF0YSA9ICEodGhpcy5wYXJhbXNbXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdOYW1lXG4gICAgICAgICAgICAgICAgICAgIF0gYXMgQ29tbW9uT3B0aW9uKS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc05hTihOdW1iZXIoZGF0YSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucGFyYW1zW2FyZ05hbWVdIGFzIENvbW1vbk9wdGlvbikuZGF0YSA9IE51bWJlcihkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2xpRGF0YVR5cGXjgafmjIflrprjgZfjgZ/lnovjgafjgarjgYvjgaPjgZ/jgolUeXBlRXJyb3LmipXjgZLjgotcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgICAgICAgICAgIC8vIOWkieaVsOWQjeOBp+OBr+OBquOBj+OCs+ODnuODs+ODieODqeOCpOODs+W8leaVsOWQjeOBp+OCqOODqeODvOaWh+e9ruOBjeaPm+OBiOOBpuihqOekuuOBmeOCi++8jlxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIGAke1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIH06IEludmFsaWQgdHlwZSBpbiBhcmd1bWVudCAnJHthcmdOYW1lfScoZXhwZWN0ZWQgJHt0eXBlb2YgKHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wYXJhbXNbYXJnTmFtZV0gYXMgQ29tbW9uT3B0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmRhdGF9LCBidXQgJHt0eXBlb2YgZGF0YX0pLmBcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke2UubmFtZX06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0SW5pdGlhbElzVXBkYXRlZFJlcXVyZWRzKCk6IHsgW2FyZ05hbWU6IHN0cmluZ106IGJvb2xlYW4gfSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXF1aXJlZOOBruOCs+ODnuODs+ODieODqeOCpOODs+W8leaVsOOBruWtmOWcqOeiuuiqjeOBruWIneacn+eKtuaFi+OCkuWPluW+l+OBmeOCi++8jlxuICAgICAgICAgKiAtIEFyZ3NcbiAgICAgICAgICogICAgICAtIE5vbmVcbiAgICAgICAgICogLSBSZXR1cm5zXG4gICAgICAgICAqICAgICAgLSBpc1VwZGF0ZWRSZXF1aXJlZHM6e1thcmdOYW1lOiBzdHJpbmddOiBib29sZWFufTogUmVxdWlyZWTjga7jgqrjg5fjgrfjg6fjg7Pjga7mm7TmlrDjg5Xjg6njgrDjg6rjgrnjg4jvvI5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IGlzVXBkYXRlZFJlcXVpcmVkczogeyBbYXJnTmFtZTogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gICAgICAgIGZvciAoY29uc3QgYXJnTmFtZSBvZiB0aGlzLmdldEFyZ05hbWVzKCkpIHtcbiAgICAgICAgICAgIGlmIChpc0hlbHBPcHRpb24odGhpcy5wYXJhbXNbYXJnTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgLy8gSGVscE9wdGlvbuOBruWgtOWQiOOBr+OCueODq+ODvO+8jlxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICgodGhpcy5wYXJhbXNbYXJnTmFtZV0gYXMgQ29tbW9uT3B0aW9uKS5hZHZhbmNlZCBhc1xuICAgICAgICAgICAgICAgICAgICB8IE9wdGlvbkFkdmFuY2VkXG4gICAgICAgICAgICAgICAgICAgIHwgVmFsdWVBZHZhbmNlZCkucmVxdWlyZWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlzVXBkYXRlZFJlcXVpcmVkc1thcmdOYW1lXSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpc1VwZGF0ZWRSZXF1aXJlZHM7XG4gICAgfVxuXG4gICAgcGFyc2UoYXJndjogc3RyaW5nW10pOiBDbGlQYXJzZXI8VD4ge1xuICAgICAgICBjb25zdCBhcmdOYW1lczogc3RyaW5nW10gPSB0aGlzLmdldEFyZ05hbWVzKCk7XG4gICAgICAgIGNvbnN0IGlzVXBkYXRlZFJlcXVpcmVkcyA9IHRoaXMuZ2V0SW5pdGlhbElzVXBkYXRlZFJlcXVyZWRzKCk7XG4gICAgICAgIGxldCBjdXJyZW50TG9jYXRpb24gPSAxO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8g44Kz44Oe44Oz44OJ44Op44Kk44Oz5byV5pWw44GvKDDnlarnm67jgYvjgonlp4vjgb7jgovjgYbjgaHjga4pMueVquebruOBi+OCieWPluW+l+OBp+OBjeOCi++8jlxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDI7IGkgPCBhcmd2Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJnOiBzdHJpbmcgPSBhcmd2W2ldO1xuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAg5Lul6ZmN77yM44Ot44Oz44Kw44Kq44OX44K344On44Oz44Gu54m55a6a44KS44GX44GmYXJnTmFtZeOBq+agvOe0jeOBmeOCi++8jlxuICAgICAgICAgICAgICAgIFZhbHVl5byV5pWw44Gu5aC05ZCI44GvYXJnTmFtZeOBr+epuuaWh+Wtl+OBruOBvuOBvu+8jlxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGxldCBhcmdOYW1lID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAoYXJnLnN0YXJ0c1dpdGgoXCItLVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDjg63jg7PjgrDjgqrjg5fjgrfjg6fjg7Pjga7loLTlkIjvvIzjgqrjg5fjgrfjg6fjg7PlkI3jgpLjgZ3jga7jgb7jgb7lj5blvpfvvI5cbiAgICAgICAgICAgICAgICAgICAgYXJnTmFtZSA9IGFyZy5zbGljZSgyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhcmdOYW1lcy5pbmNsdWRlcyhhcmdOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IENsaVBhcnNlckFyZ0Vycm9yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBDbGlQYXJzZXIgY2Fubm90IGZpbmQgYXJndW1lbnQgJyR7YXJnTmFtZX0nLmBcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGFyZy5zdGFydHNXaXRoKFwiLVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyDjgrfjg6fjg7zjg4jjgqrjg5fjgrfjg6fjg7Pjga7loLTlkIjvvIzjg63jg7PjgrDjgqrjg5fjgrfjg6fjg7PlkI3jgpLlj5blvpfjgZfjgabmoLzntI3vvI5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW3JlcywgZXJyXTogW1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIF0gPSB0aGlzLmdldEFyZ05hbWVGcm9tU2hvcnRBcmdOYW1lKGFyZy5zbGljZSgxKSk7XG4gICAgICAgICAgICAgICAgICAgIGFyZ05hbWUgPSByZXM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBDbGlQYXJzZXJBcmdFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICDku6XpmY3vvIznibnlrprjgZfjgZ/jg63jg7PjgrDjgqrjg5fjgrfjg6fjg7MoVmFsdWXjga7loLTlkIjjga/nqbrmloflrZcp44KS5Z+644Gr44GX44Gm5Yem55CG77yOXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKGlzSGVscE9wdGlvbih0aGlzLnBhcmFtc1thcmdOYW1lXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGVscE9wdGlvbuOBr1wiaGVscFwi44Gu44G/6Kqt44G/6L6844KA44Gu44Gn54Sh6KaW44GZ44KL5LuV5qeY44Gr44GZ44KL77yOXG4gICAgICAgICAgICAgICAgICAgIGlmIChhcmdOYW1lID09PSBcImhlbHBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJoZWxwXCLjga7loLTlkIjvvIxnZXRIZWxwKCnjgafmlofjgpLlj5blvpfjgZfjgabooajnpLrjgZfvvIzlvLfliLbntYLkuobvvI5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0SGVscCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFyZ05hbWUgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3B0aW9uYWzlvJXmlbDjga7loLTlkIhcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mICh0aGlzLnBhcmFtc1thcmdOYW1lXSBhcyBDb21tb25PcHRpb24pLmRhdGEgIT09XG4gICAgICAgICAgICAgICAgICAgICAgICBcImJvb2xlYW5cIlxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJvb2xlYW7ku6XlpJbjga/lvozntprjgavlgKTjgYzjgYLjgovliY3mj5DjgajjgZnjgovvvI5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUGFyYW1EYXRhKGFyZ05hbWUsIGFyZ3ZbKytpXSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBhcmFtRGF0YShhcmdOYW1lLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbHVl5byV5pWw44Gu5aC05ZCIXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IFtyZXMsIGVycl06IFtzdHJpbmcsIHN0cmluZ10gPSB0aGlzLnVwZGF0ZVZhbHVlRGF0YShcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMb2NhdGlvbisrLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbHVl5byV5pWw44Gu5aC05ZCI44Gv44GT44Gu44K/44Kk44Of44Oz44Kw44GnYXJnTmFtZeOCkueJueWumuOBl++8jOW+jOe2muOBruWHpueQhuOBp+S9v+OBhu+8jlxuICAgICAgICAgICAgICAgICAgICBhcmdOYW1lID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgQ2xpUGFyc2VyQXJnRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAg5Lul6ZmN77yMSGVscE9wdGlvbuWei+S7peWkluOBruWgtOWQiOOBq1JlcXVpcmVk44Gu5pyJ54Sh6KmV5L6h5pu05paw77yOXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKCFpc0hlbHBPcHRpb24odGhpcy5wYXJhbXNbYXJnTmFtZV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICgodGhpcy5wYXJhbXNbYXJnTmFtZV0gYXMgQ29tbW9uT3B0aW9uKS5hZHZhbmNlZCBhc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgT3B0aW9uQWR2YW5jZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8IFZhbHVlQWR2YW5jZWQpLnJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNVcGRhdGVkUmVxdWlyZWRzW2FyZ05hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gcmVxdWlyZWTjga7oqZXkvqFcbiAgICAgICAgICAgIGNvbnN0IG5vdFVwZGF0ZVJlcXVpcmVkQXJnTmFtZXMgPSBPYmplY3Qua2V5cyhcbiAgICAgICAgICAgICAgICBpc1VwZGF0ZWRSZXF1aXJlZHNcbiAgICAgICAgICAgICkuZmlsdGVyKChhcmdOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIWlzVXBkYXRlZFJlcXVpcmVkc1thcmdOYW1lXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5vdFVwZGF0ZVJlcXVpcmVkQXJnTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBDbGlQYXJzZXJBcmdFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgYENsaVBhcnNlciBjYW5ub3QgZmluZCByZXF1aXJlZCBhcmd1bWVudHMuKCR7bm90VXBkYXRlUmVxdWlyZWRBcmdOYW1lc1xuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoYXJnTmFtZSkgPT4gYCcke2FyZ05hbWV9J2ApXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbihcIiwgXCIpfSlgXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCh0aGlzLnBhcmFtcy50ZXN0IGFzIENvbW1vbk9wdGlvbikuZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vIENMSeOBruODhuOCueODiOODouODvOODieOBquOCieWPluW+l+ODkeODqeODoeODvOOCv+OCkuWHuuWKm+OBruOBv+OBp+e1guS6hu+8jlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vd3d3LmNvZGVncmVwcGVyLmNvbS9jb2RlLWV4YW1wbGVzL2phdmFzY3JpcHQvY2xlYXIrdGVybWluYWwrbm9kZStqc1xuICAgICAgICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKFwiXFx4MUJjXCIpO1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiXFwwMzNbMkpcIik7IC8vIFdpbmRvd3PnlKjvvJ/jg4jjg6njg7Pjgrnjg5HjgqTjg6vjgZfjgaXjgonjgYTvvI5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBhcmFtcyk7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke2UubmFtZX06ICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxufVxuIiwiLyoqXG4gKiDku6XkuIvvvIzjgrPjg57jg7Pjg4njg6njgqTjg7PlvJXmlbDjgavmuKHjgZnjg4fjg7zjgr/jga7lnovlrprnvqnvvI5cbiAqL1xuZXhwb3J0IHR5cGUgQ2xpRGF0YVR5cGUgPSBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xuXG4vKipcbiAqIOS7peS4i++8jOOCs+ODnuODs+ODieODqeOCpOODs+W8leaVsOOBrueorumhnuOBruWei+Wumue+qe+8jlxuICovXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbkFkdmFuY2VkIHtcbiAgICByZXF1aXJlZDogYm9vbGVhbjtcbiAgICBzaG9ydDogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGlzT3B0aW9uQWR2YW5jZWQgPSAoYXJnOiBhbnkpOiBhcmcgaXMgT3B0aW9uQWR2YW5jZWQgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIGFyZyAhPT0gbnVsbCAmJlxuICAgICAgICB0eXBlb2YgYXJnID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIHR5cGVvZiAoYXJnIGFzIE9wdGlvbkFkdmFuY2VkKS5zaG9ydCA9PT0gXCJzdHJpbmdcIlxuICAgICk7XG59O1xuZXhwb3J0IGludGVyZmFjZSBWYWx1ZUFkdmFuY2VkIHtcbiAgICByZXF1aXJlZDogYm9vbGVhbjtcbiAgICBsb2NhdGlvbjogbnVtYmVyOyAvLyDlt6bjgYvjgonkvZXnlarnm64oMeOBi+OCieWni+OCgeOCiylcbn1cbmV4cG9ydCBjb25zdCBpc1ZhbHVlQWR2YW5jZWQgPSAoYXJnOiBhbnkpOiBhcmcgaXMgVmFsdWVBZHZhbmNlZCA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgYXJnICE9PSBudWxsICYmXG4gICAgICAgIHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgdHlwZW9mIChhcmcgYXMgVmFsdWVBZHZhbmNlZCkubG9jYXRpb24gPT09IFwibnVtYmVyXCJcbiAgICApO1xufTtcbmV4cG9ydCBpbnRlcmZhY2UgSGVscE9wdGlvbiB7XG4gICAgdXNhZ2U6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xufVxuZXhwb3J0IGNvbnN0IGlzSGVscE9wdGlvbiA9IChhcmc6IGFueSk6IGFyZyBpcyBIZWxwT3B0aW9uID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgICBhcmcgIT09IG51bGwgJiZcbiAgICAgICAgdHlwZW9mIGFyZyA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICB0eXBlb2YgKGFyZyBhcyBIZWxwT3B0aW9uKS51c2FnZSA9PT0gXCJzdHJpbmdcIlxuICAgICk7XG59O1xuXG50eXBlIENsaUFkdmFuY2VkVHlwZSA9IE9wdGlvbkFkdmFuY2VkIHwgVmFsdWVBZHZhbmNlZDtcbmV4cG9ydCBpbnRlcmZhY2UgQ29tbW9uT3B0aW9uIHtcbiAgICAvLyBib29sZWFu5Lul5aSW44Gv5b6M57aa44Gr5YCk44GM44GC44KL5YmN5o+Q44Go44GZ44KL77yOXG4gICAgLy8gYm9vbGVhbuOCquODl+OCt+ODp+ODs+OBr++8jOaMh+WumuOBleOCjOOBn+WgtOWQiOOBq+ODh+ODleOCqeODq+ODiOWApOOCkuWPjei7ouOBleOBm+OCi+OCguOBruOBqOOBmeOCi++8jlxuICAgIGRhdGE6IENsaURhdGFUeXBlOyAvLyDlvJXmlbDjg4fjg7zjgr/jgpLmoLzntI3vvI5cbiAgICBhZHZhbmNlZDogQ2xpQWR2YW5jZWRUeXBlO1xufVxuZXhwb3J0IGNvbnN0IGlzQ29tbW9uT3B0aW9uID0gKGFyZzogYW55KTogYXJnIGlzIENvbW1vbk9wdGlvbiA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgYXJnICE9PSBudWxsICYmXG4gICAgICAgIHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgKGlzT3B0aW9uQWR2YW5jZWQoYXJnLmFkdmFuY2VkKSB8fCBpc1ZhbHVlQWR2YW5jZWQoYXJnLmFkdmFuY2VkKSkgLy8gVE9ETzog5b6u5aaZ44GL44KCXG4gICAgKTtcbn07XG5cbi8qKlxuICog5Lul5LiL77yM44Kz44Oe44Oz44OJ44Op44Kk44Oz5byV5pWw44KS5qC857SN44GZ44KL5aSJ5pWw44Gu5Z6L5a6a576p77yOXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpUGFyYW1zIHtcbiAgICAvLyDjgq3jg7zjga/jg63jg7PjgrDjgqrjg5fjgrfjg6fjg7PvvI5cbiAgICBbYXJnTmFtZTogc3RyaW5nXTogQ29tbW9uT3B0aW9uIHwgSGVscE9wdGlvbjtcbiAgICBoZWxwOiBIZWxwT3B0aW9uOyAvLyBIZWxwT3B0aW9u44GvXCJoZWxwXCLjga7jgb/oqq3jgb/ovrzjgoDvvI5cbiAgICB0ZXN0OiB7XG4gICAgICAgIGRhdGE6IGZhbHNlO1xuICAgICAgICBhZHZhbmNlZDoge1xuICAgICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlO1xuICAgICAgICAgICAgc2hvcnQ6IFwiXCI7XG4gICAgICAgIH07XG4gICAgfTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOzsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHRsb2FkZWQ6IGZhbHNlLFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcblx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5tZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlLnBhdGhzID0gW107XG5cdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0cmV0dXJuIG1vZHVsZTtcbn07IiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc2FtcGxlL21haW4vZGlzcGxheUh0bWwudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9
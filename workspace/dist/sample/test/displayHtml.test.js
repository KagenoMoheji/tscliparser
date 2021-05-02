"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testTsCliParser_1 = require("~~/tscliparser/test/testTsCliParser");
var displayHtml_1 = require("~~/sample/main/displayHtml");
describe("test CLI displayHtml", function () {
    testTsCliParser_1.testTsCliParser({
        cliparser: displayHtml_1.cliparser,
        cmd: "node webpack_build/dist/displayhtml_dev.js -p 333 -h 1.1.1.1 test.html",
    }, {
        params: {
            port: 333,
            host: "1.1.1.1",
            html: "test.html",
        },
    });
});
//# sourceMappingURL=displayHtml.test.js.map
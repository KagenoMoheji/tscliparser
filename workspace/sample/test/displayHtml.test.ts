import { testTsCliParser } from "~~/tscliparser/test/testTsCliParser";
// from "tscliparser/test/testTsCliParser";
import { ParamsDisplayHtml, cliparser } from "~~/sample/main/displayHtml";

describe("test CLI displayHtml", () => {
    testTsCliParser<ParamsDisplayHtml>(
        {
            cliparser: cliparser,
            cmd:
                "node webpack_build/dist/displayhtml_dev.js -p 333 -h 1.1.1.1 test.html",
        },
        {
            params: {
                port: 333,
                host: "1.1.1.1",
                html: "test.html",
            },
        }
    );
});

import * as assert from "assert";
import {
    CliDataType,
    CommonOption
} from "~~/src/types/typesTsCliParser";
import {
    cliparser,
} from "~~/sample/main/displayHtml";

describe("test CLI displayHtml", () => {
    const testExecDisplayHtml = (
        cmd: string,
        expesct: {
            params: {
                [argName: string]: CliDataType;
            };
            // エラー文など想定する出力を指定する場合．
            errMsg?: string;
        }
    ) => {
        /**
         *  - Args
         *      - cmd:string: 
         *      - expect
         *          - params:{[string]: CliDataType}: 想定する出力．
         *          - err:string: 例外テストの場合の想定するエラー文．
         */
        const args: string[] = cmd.split(" ");
        cliparser.parse(args);
        // console.log(cliparser.getParams());
        for (const argName of Object.keys(expesct.params)) {
            it("Each argument data should match.", () => {
                assert.strictEqual(
                    (cliparser.getParams()[argName] as CommonOption).data,
                    expesct.params[argName]
                );
            });
        }
    };

    testExecDisplayHtml(
        "node webpack_build/dist/displayhtml_dev.js -p 333 -h 1.1.1.1 test.html",
        {
            params: {
                port: 333,
                host: "1.1.1.1",
                html: "test.html"
            },
        }
    );
});

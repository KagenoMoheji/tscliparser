import * as assert from "assert";
import { CliParser } from "~~/tscliparser/tscliparser";
import {
    CliParams,
    CliDataType,
    CommonOption,
} from "~~/tscliparser/types/typesTsCliParser";

export const testTsCliParser = <T extends CliParams>(
    input: {
        cliparser: CliParser<T>;
        cmd: string; // Start "node ~.js".
    },
    expect: {
        params: {
            [argName: string]: CliDataType;
        };
    }
) => {
    /**
     *  - Args
     *      - input
     *          - cliparser: CliParser<T extends CliParams>: tscliparserのインスタンス．
     *          - cmd:string: "node ~.js"から始まるコマンド．
     *      - expect
     *          - params:{[string]: CliDataType}: input[cmd]で入力した各引数の想定する出力．
     */
    const args: string[] = input.cmd.split(" ");
    input.cliparser.parse(args);
    // console.log(input.cliparser.getParams());
    for (const argName of Object.keys(expect.params)) {
        it("Each argument data should match.", () => {
            assert.strictEqual(
                (input.cliparser.getParams()[argName] as CommonOption).data,
                expect.params[argName]
            );
        });
    }
};

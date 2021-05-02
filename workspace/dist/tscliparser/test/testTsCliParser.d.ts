import { CliParser } from "~~/tscliparser/tscliparser";
import { CliParams, CliDataType } from "~~/tscliparser/types/typesTsCliParser";
export declare const testTsCliParser: <T extends CliParams>(input: {
    cliparser: CliParser<T>;
    cmd: string;
}, expect: {
    params: {
        [argName: string]: CliDataType;
    };
}) => void;

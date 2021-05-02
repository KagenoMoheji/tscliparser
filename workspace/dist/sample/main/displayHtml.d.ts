import { CliParams, OptionAdvanced, ValueAdvanced, HelpOption } from "~~/tscliparser/types/typesTsCliParser";
import { CliParser } from "~~/tscliparser/tscliparser";
export interface ParamsDisplayHtml extends CliParams {
    host: {
        data: string;
        advanced: OptionAdvanced;
    };
    port: {
        data: number;
        advanced: OptionAdvanced;
    };
    html: {
        data: string;
        advanced: ValueAdvanced;
    };
    help: HelpOption;
    test: {
        data: false;
        advanced: {
            required: false;
            short: "";
        };
    };
}
export declare const cliparser: CliParser<ParamsDisplayHtml>;

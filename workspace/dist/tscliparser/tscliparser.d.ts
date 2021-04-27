import { CliParams } from "~~/tscliparser/types/typesTsCliParser";
export declare class CliParser<T extends CliParams> {
    private params;
    constructor(defaultParams: T);
    getParams(): T;
    getArgNames(): string[];
    private getShortArgNames;
    getArgNameFromShortArgName(shortArgName: string): [string, string];
    getHelp(): string;
    private updateValueData;
    private updateParamData;
    private getInitialIsUpdatedRequreds;
    parse(argv: string[]): CliParser<T>;
}

export declare type CliDataType = string | number | boolean;
export interface OptionAdvanced {
    required: boolean;
    short: string;
}
export declare const isOptionAdvanced: (arg: any) => arg is OptionAdvanced;
export interface ValueAdvanced {
    required: boolean;
    location: number;
}
export declare const isValueAdvanced: (arg: any) => arg is ValueAdvanced;
export interface HelpOption {
    usage: string;
    description: string;
}
export declare const isHelpOption: (arg: any) => arg is HelpOption;
declare type CliAdvancedType = OptionAdvanced | ValueAdvanced;
export interface CommonOption {
    data: CliDataType;
    advanced: CliAdvancedType;
}
export declare const isCommonOption: (arg: any) => arg is CommonOption;
export interface CliParams {
    [argName: string]: CommonOption | HelpOption;
    help: HelpOption;
    test: {
        data: false;
        advanced: {
            required: false;
            short: "";
        };
    };
}
export {};

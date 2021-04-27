/**
 * 以下，コマンドライン引数に渡すデータの型定義．
 */
export type CliDataType = string | number | boolean;

/**
 * 以下，コマンドライン引数の種類の型定義．
 */
export interface OptionAdvanced {
    required: boolean;
    short: string;
}
export const isOptionAdvanced = (arg: any): arg is OptionAdvanced => {
    return (
        arg !== null &&
        typeof arg === "object" &&
        typeof (arg as OptionAdvanced).short === "string"
    );
};
export interface ValueAdvanced {
    required: boolean;
    location: number; // 左から何番目(1から始める)
}
export const isValueAdvanced = (arg: any): arg is ValueAdvanced => {
    return (
        arg !== null &&
        typeof arg === "object" &&
        typeof (arg as ValueAdvanced).location === "number"
    );
};
export interface HelpOption {
    usage: string;
    description: string;
}
export const isHelpOption = (arg: any): arg is HelpOption => {
    return (
        arg !== null &&
        typeof arg === "object" &&
        typeof (arg as HelpOption).usage === "string"
    );
};

type CliAdvancedType = OptionAdvanced | ValueAdvanced;
export interface CommonOption {
    // boolean以外は後続に値がある前提とする．
    // booleanオプションは，指定された場合にデフォルト値を反転させるものとする．
    data: CliDataType; // 引数データを格納．
    advanced: CliAdvancedType;
}
export const isCommonOption = (arg: any): arg is CommonOption => {
    return (
        arg !== null &&
        typeof arg === "object" &&
        (isOptionAdvanced(arg.advanced) || isValueAdvanced(arg.advanced)) // TODO: 微妙かも
    );
};

/**
 * 以下，コマンドライン引数を格納する変数の型定義．
 */
export interface CliParams {
    // キーはロングオプション．
    [argName: string]: CommonOption | HelpOption;
    help: HelpOption; // HelpOptionは"help"のみ読み込む．
    test: {
        data: false;
        advanced: {
            required: false;
            short: "";
        };
    };
}

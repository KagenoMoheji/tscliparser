// import readline from "readline";
import {
    CliDataType,
    CommonOption,
    OptionAdvanced,
    ValueAdvanced,
    isOptionAdvanced,
    isValueAdvanced,
    isHelpOption,
    CliParams,
} from "~~/tscliparser/types/typesTsCliParser";
import {
    CliParserConstructorError,
    CliParserArgError,
} from "~~/tscliparser/errhandle/errorsTsCliParser";

export class CliParser<T extends CliParams> {
    /**
     *  【使用上ルール】
     *  ●ショートオプションが不要な引数においてshortキーには空文字を指定すべし．
     *
     *  コマンドライン引数を型Tで指定しておく．
     *  - Args
     *      - defaultParams:T extends CliParams:
     */
    private params: T;
    constructor(defaultParams: T) {
        this.params = defaultParams;
        try {
            if (defaultParams.help.usage === "") {
                throw new CliParserConstructorError(
                    "CliParser cannot permit strictly to use this CLI because of invalid in constructor argument 'usage'."
                );
            }
            if (
                Object.keys(defaultParams).length !==
                new Set(Object.keys(defaultParams)).size
            ) {
                // ロングオプションに重複があった場合
                throw new CliParserConstructorError(
                    "Found duplicated long argument names."
                );
            }
            if (
                this.getShortArgNames().length !==
                new Set(this.getShortArgNames()).size
            ) {
                // ショートオプションに重複があった場合
                throw new CliParserConstructorError(
                    "Found duplicated short argument names."
                );
            }
        } catch (e) {
            console.error(`${e.name}: ${e.message}`);
            process.exit(1);
        }
    }

    getParams(): T {
        return this.params;
    }

    getArgNames(): string[] {
        return Object.keys(this.params);
    }

    private getShortArgNames(): string[] {
        /**
         * ショートオプション指定なし(空文字)を除いたショートオプションの一覧を取得する．
         * - Args
         *      - None
         * - Returns
         *      - shortArgNames:string[]:
         */
        const shortArgNames: string[] = [];
        for (const argName of this.getArgNames()) {
            if (
                isOptionAdvanced(
                    (this.params[argName] as CommonOption).advanced
                )
            ) {
                // ValueAdvanced型にキーshortが存在しないので，asで型絞り込みする必要あった．
                const shorArgName: string = ((this.params[
                    argName
                ] as CommonOption).advanced as OptionAdvanced).short;
                if (shorArgName !== "") {
                    shortArgNames.push(shorArgName);
                }
            }
        }
        return shortArgNames;
    }

    getArgNameFromShortArgName(shortArgName: string): [string, string] {
        /**
         * ショートオプション名からロングオプション名を取得する．
         * - Args
         *      - shortArgName:string: ショートオプション名
         * - Returns
         *      - argName:string: ショートオブション名に対応するロングオプション名．
         *      - (err):string: エラー文．エラー無い場合は空文字．
         */
        for (const argName of this.getArgNames()) {
            if (
                isOptionAdvanced(
                    (this.params[argName] as CommonOption).advanced
                )
            ) {
                // ValueAdvanced型にキーshortが存在しないので，asで型絞り込みする必要あった．
                if (
                    shortArgName ===
                    ((this.params[argName] as CommonOption)
                        .advanced as OptionAdvanced).short
                ) {
                    return [argName, ""];
                }
            }
        }
        return [
            "",
            `Not found argument from short argument '${shortArgName}'.`,
        ];
    }

    getHelp(): string {
        let description = "";
        if (this.params.help.description !== "") {
            description = `${this.params.help.description}\n`;
        }
        return `${description}${this.params.help.usage}`;
    }

    private updateValueData(
        location: number,
        data: CliDataType
    ): [string, string] {
        /**
         * Valueタイプのコマンドライン引数の値を更新する．
         * - Args
         *      - location:number: Valueオプションの位置．
         *      - data:CliDataType: Valueオプションのデータ．
         * - Returns
         *      - argName:string: 格納先のロングオプション名．
         *      - (err):string: エラー文．エラー無い場合は空文字．
         */
        for (const argName of this.getArgNames()) {
            if (
                isValueAdvanced((this.params[argName] as CommonOption).advanced)
            ) {
                // OptionAdvanced型にキーlocationが存在しないので，asで型絞り込みする必要あった．
                if (
                    location ===
                    ((this.params[argName] as CommonOption)
                        .advanced as ValueAdvanced).location
                ) {
                    this.updateParamData(argName, data);
                    return [argName, ""];
                }
            }
        }
        return ["", `Location '${location}' is out of argument values.`];
    }

    private updateParamData(argName: string, data: CliDataType): string {
        /**
         * this.params[argName].dataの型に応じて型キャストして代入する．
         *
         * - Args
         *      - argName:string: ロングオプション名．
         *      - data:CliDataType: 代入する値．argNameの型がbooleanの場合は不要．
         * - Returns
         *      - (err):string: エラー文．エラー無い場合は空文字．
         */
        try {
            switch (typeof (this.params[argName] as CommonOption).data) {
                case "string":
                    if ((data as string).startsWith("-")) {
                        // string型のOptional引数の直後に別の引数名が渡されていることを検知したらエラー．
                        throw new CliParserArgError(
                            `Detected danger in consecutive arguments '${argName}' and '${data}'. If you want set strings start with '-', you should enclose the string with quotes(single or double).`
                        );
                    }
                    if (/('.*'|".*")/.test(data as string)) {
                        // string型Optional引数のデータがクオートで囲まれていた場合は，中身を抜き出して格納．
                        // https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_Expressions
                        // https://www-creators.com/archives/5462
                        const result: RegExpMatchArray | null = (data as string).match(
                            /(?<=('|")).*?(?=('|"))/
                        );
                        if (result) {
                            data = result[0];
                        }
                    }
                    (this.params[argName] as CommonOption).data = data;
                    break;
                case "boolean":
                    // booleanオプションは，指定された場合にデフォルト値を反転させる．
                    (this.params[argName] as CommonOption).data = !(this.params[
                        argName
                    ] as CommonOption).data;
                    break;
                case "number":
                    if (isNaN(Number(data))) {
                        throw new TypeError();
                    }
                    (this.params[argName] as CommonOption).data = Number(data);
                    break;
                default:
                    // CliDataTypeで指定した型でなかったらTypeError投げる
                    throw new TypeError();
            }
        } catch (e) {
            if (e instanceof TypeError) {
                // 変数名ではなくコマンドライン引数名でエラー文置き換えて表示する．
                console.error(
                    `${
                        e.name
                    }: Invalid type in argument '${argName}'(expected ${typeof (this
                        .params[argName] as CommonOption)
                        .data}, but ${typeof data}).`
                );
            } else {
                console.error(`${e.name}: ${e.message}`);
            }
            process.exit(1);
        }
        return "";
    }

    private getInitialIsUpdatedRequreds(): { [argName: string]: boolean } {
        /**
         * Requiredのコマンドライン引数の存在確認の初期状態を取得する．
         * - Args
         *      - None
         * - Returns
         *      - isUpdatedRequireds:{[argName: string]: boolean}: Requiredのオプションの更新フラグリスト．
         */
        const isUpdatedRequireds: { [argName: string]: boolean } = {};
        for (const argName of this.getArgNames()) {
            if (isHelpOption(this.params[argName])) {
                // HelpOptionの場合はスルー．
                continue;
            }
            if (
                ((this.params[argName] as CommonOption).advanced as
                    | OptionAdvanced
                    | ValueAdvanced).required
            ) {
                isUpdatedRequireds[argName] = false;
            }
        }
        return isUpdatedRequireds;
    }

    parse(argv: string[]): CliParser<T> {
        const argNames: string[] = this.getArgNames();
        const isUpdatedRequireds = this.getInitialIsUpdatedRequreds();
        let currentLocation = 1;
        try {
            // コマンドライン引数は(0番目から始まるうちの)2番目から取得できる．
            for (let i = 2; i < argv.length; i++) {
                const arg: string = argv[i];
                /*
                以降，ロングオプションの特定をしてargNameに格納する．
                Value引数の場合はargNameは空文字のまま．
                 */
                let argName = "";
                if (arg.startsWith("--")) {
                    // ロングオプションの場合，オプション名をそのまま取得．
                    argName = arg.slice(2);
                    if (!argNames.includes(argName)) {
                        throw new CliParserArgError(
                            `CliParser cannot find argument '${argName}'.`
                        );
                    }
                } else if (arg.startsWith("-")) {
                    // ショートオプションの場合，ロングオプション名を取得して格納．
                    const [res, err]: [
                        string,
                        string
                    ] = this.getArgNameFromShortArgName(arg.slice(1));
                    argName = res;
                    if (err !== "") {
                        throw new CliParserArgError(err);
                    }
                }

                /*
                以降，特定したロングオプション(Valueの場合は空文字)を基にして処理．
                 */
                if (isHelpOption(this.params[argName])) {
                    // HelpOptionは"help"のみ読み込むので無視する仕様にする．
                    if (argName === "help") {
                        // "help"の場合，getHelp()で文を取得して表示し，強制終了．
                        console.log(this.getHelp());
                        process.exit(0);
                    }
                    continue;
                }
                if (argName !== "") {
                    // Optional引数の場合
                    if (
                        typeof (this.params[argName] as CommonOption).data !==
                        "boolean"
                    ) {
                        // boolean以外は後続に値がある前提とする．
                        this.updateParamData(argName, argv[++i]);
                    } else {
                        this.updateParamData(argName, "");
                    }
                } else {
                    // Value引数の場合
                    const [res, err]: [string, string] = this.updateValueData(
                        currentLocation++,
                        arg
                    );
                    // Value引数の場合はこのタイミングでargNameを特定し，後続の処理で使う．
                    argName = res;
                    if (err !== "") {
                        throw new CliParserArgError(err);
                    }
                }

                /*
                以降，HelpOption型以外の場合にRequiredの有無評価更新．
                 */
                if (!isHelpOption(this.params[argName])) {
                    if (
                        ((this.params[argName] as CommonOption).advanced as
                            | OptionAdvanced
                            | ValueAdvanced).required
                    ) {
                        isUpdatedRequireds[argName] = true;
                    }
                }
            }

            // requiredの評価
            const notUpdateRequiredArgNames = Object.keys(
                isUpdatedRequireds
            ).filter((argName: string) => {
                return !isUpdatedRequireds[argName];
            });
            if (notUpdateRequiredArgNames.length > 0) {
                throw new CliParserArgError(
                    `CliParser cannot find required arguments.(${notUpdateRequiredArgNames
                        .map((argName) => `'${argName}'`)
                        .join(", ")})`
                );
            }

            if ((this.params.test as CommonOption).data) {
                // CLIのテストモードなら取得パラメータを出力のみで終了．
                // https://www.codegrepper.com/code-examples/javascript/clear+terminal+node+js
                process.stdout.write("\x1Bc");
                // console.log("\033[2J"); // Windows用？トランスパイルしづらい．
                console.log(this.params);
                process.exit(0);
            }
        } catch (e) {
            console.error(`${e.name}: ${e.message}`);
            process.exit(1);
        }

        return this;
    }
}

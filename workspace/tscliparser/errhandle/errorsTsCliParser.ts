export class CliParserConstructorError extends Error {
    /**
     * CliParserのコンストラクタ引数例外．
     * https://future-architect.github.io/typescript-guide/exception.html#id4
     */
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;
    }
}

export class CliParserArgError extends Error {
    /**
     * CliParserのコマンドライン引数例外．
     * https://future-architect.github.io/typescript-guide/exception.html#id4
     */
    constructor(e?: string) {
        super(e);
        this.name = new.target.name;
    }
}

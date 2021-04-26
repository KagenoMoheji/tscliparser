import {
    CliParams,
    OptionAdvanced,
    ValueAdvanced,
    HelpOption,
} from "~~/src/types/typesTsCliParser";
import { CliParser } from "~~/src/tscliparser";
import http from "http";
import fs from "fs";

interface ParamsDisplayHtml extends CliParams {
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
        // 検証用
        data: false;
        advanced: {
            required: false;
            short: "";
        };
    };
}
// displayHtml.test.ts用にexportしてる．
export const cliparser = new CliParser<ParamsDisplayHtml>({
    host: {
        data: "127.0.0.1",
        advanced: {
            required: false,
            short: "h",
        },
    },
    port: {
        data: 8765,
        advanced: {
            required: false,
            short: "p",
        },
    },
    html: {
        data: "index.html",
        advanced: {
            required: true,
            location: 1,
        },
    },
    test: {
        data: false,
        advanced: {
            required: false,
            short: "",
        },
    },
    help: {
        usage: `[Usage] node displayHtml.js [-h|--host HOST] [-p|--port PORT] [--help] html
Options:
-h|--host HOST: Host that will be used to start HTTP Server. (default: 127.0.0.1)
-p|--port PORT: Port that will be used to start HTTP Server. (default: 8765)
--help        : Display help.
html          : HTML file you want to display with HTTP Server.`,
        description: "This CLI shows the preview of HTML.",
    },
});

if (require.main === module) {
    // Pythonでいう'__name__ == "__main__"'
    // コマンドライン引数をパース
    cliparser.parse(process.argv);

    // HTTPサーバ起動・HTML表示
    const cliParams: ParamsDisplayHtml = cliparser.getParams();
    const server = http.createServer((req, res) => {
        res.writeHead(200, { "content-type": "text/html" });
        fs.createReadStream(cliParams.html.data).pipe(res);
    });
    server.listen(cliParams.port.data);
    console.log(
        `'${cliParams.html.data}' is displayed on HTTP Server launched with ${cliParams.host.data}:${cliParams.port.data}`
    );
}

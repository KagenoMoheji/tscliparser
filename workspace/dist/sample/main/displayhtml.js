"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliparser = void 0;
var tscliparser_1 = require("~~/tscliparser/tscliparser");
var http_1 = __importDefault(require("http"));
var fs_1 = __importDefault(require("fs"));
exports.cliparser = new tscliparser_1.CliParser({
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
        usage: "[Usage] node displayHtml.js [-h|--host HOST] [-p|--port PORT] [--help] html\nOptions:\n-h|--host HOST: Host that will be used to start HTTP Server. (default: 127.0.0.1)\n-p|--port PORT: Port that will be used to start HTTP Server. (default: 8765)\n--help        : Display help.\nhtml          : HTML file you want to display with HTTP Server.",
        description: "This CLI shows the preview of HTML.",
    },
});
if (require.main === module) {
    exports.cliparser.parse(process.argv);
    var cliParams_1 = exports.cliparser.getParams();
    var server = http_1.default.createServer(function (req, res) {
        res.writeHead(200, { "content-type": "text/html" });
        fs_1.default.createReadStream(cliParams_1.html.data).pipe(res);
    });
    server.listen(cliParams_1.port.data);
    console.log("'" + cliParams_1.html.data + "' is displayed on HTTP Server launched with " + cliParams_1.host.data + ":" + cliParams_1.port.data);
}
//# sourceMappingURL=displayHtml.js.map
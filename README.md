# tscliparser
CLI Parser library in TypeScript.

## Get Started
### Install
```
npm install tscliparser
```

### Try using `tscliparser`
#### Sample
- [Sample: displayHtml](./workspace/sample/main/displayHtml.ts)
- [Test of displayHtml](./workspace/sample/test/displayHtml.test.ts)

#### Construct CLI
```
/*
(1) Import CliParser and types from tscliparser.
*/
import {
    CliParams,
    OptionAdvanced,
    ValueAdvanced,
    HelpOption,
} from "~~/src/types/typesTsCliParser";
import { CliParser } from "~~/src/tscliparser";

/*
(2) Define CLI arguments with interface(extends CliParams).
*/
interface ParamsDisplayHtml extends CliParams {
    host: { // User add.
        data: string;
        advanced: OptionAdvanced;
    };
    port: { // User add.
        data: number;
        advanced: OptionAdvanced;
    };
    html: { // User add.
        data: string;
        advanced: ValueAdvanced;
    };
    help: HelpOption; // Required.
    test: { // Required.
        data: false;
        advanced: {
            required: false;
            short: "";
        };
    };
}

/*
(3) Create instance of CliParser with interface(extends CliParams) and default data in each argument.
If you want to test, you have to export cliparser(instance of CliParser).
*/
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
    test: { // You have to set constant value below.
        data: false,
        advanced: {
            required: false,
            short: "",
        },
    },
    help: { // Not allowed to be empty in 'usage'.
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
    /*
    (4) Parse CLI arguments with cliparser(instance of CliParser).
    */
    cliparser.parse(process.argv);

    /*
    (5) Use parameters which cliparser stores...
    */
    const cliParams: ParamsDisplayHtml = cliparser.getParams();
    ...
}
```

#### Test
```
import * as assert from "assert";
import {
    CliDataType,
    CommonOption
} from "~~/src/types/typesTsCliParser";
import {
    cliparser,
} from "~~/sample/main/displayHtml";

describe("test CLI displayHtml", () => {
    const testExecDisplayHtml = (
        cmd: string,
        expesct: {
            params: {
                [argName: string]: CliDataType;
            };
            errMsg?: string;
        }
    ) => {
        const args: string[] = cmd.split(" ");
        cliparser.parse(args);
        // console.log(cliparser.getParams());
        for (const argName of Object.keys(expesct.params)) {
            it("Each argument data should match.", () => {
                assert.strictEqual(
                    (cliparser.getParams()[argName] as CommonOption).data,
                    expesct.params[argName]
                );
            });
        }
    };

    testExecDisplayHtml(
        "node webpack_build/dist/displayhtml_dev.js -p 333 -h 1.1.1.1 test.html",
        {
            params: {
                port: 333,
                host: "1.1.1.1",
                html: "test.html"
            },
        }
    );
});

```


## License
Copyright &copy; 2021 by KagenoMoheji. Released under the [MIT License](LICENSE).
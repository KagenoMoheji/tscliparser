const glob = require("glob");
const path = require("path");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (isProd = false) => {
    return {
        target: "node", // 今回はBrowser用JSではなくクライアントNodeJSで動かすのでこれ使って"fs"の問題解消しても問題無さそう．
        entry: {
            // tsconfig.jsonによる出力の際はソースのディレクトリ構造を維持してoutput[path]下に出力されるので，その構造に則って設定する必要あり．
            /*
            以下ではソースファイルを単体で指定する場合に使用．
             */
            ...{
                "sample/main/displayhtml": path.join(__dirname, "sample/main/displayHtml.ts"),
            },
            /*
            以下では指定ディレクトリ下のすべてのファイルを指定する場合に使用．
            - 参考
                - https://qiita.com/masato_makino/items/7130bbe408ca929e7f0d#%E5%87%BA%E5%8A%9B%E3%83%95%E3%82%A9%E3%83%AB%E3%83%80%E3%83%BC%E3%81%AE%E8%AA%BF%E6%95%B4
                - https://stackoverflow.com/questions/34907999/best-way-to-have-all-files-in-a-directory-be-entry-points-in-webpack/45827671#45827671
                - https://qiita.com/kou_pg_0131/items/16c63879be55b85387aa#%E3%82%B9%E3%83%97%E3%83%AC%E3%83%83%E3%83%89%E6%A7%8B%E6%96%87%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E6%96%B9%E6%B3%95
             */
            // ...Object.fromEntries(glob.sync(path.join(__dirname, "tscliparser/**/*.ts"), {
            //     // ignore: // 指定ディレクトリ下で無視したいファイル群をここで指定
            // }).map((srcts) => {
            //     // 絶対パスのうちカレントパスと拡張子を除去したファイルパスをトランスパイル出力先とする．
            //     return [srcts.replace(__dirname, "").replace(".ts", ""), srcts];
            // }))
        },
        output: {
            path: path.join(__dirname, "dist"), // tsconfig.jsonのoutDirに合わせる．
            filename: `[name]${(isProd ? "" : "_dev")}.js` // 開発用なら「_dev」が付く
        },
        resolve: {
            modules: ["node_modules"],
            extensions: [".js", ".ts"],
            alias: { // importの絶対パス化に必要． // tsconfig.jsonのpathsに合わせる．
                "~": path.resolve(__dirname, "tscliparser"),
                "~~": path.resolve(__dirname, "."),
                "@": path.resolve(__dirname, "tscliparser"),
                "@@": path.resolve(__dirname, ".")
            }
        },
        module: {
            rules: [
                { // tslintの代わりであるeslintのコーディング規則をbuildとwatchに適用
                    enforce: "pre",
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader"
                },
                {
                    exclude: /node_modules/,
                    test: /\.ts$/, // .tsx$
                    use: "ts-loader"
                }
            ]
        },
        plugins: [
            // 以下，コンパイル結果の可視化
            // https://github.com/webpack-contrib/webpack-bundle-analyzer
            // https://levelup.gitconnected.com/webpack-bundle-analyzer-in-docker-c4d8a4d4f570
            // https://dwango-js.github.io/performance-handbook/startup/reduce-size/
            // https://qiita.com/kurosame/items/9e7092cdf08ff2ba7500#webpack-bundle-analyzer
            // https://recruit-tech.co.jp/blog/2018/12/15/try_optimization_webpack_bundle_size/
            new BundleAnalyzerPlugin({
                analyzerMode: "static",
                reportFilename: "stats/report.html",
                statsFilename: "stats/stats.json",
                generateStatsFile: true,
                openAnalyzer: false,
                defaultSizes: "gzip",
                statsOptions: null,
                logLevel: "info"
            })
        ]
    };
};
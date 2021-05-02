# npmへのパッケージ公開の仕方
1. `package.json[scripts]`に下記2つのコマンドを追加．
    ```
    "scripts": {
        "prepare": "tsc",
        "build": "tsc"
    },
    ```
    - その他，`keywords`・`author`・`homepage`・`bugs[url]`・`license`を記載する．
2. `tsconfig.json`にて下記を有効にする．
    ```
    {
        "compilerOptions": {
            "target": "es5",                                /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
            "sourceMap": true,                           /* Generates corresponding '.map' file. */
            "declaration": true,                         /* Generates corresponding '.d.ts' file. */
            "outDir": "./dist",                              /* Redirect output structure to the directory. */
            "strict": true,                                 /* Enable all strict type-checking options. */
        },
        "include": [
            "./**/*.ts"
        ],
        "exclude": [
            "node_modules"
        ]
    }
    ```
    - `outDir`を指定しないと，`declaration: true`によって生成されることになった`d.ts`がソースディレクトリに出力されてしまう．
    - `declaration: true`になっていれば，`tsc`と`webpack`のいずれでトランスパイルしても，`d.ts`を作ることが可能．
        - `tsconfig.json[outDir]`に設定するディレクトリとソースディレクトリの構造に，`webpack.common.js`のentryとoutputを合わせる必要がある．
3. `$ npm run build`して`dist/`下に`js`・`d.ts`ができることを確認．
    - `js`において`tsconfig.json[paths]`で指定しているRootからの絶対インポートを使用している場合，トランスパイル出力先における出力ファイルの相対インポートに書き換えておく．
    - sampleディレクトリのトランスパイルは`$ npm run dev@webpack`で行う必要があり，使い分けに注意．
    - 将来的にWebpackの`$ npm run npmpack@webpack`でできるといい…
4. `dist/tscliparser/`下のみを公開する場合，`dist/tscliparser/`下に`package.json`(最低限)と`README.md`をコピペする．
5. `$ npm adduser`でログイン．
6. `dist/tscliparser/package.json[version]`を最新にする．
7. `$ npm publish dist/tscliparser/`で公開．
8. GithubにPushし，`$ git tag -a v<6.のバージョンに合わせる> -m "<変更点>"`，`git push origin tags/v<6.のバージョンに合わせる>`でReleaseタグを発行．
- もし，`npm publish`したものを非公開にしたい場合は，`npm unpublish <パッケージ名>@<バージョン>`．
    - [Unpublishing a single version of a package](https://docs.npmjs.com/unpublishing-packages-from-the-registry#unpublishing-a-single-version-of-a-package)
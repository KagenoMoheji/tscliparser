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
    - `declaration: true`になっていれば，`tsc`と`webpack`のいずれでトランスパイルしても，`d.ts`を作ることが可能．
        - ただし`tsconfig.json[outDir]`に設定するディレクトリとソースディレクトリの構造に，`webpack.common.js`のentryとoutputを合わせる必要がある．
3. `$ npm run build@webpack`して`dist/`下に`js`・`d.ts`ができることを確認．
4. `dist/tscliparser/`下のみを公開する場合，`dist/tscliparser/`下に`package.json`(最低限)と`README.md`をコピペする．
5. `$ npm adduser`でログイン．
6. `dist/tscliparser/package.json[version]`を最新にする．
7. `$ npm publish dist/tscliparser/`で公開．
8. GithubにPushし，`$ git tag -a v<6.のバージョンに合わせる> -m "<変更点>"`，`git push origin tags/v<6.のバージョンに合わせる>`でReleaseタグを発行．
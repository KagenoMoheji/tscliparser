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
            "outDir": "./dist",                              /* Redirect output structure to the directory. */
            "strict": true,                                 /* Enable all strict type-checking options. */
        },
        "include": [
            "./**/*.ts"
        ],
        "exclude": [
            "node_modules",
            "./sample/**/*.ts" /* sampleディレクトリの開発をする際はここをコメントアウト．srcディレクトリのbuildする時はコメントアウト外す． */
        ]
    }
    ```
3. `$ npm run build`して`dist/`下に`js`・`d.ts`ができることを確認．
4. `dist/`下のみを公開する場合，`dist/`下に`package.json`(最低限)と`README.md`をコピペする．
5. `$ npm adduser`でログイン．
6. `package.json[version]`を最新にする．
7. `$ npm publish dist/`で公開．
8. GithubにPushし，`$ git tag -a v<6.のバージョンに合わせる> -m "<変更点>"`，`git push origin tags/v<6.のバージョンに合わせる>`でReleaseタグを発行．
#!/bin/bash

#######################################################################
# node.orgからNodeJSをインストールするシェル．
# https://nodejs.org/download/release/
# 
# [例]
# $ bash ./install_node_from_nodeorg -v 14
# $ bash ./install_node_from_nodeorg -v 14.15.5
#######################################################################

node_version=""
while [ $# -gt 0 ]; do
    case $1 in
        -v)
            shift
            reg_pattern="^v?[0-9]+(\.[0-9]+)*$"
            if [[ ! $1 =~ ${reg_pattern} ]]; then
                # バージョンがフォーマット通り出ない場合
                echo "Error: Invalid value in option '-v'."
                exit 1
            fi
            # vを除くバージョン値を取得
            node_version=${1//"v"/}
            ;;
        *)
            ;;
    esac
    shift
done
if [ -z ${node_version} ]; then
    echo "Error: You should set Node version."
    exit 1
fi
# echo ${node_version}



reg_pattern="^[0-9]+$"
if [[ ${node_version} =~ ${reg_pattern} ]]; then
    # バージョンが1つの数字からなる場合，先にHTMLからlatestなバージョンを取得しておく．これにより3つの数字からなるバージョンを用いてwgetでインストールできる．
    fname=$(wget -q -O- https://nodejs.org/download/release/latest-v${node_version}.x/ | grep -o "href=\"node-v${node_version}.*-linux-x64.tar.xz\"")
    echo ${fname}
    ## 1つの数字によるバージョンを，正確なバージョンに修正する
    reg_pattern="^href=\"node-v(.+)-linux-x64.tar.xz\"$"
    if [[ ${fname} =~ ${reg_pattern} ]]; then
        node_version=${BASH_REMATCH[1]}
    fi
    echo ${node_version}
fi


# 3つの数字からなるバージョンを用いてwgetでNodeJSをダウンロード
wget -q -nv https://nodejs.org/download/release/v${node_version}/node-v${node_version}-linux-x64.tar.xz


# 環境変数で登録してある"/opt/nodejs/"下にbinが配置されるように移動させる
tar Jxfv node-v${node_version}-linux-x64.tar.xz
mv ./node-v${node_version}-linux-x64/* ./
# インストール済んだらインストーラは不要なので削除
rm node-v${node_version}-linux-x64.tar.xz
rm -r ./node-v${node_version}-linux-x64
# ls -la

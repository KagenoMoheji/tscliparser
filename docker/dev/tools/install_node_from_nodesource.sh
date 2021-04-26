#!/bin/bash

#######################################################################
# nodesourceからNodeJSをインストールするシェル．
# https://github.com/nodesource/distributions#installation-instructions
# https://co.bsnws.net/article/121
# https://linuxfan.info/install_nodejs_on_ubuntu_debian
# https://qiita.com/jshimazu/items/c484c6b5acd1ca11e05d
# 
# [例]
# $ bash ./install_node_from_nodesource -v 14
# $ bash ./install_node_from_nodesource -v 14.15.5
#######################################################################

node_version=""
while [ $# -gt 0 ]; do
    case $1 in
        -v)
            shift
            reg_pattern="^(v?[0-9]+)(\.[0-9]+)*$"
            if [[ $1 =~ ${reg_pattern} ]]; then
                # バージョン表記のうち一番左の数字(v除く)をバージョンとして取得
                # http://dqn.sakusakutto.jp/2013/06/bash_rematch_regexp.html
                node_version=${BASH_REMATCH[1]//"v"/}
            else
                # バージョンがフォーマット通り出ない場合
                echo "Error: Invalid value in option '-v'."
                exit 1
            fi
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

curl -sL https://deb.nodesource.com/setup_${node_version}.x | bash
apt-get install -y nodejs

FROM ubuntu:latest

ARG SHARED_WORKSPACE_HOST
ARG SHARED_WORKSPACE_CONTAINER
ARG NODE_VERSION

# NodeJSのインストール先にあらかじめ移動しておく
WORKDIR /opt/nodejs
# NodeJSインストールに必要な資材をコンテナに持ってくる
COPY ./docker/dev/tools /opt/docker/tools
# NodeJSのbinを"/opt/nodejs/"下に配置させるので，環境変数に登録してコマンド有効になるようにしておく．
ENV PATH /opt/nodejs/bin:$PATH
RUN apt-get update \
    && apt-get install -y \
        vim \
        wget \
        curl \
    # NodeJSインストール
    # 方法(1)：3つの数字からなるバージョンにも対応しているシェル．nodejs.orgからダウンロードしてる．
    && bash /opt/docker/tools/install_node_from_nodeorg.sh -v ${NODE_VERSION}
    # 方法(2)：1つの数字からなるバージョンにしか対応できないシェル．nodesourceのセットアップを使用している．
    # && bash /opt/docker/tools/install_node_from_nodesource.sh -v ${NODE_VERSION}
# RUN node --version && npm --version && ls -la


# 開発ディレクトリに移動しての処理
WORKDIR ${SHARED_WORKSPACE_CONTAINER}

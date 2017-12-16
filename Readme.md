# parcel-plugin-emc

# 作者

taktod
twitter: https://twitter.com/taktod
email: poepoemix@hotmail.com

# 概要

emscriptenを利用したライブラリを複数同時に使おうとすると動作しない。
これはメモリー領域等の扱いがかぶってしまいエラーが発生するため。いわゆるsegfault
なのでparcelの構築の際にコンパイルすることでこの問題に対処したい。

プロジェクトでemcという拡張子を定義した内容にしたがってemscriptenでc言語、c++言語のデータをコンパイルし
利用できるようにします

# setup emscripten

1st. download emsdk(emsdk_portable) and install it.

then...

```
$ cd emsdk-portable
$ ./emsdk update
$ ./emsdk install latest
$ ./emsdk activate latest
$ ./emsdk_env.sh
$ ./emsdk_set_env.sh
$ export PATH=.../emsdk-portable/emscripten/x.xx.xx/:$PATH
$ emcc --version
```

emcc --versionが動作すればOK

# 使い方

動作確認用のプロジェクトをつくるので、そちらをみてください。

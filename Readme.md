# parcel-plugin-emc

# 作者

taktod
twitter: https://twitter.com/taktod
email: poepoemix@hotmail.com

# 概要

emscriptenを利用したライブラリを複数同時に使おうとすると動作しない。
これはメモリー領域等の扱いがかぶってしまいエラーが発生するため。いわゆるsegfault
なのでparcelの構築の際にコンパイルすることでこの問題に対処したい。

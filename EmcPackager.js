const {Packager} = require("parcel-bundler");
const {execSync} = require("child_process");

class EmcPackager extends Packager {
  async start() {
    this.funcList = [];
    this.ldflags = [];
  }
  async addAsset(asset) {
    // asset.generated.emcから必要な情報を取得する
    var data = JSON.parse(asset.generated.emc);
    // リストデータを更新しておく
    this.funcList = this.funcList.concat(Object.values(data.func));
    this.ldflags = this.ldflags.concat(data.ldflags);
  }
  async end() {
    // すべてのデータが収集済みになったので、objectファイルの結合を実施する
    // とりあえず最適化としてO2かけておく
    var result = execSync("emcc .emc/*.o -o dist/emc.js -s EXPORTED_FUNCTIONS='" + JSON.stringify(this.funcList) + "' -O2 " + this.ldflags.join(" "));
    // 実行結果をとりいそぎ生成ファイルに書き出しておく
    await this.dest.end(result.toString() + "\r\n");
  }
}

module.exports = EmcPackager;
const {Asset} = require("parcel-bundler");

class EmcAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
  }
  parse(code) {
    return ""; // returnはastにはいる
  }
  pretransform() {
  }
  collectDependencies() {
  }
  transform() {
  }
  // returnはgeneratedにはいります。
  generate() {
    return {
      emc: 'this is test hogehoge',
      js: `module.exports=12345;` // この部分で毎回scriptタグをつかって読み込みを実施させる感じでつくっておけばいいか。
    }
  }
}

module.exports = EmcAsset;

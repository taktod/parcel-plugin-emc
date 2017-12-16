const fs = require("fs");
const {Asset} = require("parcel-bundler");
const {execSync} = require("child_process");
class EmcAsset extends Asset {
  constructor(name, pkg, options) {
    super(name, pkg, options);
  }
  async parse(code) {
    // これはassetに登録されているコードそのものになるわけか・・・
    // まぁいいや。とりあえずevalにしとこ
    try {
      // .emcという作業用ディレクトリが必要なので、作成する
      try {
        fs.mkdirSync(".emc");
      }catch(e) {
      }
/*
// コード例
var source = ["src/c/test.c", "src/c/test.cpp"];
var func = {test: "_testA", hogehoge: "_hogehoge"};
var cflags = [];
var cppflags = [];
var ldflags = [];
*/      
      (1,eval)(code);
      // emccでobjectファイルを作成します
      var cwd = process.cwd();
      var base = this.name.split(cwd)[1].match(/node_modules\/[^\/]+/);
      if(base != null) {
        base = base[0] + "/";
      }
      else {
        base = "";
      }
      // emcc -c source -o cwd/.emc/pathname.o cflags
      source.forEach((source) => {
        // ここでの動作はsourceの位置がpwdからみての相対パスになっていない可能性があるので、そこをなんとかしなければならない。
        var source = base + source;
        var output = ".emc/" + source.replace(/\//g, "_") + ".o";
        var cflag = "";
        var command = "";
        if(source.match(/\.c$/)) {
          command += "emcc";
          cflag = cflags.join(" ");
        }
        else {
          command += "em++";
          cflag = cppflags.join(" ");
        }
        command += " -c " + source + " -o " + output + " " + cflag; // あとはこのうしろにcflagsもしくはcppflagsを追加しなければならない。
        execSync(command);
      });
      // pass ldflags and func list for next
      var target = {"ldflags": ldflags, "func": func};
      return {"func": func, "code": JSON.stringify(target)};
    }
    catch(e) {
      return e.message;
    }
    return code; // returnはastにはいる
  }
  pretransform() {
  }
  collectDependencies() {
  }
  transform() {
  }
  // returnはgeneratedにはいります。
  generate() {
    var func = JSON.stringify(this.ast["func"]);
      return {
      emc: this.ast["code"],
      js: `
module.exports=${func}
var scripts = document.getElementsByTagName("script");
var found = false;
for(var i = 0;i < scripts.length;++ i) {
  if(scripts[i].src == "emc.js") {
    found = true;
  }
}
if(!found) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "/dist/emc.js";
  document.body.appendChild(script);
}
      `
    }
  }
}

module.exports = EmcAsset;

const {Packager} = require("parcel-bundler");

class EmcPackager extends Packager {
  async start() {
    await this.dest.write("test ");
  }
  async addAsset(asset) {
    await this.dest.write("asset ");
  }
  async end() {
    await this.dest.end("tass ");
  }
}

module.exports = EmcPackager;
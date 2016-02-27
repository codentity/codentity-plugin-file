'use strict';

const CodentityPlugin = require('codentity-plugin');
const minimatch = require('minimatch');

class FilePlugin extends CodentityPlugin {
  constructor (config) {
    super('filePath');
    this._filePaths = config.filePaths || [];
  }
  static make (config) {
    return new FilePlugin(config);
  }
  reinitialize (config) {
    this._filePaths = config.filePaths || [];
    return this;
  }
  find (query) {
    // FIXME query should be a string here...
    return this._filePaths.filter((filePath) => {
      return minimatch(filePath, query);
    }).map((filePath) => {
      return {
        filePath: filePath,
        src: this.idKey()
      };
    });
  }
  filter (filePaths) {
    return filePaths.filter((filePath) => {
      return !filePath.match(/^.tmp/);
    });
  }
}

module.exports = FilePlugin;

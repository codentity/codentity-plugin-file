'use strict';

const CodentityPlugin = require('codentity-plugin');
const minimatch = require('minimatch');

class FilePlugin extends CodentityPlugin {
  constructor (config) {
    super('file');
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
    return this._filePaths.filter((filePath) => {
      return minimatch(filePath, query);
    }).map((filePath) => {
      return {
        plugin: 'file',
        src: 'filePaths',
        filePath: filePath
      };
    });
  }
}

module.exports = FilePlugin;

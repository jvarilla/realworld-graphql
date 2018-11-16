'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseDir = __dirname.indexOf('build') !== -1 ? 'build' : 'src';
var pattern = baseDir + '/resources/**/resolver.js';

var resolvers = [];

_glob2.default.sync(pattern).forEach(function (file) {
  var root = _path2.default.join(__dirname, '..', '..', file);

  resolvers.push(require(root).default);
});

exports.default = _lodash.merge.apply(undefined, resolvers);
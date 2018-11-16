'use strict';

var _good = require('good');

var _good2 = _interopRequireDefault(_good);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.register = function (server, options, next) {
  var opts = {
    ops: {
      interval: 1000
    },
    reporters: {
      myConsoleReporter: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ log: '*', response: '*', request: '*' }]
      }, {
        module: 'good-console'
      }, 'stdout']
    }
  };

  server.register({
    register: _good2.default,
    options: opts
  }, function (err) {
    return next(err);
  });
};

exports.register.attributes = {
  name: 'logs',
  version: '1.0.0'
};
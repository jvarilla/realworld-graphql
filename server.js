'use strict';

require('babel-polyfill');

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _graphqlServerHapi = require('graphql-server-hapi');

var _graphqlServerCore = require('graphql-server-core');

var _api = require('./build/core/api');

var _api2 = _interopRequireDefault(_api);

var _log = require('./build/core/log');

var _log2 = _interopRequireDefault(_log);

var _auth = require('./build/core/auth');

var _auth2 = _interopRequireDefault(_auth);

var _config = require('./build/core/config');

var _config2 = _interopRequireDefault(_config);

var _schema = require('./build/core/schema');

var _schema2 = _interopRequireDefault(_schema);

var _error = require('./build/core/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var server = new _hapi2.default.Server();

server.register({
  register: _log2.default
});

server.connection({
  port: _config2.default.server.port
});

server.register({
  register: _auth2.default
});

if (_config2.default.server.env === 'development') {
  server.register({
    register: _graphqlServerHapi.graphiqlHapi,
    options: {
      path: '/graphiql',
      graphiqlOptions: {
        endpointURL: '/graphql'
      }
    }
  });
}

server.route({
  method: ['GET', 'POST'],
  path: '/graphql',
  handler: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(request, reply) {
      var gqlResponse;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _graphqlServerCore.runHttpQuery)([request], {
                method: request.method.toUpperCase(),
                query: request.method === 'post' ? request.payload : request.query,
                options: function options(request) {
                  return {
                    schema: _schema2.default,
                    context: {
                      request: request,
                      Api: _api2.default
                    },
                    debug: _config2.default.server.env !== 'production'
                  };
                }
              });

            case 3:
              gqlResponse = _context.sent;

              if (!/401 - You must be authenticated/.test(gqlResponse)) {
                _context.next = 8;
                break;
              }

              return _context.abrupt('return', reply(gqlResponse).code(401));

            case 8:
              return _context.abrupt('return', reply(gqlResponse));

            case 9:
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', (0, _error2.default)(_context.t0, reply));

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 11]]);
    }));

    return function handler(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }()
});

server.start(function (err) {
  if (err) {
    throw err;
  }

  server.log('Server running at:', server.info.uri);
});
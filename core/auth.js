'use strict';

var _hapiAuthJwt = require('hapi-auth-jwt2');

var _hapiAuthJwt2 = _interopRequireDefault(_hapiAuthJwt);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.register = function (server, options, next) {
  var validate = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(decoded, request, cb) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (decoded) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', cb(null, false));

            case 2:
              return _context.abrupt('return', cb(null, true));

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function validate(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  server.register(_hapiAuthJwt2.default, registerAuth);

  function registerAuth(err) {
    if (err) {
      return next(err);
    }

    server.auth.strategy('jwt', 'jwt', 'try', {
      key: _config2.default.server.jwt,
      validateFunc: validate,
      verifyOptions: { algorithms: ['HS256'] }
    });

    return next();
  }
};

exports.register.attributes = {
  name: 'auth-jwt',
  version: '1.0.0'
};
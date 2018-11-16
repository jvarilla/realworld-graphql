'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = require('request-promise/errors');

var _errors2 = _interopRequireDefault(_errors);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var BASE_URL = _config2.default.api.base_url;

var Api = function () {
  function Api(_ref2) {
    var endpoint = _ref2.endpoint,
        _ref2$authenticated = _ref2.authenticated,
        authenticated = _ref2$authenticated === undefined ? false : _ref2$authenticated,
        _ref2$replaces = _ref2.replaces,
        replaces = _ref2$replaces === undefined ? [] : _ref2$replaces;

    _classCallCheck(this, Api);

    this.endpoint = endpoint;
    this.authenticated = authenticated;
    this.replaces = replaces;

    this.defaultOptions = { json: true };
  }

  _createClass(Api, [{
    key: '_handleResponseError',
    value: function _handleResponseError(err) {
      var error = new Error();

      console.error('ERROR', err);
      error.message = err.error ? err.error.errors : err.message;
      error.isGraphQLError = true;
      error.statusCode = err.statusCode;

      if (404 === err.statusCode) {
        error.message = err.error.status + ' - ' + err.error.error;
      }

      if (401 === err.statusCode) {
        error.message = err.statusCode + ' - You must be authenticated OR Your credentials are invalid';
      }

      throw error;
    }
  }, {
    key: '_makeRequest',
    value: function _makeRequest(_ref) {
      var _this2 = this;

      var _this = this;

      var options = _ref.options,
          reqOptions = _objectWithoutProperties(_ref, ['options']);

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var uri, headers, response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                uri = _this._getUri(options);
                headers = _this.headers;


                reqOptions = Object.assign(_this.defaultOptions, reqOptions, { uri: uri, headers: headers });

                console.log('ReqOptions', reqOptions);

                _context.next = 7;
                return (0, _requestPromise2.default)(reqOptions);

              case 7:
                response = _context.sent;
                return _context.abrupt('return', response);

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](0);

                if (!(_context.t0 instanceof _errors2.default.StatusCodeError)) {
                  _context.next = 15;
                  break;
                }

                return _context.abrupt('return', _this._handleResponseError(_context.t0));

              case 15:
                throw _context.t0;

              case 16:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 11]]);
      }))();
    }
  }, {
    key: '_getUri',
    value: function _getUri() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          endpoint = _ref3.endpoint,
          replaces = _ref3.replaces;

      endpoint = endpoint ? endpoint.toLowerCase() : this.endpoint.toLowerCase();

      this.replaces.map(function (replaceObj) {
        var regex = new RegExp('{' + replaceObj.key + '}', 'g');

        endpoint = endpoint.replace(regex, replaces[replaceObj.key]);
      });

      return BASE_URL + '/' + endpoint;
    }
  }, {
    key: '_checkAuth',
    value: function _checkAuth(options) {
      if (this.authenticated && !options.token) {
        throw new Error('401 - You must be authenticated');
      }

      if (options.token) {
        this.headers = {
          'Authorization': 'Token ' + options.token
        };
      }
    }
  }, {
    key: 'get',
    value: function get() {
      var qs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._checkAuth(options);

      var rpOptions = {
        method: 'GET',
        qs: qs,
        options: options
      };

      return this._makeRequest(rpOptions);
    }
  }, {
    key: 'create',
    value: function create() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._checkAuth(options);

      var rpOptions = {
        method: 'POST',
        body: body,
        options: options
      };

      return this._makeRequest(rpOptions);
    }
  }, {
    key: 'update',
    value: function update() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._checkAuth(options);

      var rpOptions = {
        method: 'PUT',
        body: body,
        options: options
      };

      return this._makeRequest(rpOptions);
    }
  }, {
    key: 'delete',
    value: function _delete() {
      var body = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this._checkAuth(options);

      var rpOptions = {
        method: 'DELETE',
        body: body,
        options: options
      };

      return this._makeRequest(rpOptions);
    }
  }]);

  return Api;
}();

exports.default = Api;
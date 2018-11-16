'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Controller = function () {
  function Controller(context) {
    _classCallCheck(this, Controller);

    this.context = context;
    this.request = context.request;
    this.authToken = context.request.auth.token;
  }

  _createClass(Controller, [{
    key: '_setupAPI',
    value: function _setupAPI(options) {
      this.endpoint = options.endpoint;
      this.API = new this.context.Api(options);
    }
  }, {
    key: '_toBase64',
    value: function _toBase64(value) {
      value = typeof value !== 'string' ? value.toString() : value;

      return Buffer.from(value).toString('base64');
    }
  }, {
    key: '_fromBase64',
    value: function _fromBase64(value) {
      return Buffer.from(value, 'base64').toString();
    }
  }, {
    key: '_getCountForCursor',
    value: function _getCountForCursor(results) {
      return results.count;
    }
  }, {
    key: '_getPageInfoForCursor',
    value: function _getPageInfoForCursor(edges, _ref, count) {
      var _ref$first = _ref.first,
          first = _ref$first === undefined ? 0 : _ref$first,
          after = _ref.after;

      return {
        startCursor: _lodash2.default.chain(edges).first().get('cursor').value(),
        endCursor: _lodash2.default.chain(edges).last().get('cursor').value(),
        hasNextPage: edges.length >= first,
        hasPreviousPage: after ? edges.length <= first : false
      };
    }
  }, {
    key: '_getEdgesForCursor',
    value: function _getEdgesForCursor(results) {
      var _this3 = this;

      return _lodash2.default.map(results, function (result, index) {
        return { cursor: _this3._toBase64(index), node: result };
      });
    }
  }, {
    key: '_prepareCursor',
    value: function _prepareCursor(results, paging) {
      console.log('LOL', results);
      var edges = this._getEdgesForCursor(results);
      var count = this._getCountForCursor(results);
      var pageInfo = this._getPageInfoForCursor(edges, paging, count);

      return {
        count: count,
        pageInfo: pageInfo,
        edges: edges
      };
    }
  }, {
    key: 'getAllByCursor',
    value: function getAllByCursor(paging) {
      var _this4 = this;

      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { endpoint: this.endpoint };
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var first, after, authoredBy, favoritedBy, withTag, query, results;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                first = paging.first, after = paging.after, authoredBy = paging.authoredBy, favoritedBy = paging.favoritedBy, withTag = paging.withTag;
                query = {
                  author: authoredBy,
                  favorited: favoritedBy,
                  tag: withTag,
                  limit: first,
                  offset: after ? _this._fromBase64(after) : null
                };
                _context.next = 4;
                return _this.API.get(query, _extends({ token: _this.authToken }, options));

              case 4:
                results = _context.sent;
                return _context.abrupt('return', _this._prepareCursor(results, paging));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this4);
      }))();
    }
  }, {
    key: 'get',
    value: function get(query) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { endpoint: this.endpoint };

      return this.API.get(query, _extends({ token: this.authToken }, options));
    }
  }, {
    key: 'create',
    value: function create(body) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { endpoint: this.endpoint };

      return this.API.create(_defineProperty({}, this.resource, body), _extends({ token: this.authToken }, options));
    }
  }, {
    key: 'update',
    value: function update(body) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { endpoint: this.endpoint };

      return this.API.update(_defineProperty({}, this.resource, body), _extends({ token: this.authToken }, options));
    }
  }, {
    key: 'destroy',
    value: function destroy(id) {
      var _this5 = this;

      var _this2 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { endpoint: this.endpoint + '/' + id };
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this2.API.delete(null, _extends({ token: _this2.authToken }, options));

              case 3:
                return _context2.abrupt('return', { success: true });

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](0);
                throw _context2.t0;

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this5, [[0, 6]]);
      }))();
    }
  }]);

  return Controller;
}();

exports.default = Controller;
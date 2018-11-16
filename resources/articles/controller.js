'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _baseController = require('../../core/base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ArticleController = function (_Controller) {
  _inherits(ArticleController, _Controller);

  function ArticleController(context) {
    _classCallCheck(this, ArticleController);

    var _this2 = _possibleConstructorReturn(this, (ArticleController.__proto__ || Object.getPrototypeOf(ArticleController)).call(this, context));

    _this2.resource = 'article';

    _this2._setupAPI({
      endpoint: 'articles'
    });
    return _this2;
  }

  _createClass(ArticleController, [{
    key: '_getEdgesForCursor',
    value: function _getEdgesForCursor(results) {
      var _this3 = this;

      return _lodash2.default.map(results.articles, function (article, index) {
        return { cursor: _this3._toBase64(index), node: article };
      });
    }
  }, {
    key: '_getCountForCursor',
    value: function _getCountForCursor(results) {
      return results.articlesCount;
    }
  }, {
    key: 'getBySlug',
    value: function getBySlug(slug) {
      var _this4 = this;

      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this._setupAPI({
                  endpoint: 'articles',
                  replaces: [{ key: 'slug', value: 'slug' }]
                });

                _context.next = 3;
                return _get(ArticleController.prototype.__proto__ || Object.getPrototypeOf(ArticleController.prototype), 'get', _this4).call(_this4, null, {
                  endpoint: 'articles/{slug}',
                  replaces: { slug: slug }
                });

              case 3:
                result = _context.sent;
                return _context.abrupt('return', result.article);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this4);
      }))();
    }
  }, {
    key: 'getFeed',
    value: function getFeed(paging) {
      return _get(ArticleController.prototype.__proto__ || Object.getPrototypeOf(ArticleController.prototype), 'getAllByCursor', this).call(this, paging, {
        endpoint: 'articles/feed'
      });
    }
  }, {
    key: 'update',
    value: function update(_ref) {
      var slug = _ref.slug,
          changes = _ref.changes;

      return _get(ArticleController.prototype.__proto__ || Object.getPrototypeOf(ArticleController.prototype), 'update', this).call(this, changes, { endpoint: 'articles/' + slug });
    }
  }]);

  return ArticleController;
}(_baseController2.default);

exports.default = ArticleController;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolver = {
  Query: {
    articles: function articles(root, paging, context) {
      var articleController = new _controller2.default(context);

      return articleController.getAllByCursor(paging);
    },
    article: function article(root, _ref, context) {
      var slug = _ref.slug;

      var articleController = new _controller2.default(context);

      return articleController.getBySlug(slug);
    },
    feed: function feed(root, paging, context) {
      var articleController = new _controller2.default(context);

      return articleController.getFeed(paging);
    }
  },
  Mutation: {
    createArticle: function createArticle(root, _ref2, context) {
      var input = _ref2.input;

      var articleController = new _controller2.default(context);

      return articleController.create(input);
    },
    updateArticle: function updateArticle(root, args, context) {
      var articleController = new _controller2.default(context);

      return articleController.update(args);
    },
    deleteArticle: function deleteArticle(root, _ref3, context) {
      var slug = _ref3.slug;

      var articleController = new _controller2.default(context);

      return articleController.destroy(slug);
    }
  }
};

exports.default = resolver;
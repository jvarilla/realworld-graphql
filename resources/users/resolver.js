'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolver = {
  Query: {
    me: function me(root, _args, context) {
      var userController = new _controller2.default(context);

      return userController.get();
    }
  },
  Mutation: {
    createUser: function createUser(root, _ref, context) {
      var input = _ref.input;

      var userController = new _controller2.default(context);

      return userController.create(input);
    },
    updateUser: function updateUser(root, _ref2, context) {
      var changes = _ref2.changes;

      var userController = new _controller2.default(context);

      return userController.update(changes);
    },
    login: function login(root, credentials, context) {
      var userController = new _controller2.default(context);

      return userController.login(credentials);
    }
  }
};

exports.default = resolver;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var resolver = {
  Query: {
    profile: function profile(root, query, context) {
      var profileController = new _controller2.default(context);

      return profileController.get(query);
    }
  },

  User: {
    profile: function profile(root, _query, context) {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var profileController, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                profileController = new _controller2.default(context);
                _context.next = 3;
                return profileController.get({ username: root.username });

              case 3:
                result = _context.sent;
                return _context.abrupt('return', result.profile);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  },

  Mutation: {
    followUser: function followUser(root, args, context) {
      var profileController = new _controller2.default(context);

      return profileController.follow(args);
    },
    unfollowUser: function unfollowUser(root, args, context) {
      var profileController = new _controller2.default(context);

      return profileController.unfollow(args);
    }
  }
};

exports.default = resolver;
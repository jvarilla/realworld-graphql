'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseController = require('../../core/base-controller');

var _baseController2 = _interopRequireDefault(_baseController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileController = function (_Controller) {
  _inherits(ProfileController, _Controller);

  function ProfileController(context) {
    _classCallCheck(this, ProfileController);

    var _this = _possibleConstructorReturn(this, (ProfileController.__proto__ || Object.getPrototypeOf(ProfileController)).call(this, context));

    _this.resource = 'profile';

    _this._setupAPI({
      endpoint: 'profiles/{username}',
      replaces: [{ key: 'username', value: 'username ' }]
    });
    return _this;
  }

  _createClass(ProfileController, [{
    key: 'get',
    value: function get(username) {
      return _get(ProfileController.prototype.__proto__ || Object.getPrototypeOf(ProfileController.prototype), 'get', this).call(this, null, { replaces: username });
    }
  }, {
    key: 'follow',
    value: function follow(username) {
      return this.API.create(null, {
        token: this.authToken,
        replaces: username,
        endpoint: 'profiles/{username}/follow'
      });
    }
  }, {
    key: 'unfollow',
    value: function unfollow(username) {
      return this.API.delete(null, {
        token: this.authToken,
        replaces: username,
        endpoint: 'profiles/{username}/follow'
      });
    }
  }]);

  return ProfileController;
}(_baseController2.default);

exports.default = ProfileController;
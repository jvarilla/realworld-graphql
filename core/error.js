'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleError;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleError(error, reply) {
  if (true === error.isGraphQLError) {
    return reply(error.message).code(error.statusCode).type('application/json');
  }

  var err = _boom2.default.create(error.statusCode || 500);

  err.output.payload.message = error.message;

  if (error.headers) {
    Object.keys(error.headers).forEach(function (header) {
      err.output.headers[header] = error.headers[header];
    });
  }

  return reply(err);
}
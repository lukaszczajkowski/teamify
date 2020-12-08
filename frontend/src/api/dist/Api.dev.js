"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _Auth = _interopRequireDefault(require("../services/Auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var BASE_URL = "http://localhost:8080";

var Api = _axios["default"].create({
  baseURL: BASE_URL
});

Api.interceptors.request.use(function (config) {
  if (_Auth["default"].isLoggedIn()) {
    var authHeader = _Auth["default"].getAuthorizationHeader();

    config.headers['common']['authorization'] = authHeader;
  }

  return config;
});
Api.interceptors.response.use(function (r) {
  return r;
}, function (err) {
  if (err.response && [401, 403].indexOf(err.response.status) !== -1) {
    _Auth["default"].logout();
  }

  return Promise.reject(err);
}); // Exporting Api into the global namespace for introspecting

window.Api = Api;
var _default = Api;
exports["default"] = _default;
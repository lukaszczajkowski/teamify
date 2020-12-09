"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Api = _interopRequireDefault(require("./Api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ChatApi =
/*#__PURE__*/
function () {
  function ChatApi() {
    _classCallCheck(this, ChatApi);
  }

  _createClass(ChatApi, [{
    key: "getUsers",
    value: function getUsers() {
      return _Api["default"].get("/from-shared-projects");
    }
  }, {
    key: "countNewMessages",
    value: function countNewMessages(senderId) {
      return _Api["default"].get("/messages/" + senderId + "/count");
    }
  }, {
    key: "findChatMessages",
    value: function findChatMessages(senderId) {
      return _Api["default"].get("/messages/" + senderId);
    }
  }, {
    key: "findChatMessage",
    value: function findChatMessage(id) {
      return _Api["default"].get("/messages/findMessage/" + id);
    }
  }, {
    key: "findProjectMessages",
    value: function findProjectMessages(projectId) {
      return _Api["default"].get("/messages/project/" + projectId);
    }
  }]);

  return ChatApi;
}();

var _default = new ChatApi();

exports["default"] = _default;
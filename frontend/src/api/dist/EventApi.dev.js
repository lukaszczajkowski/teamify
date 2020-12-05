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

var EventApi =
/*#__PURE__*/
function () {
  function EventApi() {
    _classCallCheck(this, EventApi);
  }

  _createClass(EventApi, [{
    key: "getAllUserEvents",
    value: function getAllUserEvents() {
      return _Api["default"].get('/events/user');
    }
    /**
     * Returns all the user's events within the range
     * from start to end
     * @param {*} Long userId 
     * @param {*} String start 
     * @param {*} String end 
     */

  }, {
    key: "getUserEventsInRange",
    value: function getUserEventsInRange(userId, start, end) {
      return _Api["default"].get('/events/' + userId + "/user/range", {
        params: {
          start: start,
          end: end
        }
      });
    }
    /**
     * Returns all the project's events within the range
     * from start to end
     * @param {*} Long projectId 
     * @param {*} String start 
     * @param {*} String end 
     */

  }, {
    key: "getProjectEventsInRange",
    value: function getProjectEventsInRange(projectId, start, end) {
      return _Api["default"].get('/events/' + projectId + '/project/range', {
        params: {
          start: start,
          end: end
        }
      });
    }
    /**
     * Creates a new event
     * @param {*} event 
     */

  }, {
    key: "create",
    value: function create(event) {
      return _Api["default"].post('/events', event);
    }
    /**
     * Updates an existing event
     * @param {*} event 
     */

  }, {
    key: "update",
    value: function update(event) {
      return _Api["default"].put('/events', event);
    }
    /**
     * Takes in an event id and adds a user with the given email address
     * to the list of members and sends the notification to that email address
     * @param {*} eventId 
     * @param {*} userEmail 
     */

  }, {
    key: "inviteUserByEmail",
    value: function inviteUserByEmail(eventId, userEmail) {
      return _Api["default"].put("/events/".concat(eventId, "/userEmail?userEmail=").concat(userEmail));
    }
    /**
     * Accepts an event id and user email and removes the user identified by that
     * email from the list of members of the event
     * @param {*} eventId 
     * @param {*} userEmail 
     */

  }, {
    key: "removeUser",
    value: function removeUser(eventId, userEmail) {
      return _Api["default"].put("/events/".concat(eventId, "/delete/userEmail?userEmail=").concat(userEmail));
    }
    /**
     * Accepts an event in a request body and deletes that event
     * @param {*} event 
     */

  }, {
    key: "delete",
    value: function _delete(eventId) {
      return _Api["default"]["delete"]('/events/' + eventId);
    }
    /**
     * Accepts and event id and LocalDateTime start and changes the start
     * time of the event
     * @param {*} eventId 
     * @param {*} start 
     */

  }, {
    key: "changeStartingDate",
    value: function changeStartingDate(eventId, start) {
      return _Api["default"].put('/events/' + eventId + '/change-start/start', {
        params: start
      });
    }
    /**
     * Accepts and event id and LocalDateTime finish and changes the finish
     * time of the event
     * @param {*} eventId 
     * @param {*} start 
     */

  }, {
    key: "changeFinishDate",
    value: function changeFinishDate(eventId, finish) {
      return _Api["default"].put('/events/' + eventId + '/change-finish/finish', {
        params: finish
      });
    }
  }]);

  return EventApi;
}();

var _default = new EventApi();

exports["default"] = _default;
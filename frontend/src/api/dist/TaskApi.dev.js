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

var TaskApi =
/*#__PURE__*/
function () {
  function TaskApi() {
    _classCallCheck(this, TaskApi);
  }

  _createClass(TaskApi, [{
    key: "getAllTasks",
    value: function getAllTasks() {
      return _Api["default"].get('/tasks');
    }
  }, {
    key: "getTaskById",
    value: function getTaskById(taskId) {
      return _Api["default"].get('/tasks/' + taskId);
    }
  }, {
    key: "getTasksByMemberIdAndProjectId",
    value: function getTasksByMemberIdAndProjectId(memberId, projectId) {
      return _Api["default"].get('/tasks/memberProject', {
        params: memberId,
        projectId: projectId
      });
    }
  }, {
    key: "getTasksByCategoryId",
    value: function getTasksByCategoryId(categoryId) {
      return _Api["default"].get('/tasks/categoryId', {
        params: {
          categoryId: categoryId
        }
      });
    }
  }, {
    key: "getTasksByProjectId",
    value: function getTasksByProjectId(projectId) {
      return _Api["default"].get("/tasks/projectId?projectId=".concat(projectId));
    }
  }, {
    key: "getTasksByCategoryIdAndMemberId",
    value: function getTasksByCategoryIdAndMemberId(categoryId, memberId) {
      return _Api["default"].get('/tasks/categoryMember', {
        params: categoryId,
        memberId: memberId
      });
    }
  }, {
    key: "createTask",
    value: function createTask(categoryId, task) {
      return _Api["default"].post('/tasks/' + categoryId, task);
    }
  }, {
    key: "updateCategory",
    value: function updateCategory(taskId, newCategoryId) {
      // return Api.put('/tasks/' + newCategoryId + 'newCategoryId', {
      //     params:
      //         { newCategoryId : newCategoryId}
      // })
      return _Api["default"].put("/tasks/".concat(taskId, "/newCategoryId?newCategoryId=").concat(newCategoryId));
    }
  }, {
    key: "updateTask",
    value: function updateTask(categoryId, task) {
      return _Api["default"].put('/tasks/' + categoryId, task);
    }
  }, {
    key: "deleteTask",
    value: function deleteTask(taskId) {
      return _Api["default"]["delete"]('/tasks/' + taskId);
    }
  }, {
    key: "addMemberToTask",
    value: function addMemberToTask(taskId, userId) {
      return _Api["default"].put('/tasks/' + taskId + '/userId', null, {
        params: {
          userId: userId
        }
      });
    }
  }, {
    key: "deleteMemberFromTask",
    value: function deleteMemberFromTask(taskId, userId) {
      return _Api["default"].put('/tasks/' + taskId + '/remove/userId', null, {
        params: {
          userId: userId
        }
      });
    }
  }]);

  return TaskApi;
}();

var _default = new TaskApi();

exports["default"] = _default;
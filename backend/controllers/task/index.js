import { validationResult } from "express-validator";
import { RESPONSE_MESSAGE } from "../../constant/responseMessage.js";
import { HTTP_STATUS } from "../../constant/statusCode.js";
import { sendResponse } from "../../utils/response.js";
import { sendValidationError } from "../../utils/sendValidationError.js";
import TaskService from "../../services/task/index.js";

class TaskControllerClass {
  async create(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length) {
        return sendValidationError(res, validation);
      }
      const user = req.user;
      const newTask = await TaskService.newTask(req.body, user.id);
      if (!newTask.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.TASK_CREATE_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.TASK_CREATE_SUCCESS,
        newTask.data
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getTaskByUser(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length) {
        return sendValidationError(res, validation);
      }
      const user = req.user;
      const allTask = await TaskService.getTaskByUserId(user.id);
      if (!allTask.success) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          RESPONSE_MESSAGE.NO_DATA
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.SUCCESSFULLY_GET_ALL_DATA,
        allTask.data
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length) {
        return sendValidationError(res, validation);
      }
      const user = req.user;
      console.log("params", req.params.id);
      const findTask = await TaskService.findTask(req.params.id, user.id);
      if (!findTask.success) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          RESPONSE_MESSAGE.NO_DATA
        );
      }
      const updatedTask = await TaskService.updateTask(
        req.params.id,
        user.id,
        req.body.data
      );
      if (!updatedTask.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.TASK_UPDATE_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.TASK_UPDATE_SUCCESS,
        updatedTask.data
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }

  async delete(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length) {
        return sendValidationError(res, validation);
      }
      const user = req.user;

      const findTask = await TaskService.findTask(req.params.id, user.id);
      if (!findTask.success) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          RESPONSE_MESSAGE.NO_DATA
        );
      }
      const deletedTask = await TaskService.deleteTask(req.params.id, user.id);
      if (!deletedTask.success) {
        return sendResponse(
          res,
          HTTP_STATUS.BAD_REQUEST,
          RESPONSE_MESSAGE.TASK_DELETE_FAILED
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        RESPONSE_MESSAGE.TASK_DELETE_SUCCESS,
        deletedTask.data
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGE.INTERNAL_SERVER_ERROR
      );
    }
  }
}

const TaskController = new TaskControllerClass();

export default TaskController;

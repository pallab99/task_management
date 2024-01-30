import TaskController from "./index.js";
import TaskService from "../../services/task/index.js";

import { jest } from "@jest/globals";

jest.mock("../../services/task/index.js", () => ({
  newTask: jest.fn().mockResolvedValue({ success: true, data: {} }),
}));

describe("TaskController", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      user: { id: 2 },
      body: {
        /* your request body here */
      },
      params: { id: 3 },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("create", () => {
    it("should create a new task successfully", async () => {
      TaskService.newTask.mockResolvedValue({
        success: true,
        data: {
          title: "New task 2",
          description: "New description 2",
        },
      });

      await TaskController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task created successfully",
        data: {
          title: "New task 2",
          description: "New description 2",
        },
      });
    });

    // Add more test cases for create method
  });

  describe("getTaskByUser", () => {
    it("should get tasks for a user successfully", async () => {
      TaskService.getTaskByUserId.mockResolvedValue({
        success: true,
        data: "someTaskData",
      });

      await TaskController.getTaskByUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Successfully retrieved all data",
        data: "someTaskData",
      });
    });

    // Add more test cases for getTaskByUser method
  });

  describe("update", () => {
    it("should update a task successfully", async () => {
      TaskService.findTask.mockResolvedValue({ success: true });
      TaskService.updateTask.mockResolvedValue({
        success: true,
        data: {
          title: "New task 2",
          description: "New description 2",
        },
      });

      await TaskController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task updated successfully",
        data: "updatedTaskData",
      });
    });

    // Add more test cases for update method
  });

  describe("delete", () => {
    it("should delete a task successfully", async () => {
      TaskService.findTask.mockResolvedValue({ success: true });
      TaskService.deleteTask.mockResolvedValue({
        success: true,
        data: "deletedTaskData",
      });

      await TaskController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Task deleted successfully",
        data: "deletedTaskData",
      });
    });

    // Add more test cases for delete method
  });
});

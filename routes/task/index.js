import express from "express";
const router = express.Router();
import { validator } from "../../middlewares/validator.js";
import { tokenAuthorization } from "../../middlewares/tokenValidator.js";
import TaskController from "../../controllers/task/index.js";

router
  .post(
    "/tasks",
    [tokenAuthorization, validator.createTask],
    TaskController.create
  )
  .get("/tasks", [tokenAuthorization], TaskController.getTaskByUser)
  .put(
    "/tasks/:id",
    [tokenAuthorization, validator.updateTask],
    TaskController.update
  )
  .delete(
    "/tasks/:id",
    [tokenAuthorization, validator.deleteTask],
    TaskController.delete
  );

export default router;

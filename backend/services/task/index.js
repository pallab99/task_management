import TaskRepository from "../../reposity/task/index.js";

class TaskServiceClass {
  async newTask(task, userId) {
    const result = await TaskRepository.createTask(task, userId);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async getTaskByUserId(userId) {
    const result = await TaskRepository.getAllTasksByUserId(userId);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }
  async findTask(taskId, userId) {
    const newTaskId = parseInt(taskId.id, 10);
    const result = await TaskRepository.findTask(taskId, userId);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }
  async updateTask(taskId, userId, taskUpdateData) {
    const result = await TaskRepository.updateTask(
      taskId,
      userId,
      taskUpdateData
    );
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }

  async deleteTask(taskId, userId) {
    const result = await TaskRepository.deleteTask(taskId, userId);
    if (result) {
      return { success: true, data: result };
    }
    return { success: false, data: null };
  }
}

const TaskService = new TaskServiceClass();

export default TaskService;

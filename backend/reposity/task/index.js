import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
class TaskRepositoryClass {
  async createTask(task, userId) {
    const newTask = await prisma.task.create({
      data: {
        userId: userId,
        title: task.title,
        description: task.description,
      },
    });
    return newTask;
  }
  async getAllTasksByUserId(userId) {
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
      include: {
        User: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return tasks;
  }

  async findTask(taskId, userId) {
    console.log("findTask", taskId, userId);
    const tasks = await prisma.task.findUnique({
      where: {
        userId: userId,
        id: parseInt(taskId, 10),
      },
    });

    return tasks;
  }
  async updateTask(taskId, userId, updatedTaskData) {
    const tasks = await prisma.task.update({
      where: {
        userId: userId,
        id: parseInt(taskId, 10),
      },
      data: {
        title: updatedTaskData.title,
        description: updatedTaskData.description,
        status: updatedTaskData.status,
      },
    });

    return tasks;
  }

  async deleteTask(taskId, userId) {
    const tasks = await prisma.task.delete({
      where: {
        userId: userId,
        id: parseInt(taskId, 10),
      },
    });

    return tasks;
  }
}

const TaskRepository = new TaskRepositoryClass();

export default TaskRepository;
